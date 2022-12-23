import { useTogglePasswordVisibility } from "../assets/useTogglePasswordVisibility";

import Add from "../assets/img/add.svg";
import React, { useState, useEffect, useCallback } from "react";
import {
  Dimensions,
  ImageBackground,
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import { authSignUpUser } from "../redux/auth/authOperations";
import { useDispatch } from "react-redux";

const initialState = {
  email: "",
  password: "",
  login: "",
};

const Registration = ({ navigation, onLayout }) => {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);

  const dispatch = useDispatch();

  const [borderColorLogin, setborderColorLogin] = useState("#E8E8E8");
  const [borderColorEmail, setborderColorEmail] = useState("#E8E8E8");
  const [borderColorPassword, setborderColorPassword] = useState("#E8E8E8");

  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
    useTogglePasswordVisibility();

  const onRegister = () => {
    dispatch(authSignUpUser(state));
    setState(initialState);
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  //   відступ від краю екрану
  //  параметри екрану
  const [windowWidth, setWindowWidth] = useState(
    Dimensions.get("window").width
  );

  const [windowHeight, setWindowHeight] = useState(
    Dimensions.get("window").height
  );

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width;
      setWindowWidth(width);
      const height = Dimensions.get("window").height;
      setWindowHeight(height);
    };
    const dimensionsHandler = Dimensions.addEventListener("change", onChange);

    return () => dimensionsHandler?.remove();
  }, []);

  return (
    <ScrollView style={styles.container} onLayout={onLayout}>
      <TouchableWithoutFeedback onPress={keyboardHide}>
        <ImageBackground
          style={{
            ...styles.imageBGPicture,
            width: windowWidth,
            height: windowHeight,
          }}
          source={require("../assets/img/Photo_BG.jpg")}
        >
          <View
            style={{
              ...styles.wrapper,
              marginTop: isShowKeyboard ? 147 : 263,
            }}
          >
            <View style={styles.image_thumb}>
              <Add style={styles.addBtn} width={25} height={25} />
            </View>
            <Text style={{ ...styles.title, fontFamily: "RobotoBold" }}>
              Registration
            </Text>
            <View style={{ ...styles.form, width: windowWidth }}>
              <TextInput
                value={state.login}
                onChangeText={(value) =>
                  setState((prevState) => ({ ...prevState, login: value }))
                }
                onFocus={() => {
                  setborderColorLogin("#FF6C00");
                  setIsShowKeyboard(true);
                }}
                onBlur={() => setborderColorLogin("transparent")}
                placeholder="Login"
                style={{
                  ...styles.input,
                  fontFamily: "Roboto",
                  borderColor: borderColorLogin,
                }}
              />
              <TextInput
                value={state.email}
                onChangeText={(value) =>
                  setState((prevState) => ({ ...prevState, email: value }))
                }
                onFocus={() => {
                  setborderColorEmail("#FF6C00");
                  setIsShowKeyboard(true);
                }}
                onBlur={() => setborderColorEmail("transparent")}
                placeholder="Email"
                style={{
                  ...styles.input,
                  fontFamily: "Roboto",
                  borderColor: borderColorEmail,
                }}
              />
              <View style={{ position: "relative" }}>
                <TextInput
                  value={state.password}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, password: value }))
                  }
                  onFocus={() => {
                    setborderColorPassword("#FF6C00");
                    setIsShowKeyboard(true);
                  }}
                  onBlur={() => setborderColorPassword("transparent")}
                  placeholder="Password"
                  secureTextEntry={passwordVisibility}
                  style={{
                    ...styles.input,
                    fontFamily: "Roboto",
                    borderColor: borderColorPassword,
                    marginBottom: 0,
                  }}
                />

                <TouchableOpacity onPress={handlePasswordVisibility}>
                  <Text style={{ ...styles.password, fontFamily: "Roboto" }}>
                    {rightIcon}
                  </Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={styles.btn}
                activeOpacity={0.8}
                onPress={onRegister}
              >
                <Text style={{ ...styles.btnTitle, fontFamily: "Roboto" }}>
                  SING UP
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text style={{ ...styles.linkTitle, fontFamily: "Roboto" }}>
                  Already have an account?
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBGPicture: {
    flex: 1,
    resizeMode: "cover",
  },
  wrapper: {
    flex: 1,
    alignItems: "center",

    paddingTop: 92,
    borderWidth: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderColor: "#fff",
    backgroundColor: "#fff",
  },
  image_thumb: {
    position: "absolute",
    top: -60,
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderColor: "#F6F6F6",
    borderWidth: 1,
    borderRadius: 16,
  },
  addBtn: {
    position: "absolute",
    bottom: 14,
    left: 104,
  },
  title: {
    fontSize: 30,
    textAlign: "center",
    lineHeight: 35.16,
    marginBottom: 33,
  },
  form: {
    paddingHorizontal: 16,
  },
  input: {
    marginBottom: 16,
    padding: 16,
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",
  },
  password: {
    position: "absolute",
    paddingRight: 16,
    right: 0,
    bottom: 15,
    fontSize: 16,
    lineHeight: 18.75,
    textAlign: "right",
    color: "#1B4371",
  },
  btn: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 43,
    marginBottom: 16,

    height: 50,
    borderWidth: 1,
    borderRadius: 100,
    borderColor: "#FF6C00",
    backgroundColor: "#FF6C00",
  },
  btnTitle: {
    fontSize: 16,
    color: "#fff",
    lineHeight: 18.75,
  },
  linkTitle: {
    fontSize: 16,
    textAlign: "center",
    lineHeight: 18.75,
    color: "#1B4371",
  },
});

export default Registration;
