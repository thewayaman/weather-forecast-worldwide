import { CountriesSortOptionsKey } from "../types/countries";

export const searchInputBoxParamsGenerator = (
  searchParams: URLSearchParams,
  value: string | null
) => {
  const updatedParams = new URLSearchParams(searchParams);
  if (value) {
    updatedParams.set("searchString", value);
  } else {
    updatedParams.delete("searchString");
  }
  return updatedParams;
};

export const sortByDropdownParamsGenerator = (
  searchParams: URLSearchParams,
  value: CountriesSortOptionsKey
) => {
  const updatedParams = new URLSearchParams(searchParams);
  updatedParams.set("sortBy", value);

  if (!updatedParams.get("sortType")) {
    updatedParams.set("sortType", "asc");
  }
  if (value === "default" && updatedParams.get("sortType")) {
    updatedParams.delete("sortType");
  }
  return updatedParams;
};

export const sortTypeParamsGenerator = (
  searchParams: URLSearchParams,
  sortType: "dsc" | "asc"
) => {
  const updatedParams = new URLSearchParams(searchParams);
  updatedParams.set("sortType", sortType === "asc" ? "dsc" : "asc");
  return updatedParams;
};

export const treeFilterParamsGenerator = (
  searchParams: URLSearchParams,
  treeFilterArray: string[]
) => {
  const updatedParams = new URLSearchParams(searchParams);
  if (treeFilterArray.length) {
    updatedParams.set("filters", treeFilterArray.join(","));
  } else {
    updatedParams.delete("filters");
  }
  return updatedParams;
};

export const countryChangeParamsGenerator = (
  searchParams: URLSearchParams,
  countryName: string
) => {
  const updatedParams = new URLSearchParams(searchParams);
  updatedParams.set("country", countryName);
  return updatedParams;
};
