import { CityType } from "@/graphql/queries";
import { AirQuality, GeoLocation, LocationData } from "@/types";
import { checkWhereLatLong, requestGeolocation } from "@/utils";
import { createStore } from "zustand";
type MoveMap = "station" | undefined;
export type NewAutoCompleteResult = {
  name: string;
  state: string;
  location: { lat: number; lon: number };
  stations: { lat: number; lon: number }[];
};
export interface AppStoreProps {
  educationOpen: boolean;
  loading: boolean;
  qualityLoading: boolean;
  stations: CityType[];
  selectedStation: CityType | null;
  location: LocationData | null;
  geoLocation: GeoLocation | null;
  searchValue: string | null;
  initialSearchResults: NewAutoCompleteResult[];
  searchResults: NewAutoCompleteResult[];
  airQualities: Record<string, AirQuality> | null;
  airQuality: AirQuality | null;
  allowRotation: boolean;
  visibility: boolean;
  hoveredQualityIndex: number | undefined;
  isOpen: boolean;
  moveMap: MoveMap;
  scaleLounge: boolean;
  showLounge: boolean;
  newAutoCompleteResult: NewAutoCompleteResult | null;
}

export interface AppStoreState extends AppStoreProps {
  setStations: (stations: CityType[]) => void;
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
  setScaleLounge: (state: boolean) => void;
  setShowLunge: (state: boolean) => void;
  setNewAutoCompleteResult: (newAutoCompleteResult: NewAutoCompleteResult | null) => void;
}

export type useAppStoreType = ReturnType<typeof createAppStore>;

export const createAppStore = (initProps?: Partial<AppStoreProps>) =>
  createStore<AppStoreState>()((set, get) => {
    const open = () => set({ isOpen: true });
    const close = () => set({ isOpen: false });
    const toggle = () => set(state => ({ isOpen: !state.isOpen }));

    const goTo = async (where: MoveMap) => {
      set({ moveMap: where });
      await new Promise(resolve => setTimeout(resolve, 1000));
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

    const setScaleLounge = (state: boolean) => {
      set({ scaleLounge: state });
    };

    const setSearch = (search: string) => {
      const searchResultsOld = get().initialSearchResults;
      const searchResults = searchResultsOld.filter(station =>
        station.name.toLowerCase().includes(search.toLowerCase())
      );
      set({ searchResults });
    };
    const setStations = (stations: CityType[]) => {
      set({ stations });
    };
    const selectStation = async (name: string | null) => {
      if (!name) {
        set({ selectedStation: null, airQuality: null });
        return;
      }
      const stations = get().stations;
      const station = stations.find(station => station.name === name);
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

    const setShowLunge = (showLounge: boolean) => set({ showLounge });

    const setNewAutoCompleteResult = (newAutoCompleteResult: NewAutoCompleteResult | null) =>
      set({ newAutoCompleteResult });

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
      scaleLounge: false,
      showLounge: false,
      newAutoCompleteResult: null,
      initialSearchResults: [],
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
      setStations,
      setScaleLounge,
      setShowLunge,
      setNewAutoCompleteResult,
      ...initProps,
    };
  });
