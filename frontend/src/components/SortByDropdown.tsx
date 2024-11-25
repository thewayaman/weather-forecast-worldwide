import { Select } from "antd";
import React from "react";
import {
  COUNTRIES_SORT_OPTIONS_ARRAY,
  CountriesSortOptionsKey,
} from "../types/countries";
const SortByDropdown = ({
  defaultValue,
  onChange,
}: {
  defaultValue: CountriesSortOptionsKey;
  onChange: (value: CountriesSortOptionsKey) => void;
}): React.ReactElement => {
  return (
    <Select
      placeholder="Sort"
      optionFilterProp="label"
      defaultValue={defaultValue}
      onChange={onChange}
      style={{ minWidth: "40%", marginRight: "auto" }}
      options={COUNTRIES_SORT_OPTIONS_ARRAY}
    />
  );
};
export default SortByDropdown;
