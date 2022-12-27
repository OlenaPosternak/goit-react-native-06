import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  Dimensions,
  Image,
  ImageBackground,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { collection, onSnapshot, where, query } from "firebase/firestore";
import { db } from "../../firebase";

import { authSignOutUser } from "../../redux/auth/authOperations";

// import ions
import Delete from "../../assets/img/delete.svg";
import LogOutIcon from "../../assets/img/log-out.svg";
import Shape from "../../assets/img/Shape.svg";
import ThumbsUp from "../../assets/img/thumbs-up.svg";
import Location from "../../assets/img/map-pin.svg";

const ProfileScreen = ({ onLayout, navigation }) => {
  const { login, userId } = useSelector((state) => state.auth);
  const [userPosts, setUserposts] = useState("");
  const { myImage } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  //   get all posts from current user
  const getUserPosts = async () => {
    try {
      const dbRef = query(
        collection(db, "posts"),
        where("userId", "==", userId)
      );
      onSnapshot(dbRef, (docSnap) =>
        setUserposts(docSnap.docs.map((doc) => ({ ...doc.data() })))
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserPosts();
  }, []);

  const signOut = () => {
    dispatch(authSignOutUser());
  };

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
  //

  const renderItem = ({ item }) => (
    <View style={styles.cardInfo}>
      <Image
        source={{ uri: item.photo }}
        style={{ height: 240, width: 350, borderRadius: 8 }}
      />
      <View style={{ width: "100%" }}>
        <Text style={{ ...styles.locationName, fontFamily: "Roboto" }}>
          {item.description}
        </Text>
        <View
          style={{ ...styles.infoSection, justifyContent: "space-between" }}
        >
          <View style={{ flexDirection: "row" }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Comments", {
                    postId: item.userId,
                    photo: item.photo,
                  });
                }}
              >
                <Shape width={24} height={24} />
              </TouchableOpacity>

              <Text style={{ alignSelf: "center", marginRight: 8 }}>
                {" "}
                Comments{" "}
              </Text>
            </View>

            {/* <View style={{ flexDirection: "row" }}>
              <TouchableOpacity>
                <ThumbsUp width={24} height={24} />
              </TouchableOpacity>
              <Text style={{ alignSelf: "center", marginLeft: 8 }}> Like </Text>
            </View> */}
          </View>
          <TouchableOpacity
            style={{ flexDirection: "row", justifyContent: "center" }}
            onPress={() =>
              navigation.navigate("MapScreen", { location: item.location })
            }
          >
            <Location width={24} height={24} />
            <Text style={{ alignSelf: "center", marginLeft: 8 }}>
              {item.city}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container} onLayout={onLayout}>
      <View style={{ flex: 1 }}>
        <ImageBackground
          style={{
            ...styles.imageBGPicture,
            width: windowWidth,
            height: windowHeight,
          }}
          source={require("../../assets/img/Photo_BG.jpg")}
        >
          <View style={styles.wrapper}>
            <View style={styles.image_thumb}>
              {myImage ? (
                <Image
                  source={{ uri: myImage }}
                  style={{
                    height: 120,
                    with: 120,
                    borderRadius: 16,
                  }}
                />
              ) : (
                <View>
                  <Text>No Image</Text>
                  {/* <Delete style={styles.addBtn} width={25} height={25} /> */}
                </View>
              )}
            </View>

            <TouchableOpacity onPress={signOut} style={styles.logOutBtn}>
              <LogOutIcon width={24} height={24} />
            </TouchableOpacity>
            <Text style={{ ...styles.title, fontFamily: "RobotoBold" }}>
              {login}
            </Text>
            <View>
              <FlatList
                data={userPosts}
                keyExtractor={userPosts.id}
                renderItem={renderItem}
              />
            </View>
          </View>
        </ImageBackground>
      </View>
    </View>
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
    marginTop: 147,
    paddingTop: 33,
    paddingBottom: 80,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
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
  delBtn: {
    position: "absolute",
    bottom: 14,
    left: 104,
  },
  logOutBtn: {
    position: "absolute",
    top: 24,
    right: 16,
  },
  title: {
    marginTop: 32,
    fontSize: 30,
    lineHeight: 35.16,
    marginBottom: 33,
  },
  cardInfo: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 35,
    marginHorizontal: 16,
  },
  locationName: {
    fontSize: 16,
    marginTop: 8,
  },
  infoSection: {
    marginTop: 8,
    flexDirection: "row",
  },
});

export default ProfileScreen;
