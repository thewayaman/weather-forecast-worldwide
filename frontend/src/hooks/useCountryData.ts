import { useQuery } from "@apollo/client";
import {
  GET_COUNTRIES,
  GET_COUNTRIES_BY_FILTER,
  GET_COUNTRIES_BY_NAME,
  GET_COUNTRY_LANGUAGES,
} from "../api/graphql/countryQueries";
import {
  CountryDetailResponse,
  CountryResponse,
  LanguageResponse,
} from "../types/countries";

export const useCountryRegionFilter = (filter: string | undefined = "") => {
  const { loading, error, data, refetch } = useQuery<CountryResponse>(
    filter ? GET_COUNTRIES_BY_FILTER(filter) : GET_COUNTRIES
  );

  return { loading, error, data, refetch };
};

export const useGetCountryByName = (filter: string) => {
  const { loading, error, data, refetch } = useQuery<CountryDetailResponse>(
    GET_COUNTRIES_BY_NAME(filter)
  );

  return { loading, error, data, refetch };
};

export const useCountryLanguageData = () => {
  const { loading, error, data } = useQuery<LanguageResponse>(
    GET_COUNTRY_LANGUAGES
  );

  return { loading, error, data };
};
