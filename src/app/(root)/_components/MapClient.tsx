import { MapContainer, Marker, Popup, TileLayer, GeoJSON } from "react-leaflet";
import { Map as MapType } from "leaflet";
import { useAppStore } from "@/stores";
import { Minimap } from "./MiniMap";
import { pickGoodIcon } from "./utils";
import { cx, generatePolygonColor } from "@/utils";
import React, {
  useEffect,
  useState,
  useCallback,
  useRef,
  useMemo,
} from "react";
import { Canvas } from "@/components/canvas/Canvas";
import { Search } from "@/components/search/Search";
import { ScalableView } from "@/components/scalableView/ScalableView";
const ClientMap = () => {
  const [loading, setLoading] = useState(false);
  const json = useRef(null);
  const {
    selectedStation,
    stations,
    selectStation,
    goTo,
    moveMap,
  } = useAppStore((state) => ({
    selectedStation: state.selectedStation,
    selectStation: state.selectStation,
    goTo: state.goTo,
    stations: state.stations,
    moveMap: state.moveMap,
  }));
  const [map, setMap] = useState<MapType | null>(null);
  const [position, setPosition] = useState(() => map?.getCenter());
  const [test, setTest] = useState(false);
  const onZoom = useCallback(() => {
    if (map?.getZoom() === 9.5) {
      setTest(true);
    } else setTest(false);
  }, [map]);

  const onMove = useCallback(() => {
    setPosition(map?.getCenter());
  }, [map]);

  useEffect(() => {
    map?.on("move", onMove);
    map?.on("zoom", onZoom);
    return () => {
      map?.off("move", onMove);
      map?.off("zoom", onZoom);
    };
  }, [map]);

  const goToSelectedStation = useCallback(() => {
    if (selectedStation) {
      // const zoom = 9;
   
      map?.setView(
        [selectedStation.location.lat, selectedStation.location.long],
        zoom,
        {
          animate: true,
          duration: 1,
          easeLinearity: 0.2,
        }
      );
    }
  }, [map, selectedStation]);

  useEffect(() => {
    console.log(moveMap)
    if (selectedStation && moveMap === "station") goToSelectedStation();
  }, [selectedStation, moveMap]);

  const dblclick = async (name: string) => {
    if (window.innerWidth < 640) close();
    selectStation(name);
    await goTo("station");
  };
  const onButtonClick =async (name: string) => {
    if (window.innerWidth < 640) close();
    selectStation(name);
    await goTo("station");
  };

  const loadData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/getld");
    const data = await res.json();
    json.current = data;
    setLoading(false);
  };
  const style = (feature: any) => {
    return {
      fillColor: generatePolygonColor(
        feature.properties.nazwa_wska as string,
        feature.properties.wartosc as number
      ),
      weight: 0.3,
      opacity: 1,
      color: generatePolygonColor(
        feature.properties.nazwa_wska as string,
        feature.properties.wartosc as number
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
        zoom={5.5}
        maxZoom={9.5}
        // minZoom={5.5}
        zoomControl={false}
        ref={setMap}
      >
        {stations.map(({ name, country, location: { lat, long } }, idx) => {
          const isSelected = selectedStation?.name === name;
          return (
            <Marker
              key={name + idx}
              eventHandlers={{ dblclick: async () => await dblclick(name) }}
              opacity={true ? 0.8 : 0.5}
              icon={pickGoodIcon(isSelected ? "selected" : "default")}
              position={[lat, long]}
            >
              <Popup>
                <div className="flex flex-col">
                  <span>{name}</span>
                  <button onClick={() => onButtonClick(name)}>
                    Zmień stacje
                  </button>
                </div>
              </Popup>
            </Marker>
          );
        })}
        {map && <Minimap />}
        {json.current && (
          <GeoJSON
            style={style}
            data={{
              type: "FeatureCollection",
              // @ts-ignore
              features: json.current.features,
            }}
          />
        )}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">
            OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    );
  }, [map, selectedStation, json.current]);

  return (
    <>
      <div className="h-screen w-screen fixed top-0 left-0 ">{display}</div>
      <div className="text-sm w-[160px] flex flex-col gap-2 p-4 absolute bottom-5 left-5 text-black bg-white rounded z-50">
        <p className="flex justify-between">
          <span>latitude:</span>
          <span> {position ? position.lat.toFixed(2) : 51.91}</span>
        </p>
        <p className="flex justify-between">
          <span>longitude:</span>
          <span>{position ? position.lng.toFixed(2) : 19.14}</span>
        </p>
        {loading ? (
          <p>loading...</p>
        ) : (
          <form onSubmit={loadData}>
            <button type="submit">load data</button>
          </form>
        )}
      </div>
      {/* <ScalableView show={!!selectedStation} /> */}
    </>
  );
};

export default ClientMap;
