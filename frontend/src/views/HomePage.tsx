import { Content } from "antd/es/layout/layout";
import React, { useEffect, useState } from "react";

import {
  Button,
  Drawer,
  Empty,
  Flex,
  Grid,
  Input,
  Space,
  Typography,
} from "antd";

import CountrySelectionShell from "./CountrySelectionShell";
import CountryDetailsPage from "./CountryDetailPage";
import { useSearchParams } from "react-router-dom";
const { Search } = Input;

const { useBreakpoint } = Grid;

const HomePage = (): React.ReactElement => {
  const [open, setOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const onClose = () => {
    setOpen(false);
  };
  const screens = useBreakpoint();

  useEffect(() => {
    if (searchParams.get("country") && screens.xs) {
      setOpen(false);
    }
  }, [searchParams.get("country"), screens.xs]);
  const padding = screens.xs ? { padding: "0 48px" } : { padding: "5% 10vw" };
  const countryDetailContainerStyle = screens.xs
    ? {
        maxWidth: "100%",
        margin: "auto",
        border: "1px solid lightgrey",
        borderRadius: "8px",
        marginBottom: "10px",
      }
    : {
        maxWidth: "65%",
        margin: "auto",
        border: "1px solid lightgrey",
        borderRadius: "8px",
        marginBottom: "10px",
      };
  return (
    <>
      <Drawer
        title="Country selection"
        placement="bottom"
        height="100%"
        onClose={onClose}
        open={open}
      >
        <Content
          style={{
            overflow: "hidden",
            height: "100%",
          }}
        >
          <CountrySelectionShell />
        </Content>
      </Drawer>
      <Flex style={{ ...padding, height: "100vh" }} vertical={screens.xs}>
        {screens.xs ? (
          <>
            <Button
              size="large"
              onClick={() => {
                setOpen(true);
              }}
              style={{ margin: "24px 12px", textAlign: "left" }}
            >
              📍 {searchParams.get("country") ?? "Choose a country"}
            </Button>
          </>
        ) : (
          <Content
            style={{
              minHeight: 280,
              maxWidth: "30%",
              overflow: "hidden",
              height: "100%",
            }}
          >
            <CountrySelectionShell />
          </Content>
        )}

        <Content style={countryDetailContainerStyle}>
          {searchParams.get("country") ? (
            <CountryDetailsPage />
          ) : (
            <Empty
              description={
                <Typography.Text>
                  Choose a country from the list to view
                </Typography.Text>
              }
            />
          )}
        </Content>
      </Flex>
    </>
  );
};
export default HomePage;
