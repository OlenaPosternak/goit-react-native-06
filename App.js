// App.js
import React, { useEffect, useCallback } from "react";
import { useFonts } from "expo-font";
import { Provider } from "react-redux";
import { SplashScreen } from "expo-splash-screen";
import { store } from "./redux/store";

import Main from "./components/Main";

import "./firebase";

export default function App() {
  // підключення шрифту
  const [fontsLoaded] = useFonts({
    RobotoBold: require("./assets/fonts/Roboto/Roboto-Bold.ttf"),
    Roboto: require("./assets/fonts/Roboto/Roboto-Regular.ttf"),
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
