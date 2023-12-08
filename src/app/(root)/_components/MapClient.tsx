import { MapContainer, Marker, Popup, TileLayer, GeoJSON } from "react-leaflet";
import { Map as MapType } from "leaflet";
import { useAppStore } from "@/stores";
import { Minimap } from "./MiniMap";
import { pickGoodIcon } from "./utils";
import { generatePolygonColor } from "@/utils";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import toast from "react-hot-toast";
import { ScalableView } from "@/components/scalableView/ScalableView";

const getLatestData = async () => {
  const URL =
    process.env.NODE_ENV === "development" ? "http://localhost:3000/" : process.env.NEXT_PUBLIC_URL;
  if (!URL) throw new Error("No URL");
  const res = await fetch(`${URL}api/getld?param=pm10-2019`);
  const data = await res.json();
  return data;
};

const ClientMap = () => {
  const [loading, setLoading] = useState(false);
  const [json, setJson] = useState<any>();
  const {
    selectedStation,
    stations,
    selectStation,
    goTo,
    setEducationOpen,
    moveMap,
    setShowLunge,
    setIsMapMoving,
  } = useAppStore(state => ({
    selectedStation: state.selectedStation,
    setEducationOpen: state.setEducationOpen,
    selectStation: state.selectStation,
    goTo: state.goTo,
    stations: state.stations,
    moveMap: state.moveMap,
    setShowLunge: state.setShowLunge,
    isMapMoving: state.isMapMoving,
    setIsMapMoving: state.setIsMapMoving,
  }));

  useEffect(() => {
    (async () => {
      setJson(await getLatestData());
    })();
  }, []);

  const [map, setMap] = useState<MapType | null>(null);
  const [position, setPosition] = useState(() => map?.getCenter());

  const onZoom = useCallback(() => {
    if (map?.getZoom() === 9.5) {
    }
  }, [map]);

  const onMove = useCallback(() => {
    setPosition(map?.getCenter());
  }, [map]);

  const onMoveStart = useCallback(() => {
    setIsMapMoving(true);
  }, [map]);

  const onMoveEnd = useCallback(() => {
    setIsMapMoving(false);
  }, [map]);

  useEffect(() => {
    map?.on("move", onMove);
    map?.on("zoom", onZoom);
    map?.on("movestart", onMoveStart);
    map?.on("moveend", onMoveEnd);
    return () => {
      map?.off("move", onMove);
      map?.off("zoom", onZoom);
      map?.off("movestart", onMoveEnd);
      map?.off("moveend", onMoveEnd);
    };
  }, [map]);

  const goToSelectedStation = useCallback(() => {
    if (selectedStation) {
      const zoom = 9;
      map?.setView([selectedStation.location.lat, selectedStation.location.long], zoom, {
        animate: true,
        duration: 0.5,
        easeLinearity: 0.2,
      });
    }
  }, [map, selectedStation]);

  useEffect(() => {
    if (selectedStation && moveMap === "station") goToSelectedStation();
  }, [selectedStation, moveMap]);

  const dblclick = async (name: string) => {
    if (window.innerWidth < 640) close();
    selectStation(name);
    setShowLunge(true);
    await goTo("station");
  };
  const onButtonClick = (name: string) => {
    if (window.innerWidth < 640) close();
    selectStation(name);
  };

  const options = ["none", "pm25-2020", "pm10-2020"];
  const loadData = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const param = formData.get("param");
      if (param === "none") {
        setJson(null);
        return;
      }
      setLoading(true);
      setJson(null);
      const res = await fetch(`/api/getld?param=${param}`);
      const data = await res.json();
      if ("error" in data) {
        toast.error("Nie udało się pobrać danych. Spróbuj ponownie później.");
        return;
      } else {
        toast.success("Dane zostały pobrane");
        setJson(data);
        setLoading(false);
      }
    } catch (e) {
      toast.error("Nie udało się pobrać danych. Spróbuj ponownie później.");
    }
  };

  const style = (feature: any) => {
    return {
      fillColor: generatePolygonColor(
        feature.properties.nazwa_wska as string,
        feature.properties.density as number
      ),
      weight: 0.3,
      opacity: 1,
      color: generatePolygonColor(
        feature.properties.nazwa_wska as string,
        feature.properties.density as number
      ),
      dashArray: "3",
      fillOpacity: 0.5,
    };
  };

  const display = useMemo(() => {
    return (
      <MapContainer
        markerZoomAnimation
        preferCanvas
        fadeAnimation
        className="h-full w-full"
        center={[51.91, 19.14]}
        zoom={7}
        maxZoom={9}
        minZoom={5.5}
        zoomControl={false}
        maxBounds={[
          [56.851535159245, 26.484375],
          [56.851535159245, 12.765625],
          [47.496674527470455, 17.765625],
          [47.496674527470455, 25.484375],
        ]}
        ref={setMap}>
        {stations.map(({ name, country, location: { lat, long }, weather }, idx) => {
          return (
            <Marker
              key={name + idx}
              eventHandlers={{ dblclick: async () => await dblclick(name) }}
              opacity={true ? 0.8 : 0.5}
              icon={pickGoodIcon(`default`)}
              position={[lat, long]}>
              <Popup>
                <div className="flex flex-col">
                  <span>{name}</span>
                  <span></span>
                  <button onClick={() => onButtonClick(name)}>Zmień stacje</button>
                </div>
              </Popup>
            </Marker>
          );
        })}
        {map && <Minimap />}
        {json && (
          <GeoJSON
            style={style}
            data={{
              type: "FeatureCollection",
              // @ts-ignore
              features: json.features,
            }}
          />
        )}
        <TileLayer
          attribution={`&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors. Presented information's on map are from 2019. Aexol`}
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    );
  }, [map, selectedStation, json]);

  return (
    <>
      <div className="h-screen w-screen fixed top-0 left-0 ">{display}</div>
      <ScalableView show={!!selectedStation} />
    </>
  );
};

export default ClientMap;
