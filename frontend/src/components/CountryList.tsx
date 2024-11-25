import React from "react";
import { Avatar, Empty, Flex, List, Skeleton, Space } from "antd";

import { CountryEdge, CountryNode } from "../types/countries";

const CountriesList = ({
  countriesData,
  isDataLoading,
  selectCountry,
}: {
  countriesData: CountryEdge<CountryNode>[] | undefined;
  isDataLoading: boolean;
  selectCountry: (country: CountryNode) => void;
}): React.ReactElement => {
  if (isDataLoading)
    return (
      <Flex vertical>
        {Array.from({ length: 10 }).map((_, index) => (
          <Space style={{ marginTop: "5px", marginBottom: "5px" }} key={index}>
            <Skeleton.Avatar active shape="square" />
            <Skeleton.Input active />
            <Skeleton.Button active shape="square" block />
          </Space>
        ))}
      </Flex>
    );
  if (!countriesData || !countriesData?.length)
    return (
      <Flex
        style={{
          cursor: "pointer",
          height: "80%",
          overflowY: "auto",
        }}
        justify="center"
        align="center"
      >
        <Empty />
      </Flex>
    );
  return (
    <List
      style={{
        cursor: "pointer",
        height: "80%",
        overflowY: "auto",
        marginRight: "5px",
        marginLeft: "5px",
      }}
    >
      {countriesData.map(({ node }) => (
        <List.Item
          onClick={() => {
            selectCountry(node);
          }}
          key={node.name}
        >
          <List.Item.Meta
            avatar={<Avatar shape="square" src={node.flag} />}
            title={node.name}
            description={node.capital}
          />
          <div>{node.region}</div>
        </List.Item>
      ))}
    </List>
  );
};

export default CountriesList;
