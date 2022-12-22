// App.js

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { NavigationContainer } from "@react-navigation/native";
import useRoute from "../route";

import "../firebase";
// import { app } from "../firebase";
// import { getAuth } from "firebase/auth";
import { authStateCahngeUser } from "../redux/auth/authOperations";
// const auth = getAuth(app);

export default function Main({ onLayout }) {
  const { stateChange } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authStateCahngeUser());
  }, []);

  const routing = useRoute(stateChange);

  return (
    <NavigationContainer onLayout={onLayout}>{routing}</NavigationContainer>
  );
}
