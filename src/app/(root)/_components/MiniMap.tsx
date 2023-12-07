import React, { useCallback, useMemo, useState } from "react";
import {
  MapContainer,
  Polygon,
  Rectangle,
  TileLayer,
  useMap,
  useMapEvent,
} from "react-leaflet";
import { useEventHandlers } from "@react-leaflet/core";
import { Map } from "leaflet";

const MinimapBounds = ({ parentMap }: { parentMap: Map }) => {
  const minimap = useMap();

  const onClick = useCallback(
    (e: { latlng: { lat: number; lng: number } }) => {
      parentMap.setView(e.latlng, parentMap.getZoom());
    },
    [parentMap]
  );
  useMapEvent("click", onClick);
  const [bounds, setBounds] = useState(parentMap.getBounds());
  const onChange = useCallback(() => {
    setBounds(parentMap.getBounds());
    minimap.setView(parentMap.getCenter(), 0);
  }, [minimap, parentMap]);
  const handlers = useMemo(() => ({ move: onChange, zoom: onChange }), []);
  useEventHandlers(
    { instance: parentMap, context: { __version: 1, map: minimap } },
    handlers
  );
  return <Rectangle bounds={bounds} pathOptions={{ weight: 1 }} />;
};

export const Minimap = () => {
  const parentMap = useMap();

  const minimap = useMemo(
    () => (
      <MapContainer
        style={{ height: 160, width: 160 }}
        center={parentMap.getCenter()}
        zoom={0}
        dragging={false}
        doubleClickZoom={false}
        scrollWheelZoom={false}
        attributionControl={false}
        zoomControl={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Polygon
          pathOptions={{ color: "blue", weight: 1.3, opacity: 0.5 }}
          positions={polandPolygon}
        />
        <MinimapBounds parentMap={parentMap} />
      </MapContainer>
    ),
    []
  );

  return (
    <div className="leaflet-top leaflet-right">
      <div className="leaflet-control leaflet-bar">{minimap}</div>
    </div>
  );
};

const polandPolygon = [
  { lat: 54.851535159245, lng: 23.484375 },
  { lat: 54.851535159245, lng: 14.765625 },
  { lat: 49.15296965617042, lng: 14.765625 },
  { lat: 49.15296965617042, lng: 23.484375 },
];
