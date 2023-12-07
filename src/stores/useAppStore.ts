import { CityType } from "@/graphql/querires";
import { AirQuality, GeoLocation, LocationData } from "@/types";
import { checkWhereLatLong, requestGeolocation } from "@/utils";
import { createStore } from "zustand";
type MoveMap = "station" | undefined;

export interface AppStoreProps {
  educationOpen: boolean;
  loading: boolean;
  qualityLoading: boolean;
  stations: CityType[];
  selectedStation: CityType | null;
  location: LocationData | null;
  geoLocation: GeoLocation | null;
  searchValue: string | null;
  searchResults: CityType[];
  airQualities: Record<string, AirQuality> | null;
  airQuality: AirQuality | null;
  allowRotation: boolean;
  visibility: boolean;
  hoveredQualityIndex: number | undefined;
  isOpen: boolean;
  moveMap: MoveMap;
}

export interface AppStoreState extends AppStoreProps {
  setEducationOpen: (state: boolean) => void;
  selectStation: (name: string | null) => void;
  setSearchValue: (value: string | null) => void;
  setSearch: (search: string) => void;
  toggleRotation: () => void;
  toggleVisibility: () => void;
  setHoveredQualityIndex: (id: number | undefined) => void;
  goTo: (where: MoveMap) => Promise<void>;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

export type useAppStoreType = ReturnType<typeof createAppStore>;

export const createAppStore = (initProps?: Partial<AppStoreProps>) =>
  createStore<AppStoreState>()((set, get) => {
    const open = () => set({ isOpen: true });
    const close = () => set({ isOpen: false });
    const toggle = () => set((state) => ({ isOpen: !state.isOpen }));

    const goTo = async (where: MoveMap) => {
      set({ moveMap: where });
      await new Promise((resolve) => setTimeout(resolve, 1000));
      set({ moveMap: undefined });
    };

    const setEducationOpen = (state: boolean) => {
      set({ educationOpen: state });
    };
    const toggleRotation = () => {
      const { allowRotation } = get();
      set({ allowRotation: !allowRotation });
    };

    const setSearchValue = (value: string | null) => {
      setSearch(value || "");
      set({ searchValue: value });
    };

    const setSearch = (search: string) => {
      const stations = get().stations;
      const searchResults = stations.filter((station) =>
        station.name.toLowerCase().includes(search.toLowerCase())
      );
      set({ searchResults });
    };

    const selectStation = async (name: string | null) => {
      if (!name) {
        set({ selectedStation: null, airQuality: null });
        return;
      }
      const stations = get().stations;
      const station = stations.find((station) => station.name === name);
      set({ selectedStation: station, qualityLoading: true });

      // try {
      //   let res = await fetch(`/api/quality/${id}`);
      //   const airQuality = (await res.json()) as AirQuality;
      //   set({ airQuality });
      //   const { airQualities } = get();
      //   if (airQualities && !airQualities[id]) {
      //     res = await fetch(`/api/qualities`);
      //     const airQualities = (await res.json()) as Record<string, AirQuality>;
      //     set({ airQualities });
      //   }
      // } catch {
      // } finally {
      //   set({ qualityLoading: false });
      // }
    };

    const toggleVisibility = () => {
      const { visibility } = get();
      set({ visibility: !visibility });
    };

    const setHoveredQualityIndex = (id: number | undefined) => {
      set({ hoveredQualityIndex: id });
    };

    return {
      isOpen: false,
      moveMap: undefined,
      visibility: true,
      educationOpen: false,
      allowRotation: false,
      hoveredQualityIndex: undefined,
      loading: true,
      stations: [],
      selectedStation: null,
      location: null,
      geoLocation: null,
      searchValue: null,
      searchResults: [],
      airQuality: null,
      qualityLoading: false,
      airQualities: null,
      close,
      goTo,
      open,
      toggle,
      selectStation,
      setSearchValue,
      setSearch,
      toggleVisibility,
      setHoveredQualityIndex,
      toggleRotation,
      setEducationOpen,
      ...initProps,
    };
  });
