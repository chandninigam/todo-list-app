// Import Libraries
import React from "react";
import { StatusBar } from "react-native";
// Import Context
import { ContextProvider } from "./src/contexts/AppContext";
// Import Entry Naviagtion
import { EntryAppNavigator } from "./src/EntryAppNavigator";

// Import Font Helper Components
import "./polyfill";

StatusBar.setBarStyle("dark-content");

export default function App() {
  return (
    <ContextProvider>
      <EntryAppNavigator />
    </ContextProvider>
  );
}
