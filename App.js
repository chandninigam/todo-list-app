import React, { useContext, useEffect } from "react";
import { Dimensions, StatusBar, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { AntDesign as Icon, Foundation as Icon1 } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { TodoScreen } from "./src/containers/TodoScreen";
import { CompletedTodoScreen } from "./src/containers/CompletedTodoScreen";
import { ContextProvider, Context, useTodos } from "./src/contexts/AppContext";
import "./polyfill";
import SourceSansRegular from "./assets/fonts/source-sans-regular.ttf";
import SourceSansBold from "./assets/fonts/source-sans-bold.ttf";

const BottomTab = createBottomTabNavigator();

StatusBar.setBarStyle("dark-content");

const { height } = Dimensions.get("window");

function AppNavigator() {
  const { todos } = useContext(Context);
  const { deleteAllTodos } = useTodos();
  const [loaded] = useFonts({
    SourceSansRegular: SourceSansRegular,
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
            fontWeight: "700",
            fontSize: 24,
            fontFamily: "SourceSansBold",
          },
          headerStyle: {
            backgroundColor: "#548af0",
          },
          tabBarActiveTintColor: "#548af0",
          tabBarInactiveTintColor: "black",
          pressOpacity: 1,
        }}
      >
        <BottomTab.Screen
          name="Todos"
          component={TodoScreen}
          options={{
            title: "Todos",
            headerTitleStyle: {
              fontSize: height / 32,
              fontWeight: "700",
              fontFamily: "SourceSansBold",
            },
            headerRight: () => (
              <TouchableOpacity
                disabled={todos.length < 1}
                onPress={deleteAllTodos}
                style={{ marginRight: height / 40 }}
              >
                <Icon
                  name="delete"
                  size={24}
                  color={todos.length < 1 ? "#c1cde0" : "red"}
                />
              </TouchableOpacity>
            ),
            tabBarIcon: ({ size, focused }) => (
              <Icon1
                name="page-edit"
                color={focused ? "#548af0" : "black"}
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
              fontSize: height / 32,
              fontWeight: "700",
              fontFamily: "SourceSansBold",
            },
            tabBarIcon: ({ size, focused }) => (
              <Icon
                name="checksquare"
                color={focused ? "#548af0" : "black"}
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
