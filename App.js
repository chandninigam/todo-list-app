import React, { useContext, useEffect } from "react";
import { Dimensions, StatusBar, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import {
  AntDesign as AntDesignIcon,
  Foundation as FoundationIcon,
} from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { TodoScreen } from "./src/containers/TodoScreen";
import { CompletedTodoScreen } from "./src/containers/CompletedTodoScreen";
import { ContextProvider, Context, useTodos } from "./src/contexts/AppContext";
import "./polyfill";
import SourceSansRegular from "./assets/fonts/source-sans-regular.ttf";
import SourceSansMedium from "./assets/fonts/source-sans-medium.ttf";
import SourceSansBold from "./assets/fonts/source-sans-bold.ttf";

const BottomTab = createBottomTabNavigator();

StatusBar.setBarStyle("dark-content");

const { height } = Dimensions.get("window");

function AppNavigator() {
  const { todos } = useContext(Context);
  const { deleteAllTodos } = useTodos();
  const [loaded] = useFonts({
    SourceSansRegular: SourceSansRegular,
    SourceSansMedium: SourceSansMedium,
    SourceSansBold: SourceSansBold,
  });

  if (!loaded) {
    return null;
  }
  return (
    <NavigationContainer>
      <BottomTab.Navigator
        screenOptions={{
          tabBarLabelPosition: "beside-icon",
          tabBarLabelStyle: {
            fontSize: 20,
            fontFamily: "SourceSansBold",
          },
          tabBarActiveTintColor: "#548af0",
          tabBarInactiveTintColor: "#aaacad",
          pressOpacity: 1,
        }}
      >
        <BottomTab.Screen
          name="Todos"
          component={TodoScreen}
          options={{
            title: "Todos",
            headerTitleStyle: {
              fontSize: 24,
              fontFamily: "SourceSansMedium",
            },
            headerRight: () => (
              <TouchableOpacity
                disabled={todos.length < 1}
                onPress={deleteAllTodos}
                style={{ marginRight: height / 40 }}
              >
                <AntDesignIcon
                  name="delete"
                  size={24}
                  color={todos.length < 1 ? "#c1cde0" : "red"}
                />
              </TouchableOpacity>
            ),
            tabBarIcon: ({ size, focused }) => (
              <FoundationIcon
                name="page-edit"
                color={focused ? "#548af0" : "#aaacad"}
                size={size}
              />
            ),
          }}
        />
        <BottomTab.Screen
          name="Completed Todos"
          component={CompletedTodoScreen}
          options={{
            title: "Completed",
            headerTitle: "Completed Todos",
            headerTitleStyle: {
              fontSize: height / 36,
              fontWeight: "700",
              fontFamily: "SourceSansBold",
            },
            tabBarIcon: ({ size, focused }) => (
              <AntDesignIcon
                name="checksquare"
                color={focused ? "#548af0" : "#aaacad"}
                size={size}
              />
            ),
          }}
        />
      </BottomTab.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <ContextProvider>
      <AppNavigator />
    </ContextProvider>
  );
}
