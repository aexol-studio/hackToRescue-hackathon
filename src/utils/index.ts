import { GeoLocation } from "@/types";
import { twMerge } from "tailwind-merge";
import toast from "react-hot-toast";
type Cx = (...args: Array<string | boolean | null | undefined>) => string;
export const cx: Cx = (...args) => {
  return twMerge(
    args
      .flat()
      .filter(
        (x: string | boolean | null | undefined) =>
          x !== null && x !== undefined && typeof x !== "boolean"
      )
      .join(" ")
  );
};

const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

export const requestGeolocation = async () => {
  if (navigator.geolocation) {
    navigator.permissions.query({ name: "geolocation" }).then(function (result) {
      if (result.state === "granted") {
        navigator.geolocation.getCurrentPosition(
          position => {},
          errors => {},
          options
        );
      } else if (result.state === "prompt") {
        navigator.geolocation.getCurrentPosition(
          position => {},
          errors => {},
          options
        );
      } else if (result.state === "denied") {
        toast.error("Geolokalizacja jest wyłączona");
      }
    });
  }

  const data = await new Promise<GeolocationPosition>((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    });
  });

  if (!data) return null;
  // toast.success('Geolokalizacja włączona');
  return doGeoLocation(data);
};

export const checkWhereLatLong = async (lat: number, long: number) => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${long}`
    );
    const data = await response.json();
    return data;
  } catch (e) {
    return null;
  }
};

export const doGeoLocation = (geoLocation: GeolocationPosition): GeoLocation => ({
  latitude: geoLocation.coords.latitude,
  longitude: geoLocation.coords.longitude,
  altitude: geoLocation.coords.altitude,
  accuracy: geoLocation.coords.accuracy,
  altitudeAccuracy: geoLocation.coords.altitudeAccuracy,
  heading: geoLocation.coords.heading,
  speed: geoLocation.coords.speed,
  timestamp: geoLocation.timestamp,
});

export const calculateDistance = ({
  lat1,
  lon1,
  lat2,
  lon2,
  distanceRadius,
}: {
  lat1: number;
  lon1: number;
  lat2: number;
  lon2: number;
  distanceRadius: number;
}) => {
  if (lat1 === lat2 && lon1 === lon2) return 0;
  const radlat1 = (Math.PI * lat1) / 180;
  const radlat2 = (Math.PI * lat2) / 180;
  const theta = lon1 - lon2;
  const radTheta = (Math.PI * theta) / 180;
  let distance =
    Math.sin(radlat1) * Math.sin(radlat2) +
    Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radTheta);

  if (distance > distanceRadius) distance = distanceRadius;
  distance = Math.acos(distance);
  distance = (distance * 180) / Math.PI;
  distance = distance * 60 * 1.1515;
  //do kilometrów
  distance = distance * 1.609344;
  return distance;
};

export const generatePolygonColor = (key: string, density: number) => {
  if (key.toLowerCase().includes("pm10")) {
    if (density > 150) {
      return "#990000";
    }
    if (density >= 110.1 && density <= 150) {
      return "#FF0000";
    }
    if (density >= 80.1 && density <= 110) {
      return "#FF6600";
    }
    if (density >= 50.1 && density <= 80) {
      return "#FFFF00";
    }
    if (density >= 20.1 && density <= 50) {
      return "#99FF33";
    }
    if (density >= 0 && density <= 20) {
      return "#009900";
    }
  }
  if (key.toLowerCase().includes("pm25")) {
    if (density >= 25) {
      return "#FF000060";
    }
    if (density >= 15 && density <= 25) {
      return "#FF660060";
    }
    if (density >= 10 && density <= 15) {
      return "#FFFF0060";
    }
    if (density >= 5 && density <= 10) {
      return "#99FF3360";
    }
    if (density >= 0 && density <= 5) {
      return "#00990060";
    }
  }
  return "#000";
};
