export type CountryNode = {
  name: string;
  capital: string;
  region: string;
  subregion: string;
  flag: string;
  area: number;
  population: number;
  languages: {
    edges: {
      node: {
        name: string;
      };
    }[];
  };
};

export type CountryNodeDetailed = {
  borders: string[];
  latLng: string[];
  currencies: {
    edges: { node: { code: string; name: string; symbol: string } }[];
  };
  timezones: string[];
} & CountryNode;

export type CountryNodeDetailedKeys = keyof CountryNodeDetailed;

export interface CountryEdge<T> {
  node: T;
}

export interface CountryResponse {
  countries: { edges: CountryEdge<CountryNode>[] };
}

export interface CountryDetailResponse {
  countries: { edges: CountryEdge<CountryNodeDetailed>[] };
}

export interface LanguageResponse {
  languages: {
    edges: {
      node: {
        name: string;
        nativeName: string;
        iso6391: string;
        iso6392: string;
      };
    }[];
  };
}

export type CountriesSortOptionsKey =
  | keyof Pick<CountryNode, "name" | "population" | "area">
  | "default";

export const CountriesSortOptions: Record<CountriesSortOptionsKey, string> = {
  default: "Default",
  name: "Name",
  population: "Population",
  area: "Area",
} as const;

export type CountriesSortOptionsValue =
  (typeof CountriesSortOptions)[CountriesSortOptionsKey];
export const COUNTRIES_SORT_OPTIONS_ARRAY = Object.entries(
  CountriesSortOptions
).map(([value, label]) => ({
  value,
  label,
}));
