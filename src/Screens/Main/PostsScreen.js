import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  Image,
  FlatList,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";

import { authSignOutUser } from "../../redux/auth/authOperations";

import LogOutIcon from "../../assets/img/log-out.svg";
import Shape from "../../assets/img/Shape.svg";
import Location from "../../assets/img/map-pin.svg";

const PostsScreen = ({ onLayout, navigation }) => {
  const [postsInfo, setPostsInfo] = useState([]);

  const dispatch = useDispatch();

  const { email, login, myImage } = useSelector((state) => state.auth);
  const signOut = () => {
    dispatch(authSignOutUser());
  };

  const getAllPosts = async () => {
    const dbRef = collection(db, "posts");
    onSnapshot(dbRef, (docSnap) =>
      setPostsInfo(docSnap.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    );
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.cardInfo}>
      <Image
        source={{ uri: item.photo }}
        style={{ height: 240, width: 350, borderRadius: 8 }}
      />
      <View style={{ alignItems: "center" }}>
        <Text style={{ ...styles.locationName, fontFamily: "Roboto" }}>
          {item.description}
        </Text>
        <View style={{ ...styles.infoSection }}>
          <View style={{ flexDirection: "row", marginRight: 27 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Comments", {
                    postId: item.id,
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
          </View>
          <TouchableOpacity
            style={{ flexDirection: "row", justifyContent: "center" }}
            onPress={() =>
              navigation.navigate("MapScreen", { location: item.location })
            }
          >
            <Location width={24} height={24} />
            <View
              style={{
                alignSelf: "center",
                marginLeft: 8,
                flexDirection: "column",
              }}
            >
              <Text>{item.city}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container} onLayout={onLayout}>
      <View style={styles.header}>
        <Text style={{ ...styles.title, fontFamily: "RobotoBold" }}>Posts</Text>
        <TouchableOpacity style={styles.logOutBtn} onPress={signOut}>
          <LogOutIcon width={24} height={24} />
        </TouchableOpacity>
      </View>

      <View style={styles.userInfo}>
        <Image
          style={{ marginRight: 8, borderRadius: 16, width: 60, height: 60 }}
          source={{ uri: myImage }}
        />
        <View>
          <Text style={{ fontFamily: "RobotoBold" }}>{login}</Text>
          <Text style={{ fontFamily: "Roboto" }}>{email}</Text>
        </View>
      </View>
      <View>
        <FlatList
          data={postsInfo}
          keyExtractor={postsInfo.id}
          renderItem={renderItem}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 200,
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

  logOutBtn: {
    position: "absolute",
    top: 55,
    right: 16,
  },
  userInfo: {
    paddingLeft: 16,
    paddingTop: 32,
    flexDirection: "row",
    alignItems: "center",
  },
  cardInfo: {
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 35,
  },
  locationName: {
    fontSize: 16,
    marginTop: 8,
  },
  infoSection: {
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default PostsScreen;
