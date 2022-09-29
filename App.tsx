import React from "react";
import { StatusBar } from "react-native";
import { Home } from "./src/pages/Home";

export default function app() {
  return (
    <>
      <StatusBar barStyle={'light-content'}/>
      <Home />
    </>
  );
}