import L from "leaflet";

export const pickGoodIcon = (
  mode: "selected" | "default" | "user" | "users" | number
): L.Icon | undefined => {
  if (typeof mode === "number") {
    switch (mode) {
      case 0:
        return L.icon({
          iconUrl: `/assets/markers/marker_0.svg`,
          iconSize: [20, 20],
          iconAnchor: [10, 20],
          popupAnchor: [0, -20],
        });
      case 1:
        return L.icon({
          iconUrl: `/assets/markers/marker_1.svg`,
          iconSize: [20, 20],
          iconAnchor: [10, 20],
          popupAnchor: [0, -20],
        });
      case 2:
        return L.icon({
          iconUrl: `/assets/markers/marker_2.svg`,
          iconSize: [20, 20],
          iconAnchor: [10, 20],
          popupAnchor: [0, -20],
        });
      case 3:
        return L.icon({
          iconUrl: `/assets/markers/marker_3.svg`,
          iconSize: [20, 20],
          iconAnchor: [10, 20],
          popupAnchor: [0, -20],
        });
      case 4:
        return L.icon({
          iconUrl: `/assets/markers/marker_4.svg`,
          iconSize: [20, 20],
          iconAnchor: [10, 20],
          popupAnchor: [0, -20],
        });
      case 5:
        return L.icon({
          iconUrl: `/assets/markers/marker_5.svg`,
          iconSize: [20, 20],
          iconAnchor: [10, 20],
          popupAnchor: [0, -20],
        });
      default:
        return L.icon({
          iconUrl: `/assets/markers/marker.svg`,
          iconSize: [20, 20],
          iconAnchor: [10, 20],
          popupAnchor: [0, -20],
        });
    }
  } else {
    switch (mode) {
      case `selected`:
        return L.icon({
          iconUrl: `/assets/markers/marker_selected.svg`,
          iconSize: [20, 20],
          iconAnchor: [10, 20],
          popupAnchor: [0, -20],
        });
      case `user`:
        return L.icon({
          iconUrl: `/assets/markers/marker_user.svg`,
          iconSize: [20, 20],
          iconAnchor: [10, 20],
          popupAnchor: [0, -20],
        });
      case `users`:
        return L.icon({
          iconUrl: `/assets/markers/marker_users.svg`,
          iconSize: [20, 20],
          iconAnchor: [10, 20],
          popupAnchor: [0, -20],
        });
      case `default`:
        return L.icon({
          iconUrl: `/assets/markers/marker.svg`,
          iconSize: [20, 20],
          iconAnchor: [10, 20],
          popupAnchor: [0, -20],
        });
      default:
        return L.icon({
          iconUrl: `/assets/markers/marker.svg`,
          iconSize: [20, 20],
          iconAnchor: [10, 20],
          popupAnchor: [0, -20],
        });
    }
  }
};
