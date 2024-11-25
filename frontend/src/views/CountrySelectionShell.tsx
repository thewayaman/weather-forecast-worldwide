import React, { useEffect, useMemo, useState } from "react";
import CountriesList from "../components/CountryList";
import { Button, Flex, Input, Result } from "antd";
import SortByDropdown from "../components/SortByDropdown";
import TreeFilter from "../components/TreeFilters";
import useDebounce from "../utils/debounce";
import { useCountryRegionFilter } from "../hooks/useCountryData";
import {
  CountriesSortOptionsKey,
  CountryEdge,
  CountryNode,
} from "../types/countries";
import { useSearchParams } from "react-router-dom";
import {
  countryChangeParamsGenerator,
  searchInputBoxParamsGenerator,
  sortByDropdownParamsGenerator,
  sortTypeParamsGenerator,
  treeFilterParamsGenerator,
} from "../utils/searchparams-generators";
const { Search } = Input;

const CountrySelectionShell = (): React.ReactElement => {
  const [searchParams, setSearchParams] = useSearchParams();

  const searchString: string | undefined = searchParams.get(
    "searchString"
  ) as string;
  const sortByParams = searchParams.get("sortBy") as CountriesSortOptionsKey;
  const sortType: "asc" | "dsc" | null = searchParams.get("sortType") as
    | "asc"
    | "dsc";
  const selectedTreeFilters = useMemo(() => {
    return searchParams.get("filters")
      ? searchParams.get("filters")?.split(",")
      : [];
  }, [searchParams.get("filters")]);
  const [countryData, setCountryData] = useState<CountryEdge<CountryNode>[]>(
    []
  );
  const debouncedQuery = useDebounce(searchString);
  const { loading, error, data, refetch } = useCountryRegionFilter(
    debouncedQuery ? `name_Icontains:"${debouncedQuery}"` : ""
  );

  const sortCountriesBySortingOption = useMemo(() => {
    if (!data?.countries.edges.length) {
      return [];
    }
    if (!sortByParams || sortByParams === "default") {
      return data.countries.edges;
    }
    let filterableArray = JSON.parse(
      JSON.stringify(data?.countries.edges)
    ) as CountryEdge<CountryNode>[];
    if (selectedTreeFilters?.length) {
      const selectedTreeFiltersMap = new Set(selectedTreeFilters);
      filterableArray = filterableArray.filter(
        (countryEdge) =>
          selectedTreeFiltersMap.has(countryEdge.node.region) ||
          selectedTreeFiltersMap.has(
            countryEdge.node.languages.edges[0].node.name
          )
      );
    }
    return filterableArray.sort((pCountryNode, nCountryNode) => {
      if (sortByParams in pCountryNode.node) {
        if (
          typeof pCountryNode.node[sortByParams] === "string" &&
          typeof nCountryNode.node[sortByParams] === "string"
        ) {
          const comparisonResult = (pCountryNode.node[sortByParams] as string)
            .toLocaleLowerCase()
            .localeCompare(
              (nCountryNode.node[sortByParams] as string).toLocaleLowerCase()
            );

          return sortType === "asc" ? comparisonResult : -comparisonResult;
        } else if (
          typeof pCountryNode.node[sortByParams] === "number" &&
          typeof nCountryNode.node[sortByParams] === "number"
        ) {
          const comparisonResult =
            (pCountryNode.node[sortByParams] as number) -
            (nCountryNode.node[sortByParams] as number);
          return sortType === "asc" ? comparisonResult : -comparisonResult;
        } else {
          return -1;
        }
      }
      return -1;
    });
  }, [sortByParams, data, sortType, selectedTreeFilters]);

  useEffect(() => {
    if (data?.countries.edges.length) {
      setCountryData(sortCountriesBySortingOption);
    }
  }, [
    sortCountriesBySortingOption,
    sortByParams,
    data,
    sortType,
    selectedTreeFilters,
  ]);

  if (error)
    return (
      <Result
        status="warning"
        title="Oops, something went wrong."
        extra={
          <Button
            type="primary"
            key="console"
            onClick={() => {
              refetch();
            }}
          >
            Retry
          </Button>
        }
      />
    );

  return (
    <div
      style={{
        height: "100%",
        padding: "10px",
        border: "1px solid lightgrey",
        borderRadius: "8px",
      }}
    >
      <Search
        placeholder="Search country by name"
        size="large"
        value={searchString}
        onChange={(searchElement) => {
          setSearchParams(
            searchInputBoxParamsGenerator(
              searchParams,
              searchElement.target.value
            )
          );
        }}
        onSearch={() => {}}
        style={{ paddingBottom: "12px" }}
      />

      <Flex vertical={false} style={{ paddingBottom: "12px" }}>
        <SortByDropdown
          defaultValue={sortByParams}
          onChange={(selectionChange) => {
            setSearchParams(
              sortByDropdownParamsGenerator(searchParams, selectionChange)
            );
          }}
        />
        {sortByParams && sortByParams !== "default" ? (
          <Flex
            vertical
            align="center"
            justify="center"
            style={{ marginRight: "auto", cursor: "pointer" }}
            onClick={() => {
              setSearchParams(sortTypeParamsGenerator(searchParams, sortType));
            }}
          >
            {sortType === "asc" ? `⬆️` : `⬇️`}
          </Flex>
        ) : null}

        <TreeFilter
          defaultTreeValue={selectedTreeFilters ?? []}
          treeFilterSelectionChange={(treeFilterArray) => {
            setSearchParams(
              treeFilterParamsGenerator(searchParams, treeFilterArray)
            );
          }}
        />
      </Flex>
      <CountriesList
        selectCountry={(country) => {
          setSearchParams(
            countryChangeParamsGenerator(searchParams, country.name)
          );
        }}
        countriesData={countryData}
        isDataLoading={loading}
      ></CountriesList>
    </div>
  );
};

export default CountrySelectionShell;
