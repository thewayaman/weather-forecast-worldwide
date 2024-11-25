import React, { useEffect, useState } from "react";

import {
  Button,
  Descriptions,
  DescriptionsProps,
  Empty,
  Flex,
  Result,
  Skeleton,
} from "antd";

import { useGetCountryByName } from "../hooks/useCountryData";
import { useSearchParams } from "react-router-dom";
import CityWeatherDetail from "./CityWeatherDetail";
import PopulationDisplay from "../components/PopulationDisplay";

const CountryDetailsPage = (): React.ReactElement => {
  const [searchParams] = useSearchParams();

  const { loading, error, data, refetch } = useGetCountryByName(
    searchParams.get("country") ? `name:"${searchParams.get("country")}"` : ""
  );

  const [descriptionItems, setDescriptionItems] = useState<
    DescriptionsProps["items"]
  >([]);
  useEffect(() => {
    setDescriptionItems([]);
  }, [searchParams.get("country")]);

  if (error)
    return (
      <Result
        status="500"
        title="500"
        subTitle="Sorry, something went wrong."
        extra={
          <Button
            type="primary"
            onClick={() => {
              refetch();
            }}
          >
            Retry
          </Button>
        }
      />
    );

  if (loading)
    return (
      <Skeleton
        style={{ margin: "15px 0px 30px 0px" }}
        loading={loading}
        active
      ></Skeleton>
    );
  if (!data?.countries.edges.length) {
    return (
      <Flex justify="center" align="center" style={{ height: "100%" }}>
        <Empty />
      </Flex>
    );
  }
  const countryDetailInfo = data?.countries.edges[0].node;

  if (!descriptionItems?.length) {
    setDescriptionItems([
      {
        label: "Capital",
        span: { xl: 2, xxl: 2 },
        children: countryDetailInfo.capital,
      },
      {
        label: "Region",
        span: { xl: 2, xxl: 2 },
        children: countryDetailInfo.region,
      },
      {
        label: "Sub region",
        span: { xl: 2, xxl: 2 },
        children: countryDetailInfo.subregion,
      },
      {
        label: "Population",
        span: { xl: 2, xxl: 2 },
        children: (
          <PopulationDisplay population={countryDetailInfo.population} />
        ),
      },
      {
        label: "Flag",
        span: { xl: 2, xxl: 2 },
        children: (
          <img
            style={{ height: "20px", width: "40px" }}
            src={countryDetailInfo.flag}
            alt={countryDetailInfo.name + "Flag"}
          />
        ),
      },

      {
        label: "Currencies",
        span: { xl: 2, xxl: 2 },
        children: countryDetailInfo.currencies.edges.map(({ node }) => (
          <React.Fragment key={node.name}>
            ({node.symbol},{node.code}) {node.name}
          </React.Fragment>
        )),
      },
      {
        label: "Timezones",
        span: { xl: 2, xxl: 2 },
        children: countryDetailInfo.timezones.map((value) => (
          <React.Fragment key={value}>{value},</React.Fragment>
        )),
      },
      {
        label: "Neighbouring countries",
        span: { xs: 1, sm: 2, md: 3, lg: 3, xl: 2, xxl: 2 },
        children: countryDetailInfo.borders.map((value) => (
          <React.Fragment key={value}>{value},</React.Fragment>
        )),
      },
      {
        label: "Languages spoken",
        span: { xs: 1, sm: 2, md: 3, lg: 3, xl: 2, xxl: 2 },
        children: countryDetailInfo.languages.edges.map(({ node }, index) => (
          <React.Fragment key={node.name}>{node.name},</React.Fragment>
        )),
      },
    ]);
  }

  return (
    <>
      <Descriptions
        title={countryDetailInfo.name}
        bordered
        column={{ xs: 1, sm: 2, md: 3, lg: 3, xl: 4, xxl: 4 }}
        items={descriptionItems}
        style={{ margin: "15px 0px 10px 0px" }}
        size="small"
      />
      <CityWeatherDetail
        cityName={
          countryDetailInfo.capital !== ""
            ? countryDetailInfo.capital
            : countryDetailInfo.name
        }
      />
    </>
  );
};

export default CountryDetailsPage;
