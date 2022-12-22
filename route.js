import { createStackNavigator } from "@react-navigation/stack";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Login from "./Screens/Login";
import Register from "./Screens/Registration";

import Home from "./Screens/Main/Home";
import CreateScreen from "./Screens/Main/CreateScreen";

// import icons

const AuthStack = createStackNavigator(); // вказує на групу навігаторів
// const Tabs = createBottomTabNavigator();
const HomeStack = createStackNavigator(); //група навігаторів з одним компонентом
const CreateStack = createStackNavigator(); //група навігаторів з одним компонентом

export default function  useRoute  (isAuth)  {
  if (!isAuth) {
    return (
      <AuthStack.Navigator initialRouteName="Login">
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Register"
          component={Register}
        />
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={Login}
        />
        {/* тимчасово тут, поки не підключен редакс для зміни стану */}
        {/* <AuthStack.Screen
          options={{ headerShown: false }}
          name="Home"
          component={Home}
        /> */}
      </AuthStack.Navigator>
    );
  }
  return <Home />;
};



// <Tabs.Navigator tabBarOptions={{ showLabel: false }}>
//   <Tabs.Screen
//     options={{
//       tabBarIcon: () => <GridIcon width={40} height={40} />,
//       headerShown: false,
//     }}
//     name="Posts"
//     component={PostsScreen}
//   />
//   <Tabs.Screen
//     options={{
//       tabBarIcon: () => <NewIcon width={70} height={40} />,
//       headerShown: false,
//     }}
//     name="Create"
//     component={CreateScreen}
//   />
//   <Tabs.Screen
//     options={{
//       tabBarIcon: () => <UserIcon width={40} height={40} />,
//       headerShown: false,
//     }}
//     name="Profile"
//     component={ProfileScreen}
//   />
// </Tabs.Navigator>
