import CreateScreen from "../Main/CreateScreen";
import ProfileScreen from "../Main/ProfileScreen";
import PostsScreen from "../Main/PostsScreen";
import MapScreen from "../Main/MapScreen";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import icons
import GridIcon from "../../assets/img/gridIcon.svg";
import NewIcon from "../../assets/img/newIcon.svg";
import UserIcon from "../../assets/img/userIcon.svg";
import { createStackNavigator } from "@react-navigation/stack";

import CommentsScreen from "./CommentsScreen";

const HomeTabs = createBottomTabNavigator();
const HomeStack = createStackNavigator();

export const HomeTabsBtn = () => {
  return (
    <HomeTabs.Navigator tabBarOptions={{ showLabel: false }}>
      <HomeTabs.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          tabBarIcon: () => <GridIcon width={40} height={40} />,
          headerShown: false,
        }}
      />
      <HomeTabs.Screen
        name="CreateScreen"
        component={CreateScreen}
        options={{
          tabBarStyle: { display: "none" },
          tabBarVisible: false,
          tabBarIcon: () => <NewIcon width={70} height={40} />,
          headerShown: false,
        }}
      />

      <HomeTabs.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: () => <UserIcon width={40} height={40} />,
          headerShown: false,
        }}
      />
    </HomeTabs.Navigator>
  );
};

const Home = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        options={{ headerShown: false }}
        name="Home"
        component={HomeTabsBtn}
      />
      <HomeStack.Screen
        options={{ headerShown: true }}
        name="Comments"
        component={CommentsScreen}
      />
      <HomeStack.Screen name="MapScreen" component={MapScreen} />
    </HomeStack.Navigator>
  );
};

export default Home;
