import { useEffect } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const { height } = Dimensions.get("window");
import { NavigationContainer } from "@react-navigation/native";
import { Todo } from "./src/components/Todo";
import { Completed } from "./src/components/Complete";

const BottomTab = createBottomTabNavigator();

export default function App() {
  useEffect(() => {
    () => {
      StatusBar.setBarStyle("dark-content");
    };
  }, []);
  return (
    <NavigationContainer>
      <BottomTab.Navigator
        screenOptions={{
          tabBarLabelPosition: "beside-icon",
          tabBarLabelStyle: {
            fontWeight: "700",
            fontSize: 24,
          },
          tabBarIconStyle: { display: "none" },
          tabBarActiveTintColor: "white",
          tabBarInactiveTintColor: "black",
          tabBarActiveBackgroundColor: "#548af0",
          indicatorStyle: { backgroundColor: "blue", height: "100%" },
          pressOpacity: 1,
        }}
      >
        <BottomTab.Screen
          name="Todo"
          component={Todo}
          options={{ headerShown: false }}
        />
        <BottomTab.Screen
          name="Completed"
          component={Completed}
          options={{ headerShown: false }}
        />
      </BottomTab.Navigator>
    </NavigationContainer>
  );
}
