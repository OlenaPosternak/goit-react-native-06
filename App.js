// App.js
import React, { useEffect, useCallback } from "react";
import { useFonts } from "expo-font";
import { Provider } from "react-redux";
// import * as SplashScreen from "expo-splash-screen";

import { SplashScreen } from "expo";
import { store } from "./src/redux/store";

import Main from "./src/components/Main";

import "./src/firebase";

export default function App() {
  // підключення шрифту
  const [fontsLoaded] = useFonts({
    RobotoBold: require("./src/assets/fonts/Roboto/Roboto-Bold.ttf"),
    Roboto: require("./src/assets/fonts/Roboto/Roboto-Regular.ttf"),
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  const onLayout = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);
  if (!fontsLoaded) {
    return null;
  }

  // кінець підключення шрифту
  return (
    <Provider store={store}>
      <Main onLayout={onLayout} />
    </Provider>
  );
}
