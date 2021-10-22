import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  DefaultTheme,
  ThemeProvider as PaperProvider,
} from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";

import Navigation from "./AppNavigation";
import { registerRootComponent } from "expo";
import Database from "./statics/Database";

Database.init();

function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider theme={DefaultTheme}>
        <Navigation />
      </PaperProvider>
      <StatusBar />
    </SafeAreaProvider>
  );
}

registerRootComponent(App);
