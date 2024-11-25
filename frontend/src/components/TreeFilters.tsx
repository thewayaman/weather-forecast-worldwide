import { TreeSelect } from "antd";
import React, { useState } from "react";
import { useCountryLanguageData } from "../hooks/useCountryData";

const TreeFilter = ({
  defaultTreeValue,
  treeFilterSelectionChange,
}: {
  defaultTreeValue: string[];
  treeFilterSelectionChange: (
    treeFilterArray: string[]
    // label: React.ReactNode[],
    // extras: any
  ) => void;
}): React.ReactElement => {
  const { data, loading, error } = useCountryLanguageData();
  const [treeData, setTreeData] = useState([
    {
      value: "region",
      title: "Region",
      selectable: false,
      children: [
        {
          value: "Africa",
          title: "Africa",
        },
        {
          value: "Americas",
          title: "Americas",
        },
        {
          value: "Asia",
          title: "Asia",
        },
        {
          value: "Europe",
          title: "Europe",
        },
        {
          value: "Oceania",
          title: "Oceania",
        },
      ],
    },
    {
      value: "language",
      title: "Language",
      selectable: false,
      children: [],
    },
  ]);

  if (data?.languages.edges.length && !treeData[1].children.length) {
    const treeDataCopy = JSON.parse(JSON.stringify(treeData));
    treeDataCopy[1].children = data?.languages.edges.map(({ node }) => ({
      value: node.name,
      title: node.name,
    }));
    setTreeData(treeDataCopy);
  }
  return (
    <TreeSelect
      multiple
      treeLine
      defaultValue={defaultTreeValue}
      style={{ width: "45%" }}
      treeData={treeData}
      onChange={(value, label, extras) => {
        console.log(value, label, extras);
        treeFilterSelectionChange(value);
      }}
      treeIcon
      placeholder="Select a Filter"
    />
  );
};

export default TreeFilter;
