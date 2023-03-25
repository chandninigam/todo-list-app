import React, { useContext, useEffect } from "react";
import { Dimensions, StatusBar, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { TodoScreen } from "./src/containers/TodoScreen";
import { CompletedTodoScreen } from "./src/containers/CompletedTodoScreen";
import { ContextProvider, Context } from "./src/contexts/AppContext";
import { AntDesign as Icon } from "@expo/vector-icons";
import "./src/components/Text";

const BottomTab = createBottomTabNavigator();

StatusBar.setBarStyle("dark-content");

const { height } = Dimensions.get("window");

export default function App() {
  // const { todos } = useContext(Context);
  // const { deleteAllTodos } = useTodos();
  return (
    <ContextProvider>
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
            component={TodoScreen}
            options={{
              title: "My Todo",
              headerTitleStyle: {
                fontSize: height / 40,
                fontWeight: "700",
                // fontFamily: "sans",
              },
              headerRight: () => (
                <TouchableOpacity
                  // disabled={todos.length < 1}
                  // onPress={deleteAllTodos}
                  style={{ marginRight: height / 40 }}
                >
                  <Icon
                    name="delete"
                    size={24}
                    // color={todos.length < 1 ? "#8a8a8a" : "red"}
                  />
                </TouchableOpacity>
              ),
            }}
          />
          <BottomTab.Screen
            name="Completed"
            component={CompletedTodoScreen}
            options={{ headerShown: false }}
          />
        </BottomTab.Navigator>
      </NavigationContainer>
    </ContextProvider>
  );
}
