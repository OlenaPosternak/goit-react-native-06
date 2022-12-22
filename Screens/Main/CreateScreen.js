import React, { useState, useEffect } from "react";
import { Camera } from "expo-camera";

import * as Location from "expo-location";

import {
  Alert,
  Button,
  Image,
  Keyboard,
  Text,
  ScrollView,
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput,
} from "react-native";

import ArrowLeft from "../../assets/img/arrow-left.svg";
import MapIcon from "../../assets/img/map-pin.svg";
import Photo from "../../assets/img/Photo.svg";
import Trash from "../../assets/img/trash.svg";

export const CreateScreen = ({ onLayout, navigation }) => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState(null);

  //   camera

  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);

  //   зайва змінна?

  const nameHandler = (text) => setName(text.trim());
  //   const locationHandler = (text) => setLocation(text.trim());

  const onPost = () => {
    if (!name.trim() && !location) {
      Alert.alert(`Please fill in all info!`);
      return;
    }
    sendInfo();
    setName("");
    setLocation(null);
    setPhoto(null);
    Keyboard.dismiss();
  };

  const keyboardHide = () => {
    Keyboard.dismiss();
  };

  const onDelete = () => {
    setName("");
    setLocation(null);
    setPhoto(null);

    Keyboard.dismiss();
  };

  //   Camera
  const takePhoto = async () => {
    const photo = await camera.takePictureAsync();
    setPhoto(photo.uri);
  };

  useEffect(() => {
    (async () => {
      if (Platform.OS === "android" && !Device.isDevice) {
        setErrorMsg(
          "Oops, this will not work on Snack in an Android Emulator. Try it on your device!"
        );
        return;
      }
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      //   let location = await Location.getCurrentPositionAsync({});
      let locationOfPhoto = await Location.getCurrentPositionAsync();

      let coords = {
        latitude: locationOfPhoto.coords.latitude,
        longitude: locationOfPhoto.coords.longitude,
      };
      setLocation(coords);
    //   console.log(`location`, location);
    })();
  }, []);

  const sendInfo = () => {
    navigation.navigate("Posts", { photo, name, location });
  };

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }
  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={{ marginTop: 100 }}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="Change photo" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} onLayout={onLayout}>
      <TouchableWithoutFeedback onPress={keyboardHide}>
        <View>
          <View style={styles.header}>
            <Text style={{ ...styles.title, fontFamily: "RobotoBold" }}>
              Create post
            </Text>
            <TouchableOpacity style={styles.backBtn} onPress={()=>( navigation.navigate("Posts"))}>
              <ArrowLeft width={24} height={24} />
            </TouchableOpacity>
          </View>
          <View
            style={{
              height: "100%",
              justifyContent: "space-between",
            }}
          >
            <View>
              {photo ? (
                <View style={styles.takePhotoContainer}>
                  <Image
                    source={{ uri: photo }}
                    style={{ height: 240, width: "100%" }}
                  />
                  <TouchableOpacity
                    style={styles.changeBtn}
                    onPress={() => setPhoto(null)}
                  >
                    <Text style={{ color: "#fff" }}>New Photo</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <Camera
                  ref={setCamera}
                  style={{
                    ...styles.camera,
                    backgroundColor: "rgba(189, 189, 189, 1)",
                  }}
                >
                  <TouchableOpacity onPress={takePhoto}>
                    <Photo />
                  </TouchableOpacity>
                </Camera>
              )}

              <View style={styles.form}>
                <TextInput
                  value={name}
                  onChangeText={nameHandler}
                  placeholder="Name"
                  style={{
                    ...styles.input,
                    fontFamily: "Roboto",
                  }}
                />
                <View>
                  <TouchableOpacity
                    style={{
                      ...styles.input,
                      paddingLeft: 28,

                      justifyContent: "center",
                    }}
                    onPress={() => navigation.navigate("MapScreen")}
                  >
                    <MapIcon style={styles.location} />
                    <Text
                      style={{
                        fontFamily: "Roboto",
                        color: "#BDBDBD",
                        fontSize: 16,
                      }}
                    >
                      Location: {location?.latitude}, {location?.longitude}
                    </Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  disabled={photo ? false : true}
                  style={styles.submitBtn}
                  activeOpacity={0.8}
                  onPress={onPost}
                >
                  <Text style={{ fontFamily: "Roboto" }}>POST</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ alignItems: "center" }}>
              <TouchableOpacity onPress={onDelete}>
                <Trash width={70} height={40} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    position: "relative",
    paddingTop: 55,
    paddingBottom: 11,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, 0.3)",
  },
  title: {
    fontSize: 17,
    lineHeight: 22,
  },

  backBtn: {
    position: "absolute",
    top: 55,
    left: 16,
  },
  camera: {
    height: 240,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 16,
    marginTop: 32,
  },
  takePhotoContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 16,
    marginTop: 32,
  },
  changeBtn: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 43,
    marginBottom: 16,

    height: 50,
    width: 150,
    borderWidth: 1,
    borderRadius: 100,
    borderColor: "#FF6C00",
    backgroundColor: "#FF6C00",
  },

  download: {
    fontSize: 16,
    color: "#BDBDBD",
    marginBottom: 32,
  },

  form: {
    marginHorizontal: 16,
    marginTop: 8,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
    height: 50,
    fontSize: 16,
  },
  location: {
    position: "absolute",

    left: 0,
    bottom: 15,
  },
  submitBtn: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 32,

    height: 50,
    borderWidth: 1,
    borderRadius: 100,
    borderColor: "rgba(189, 189, 189, 1)",
    backgroundColor: "rgba(189, 189, 189, 1)",
  },
});

export default CreateScreen;
