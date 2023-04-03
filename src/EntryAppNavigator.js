// Import Libraries
import React, { useContext } from "react";
import { TouchableOpacity, Dimensions } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  AntDesign as AntDesignIcon,
  Foundation as FoundationIcon,
} from "@expo/vector-icons";
import { useFonts } from "expo-font";
// Import Containers
import { TodoListScreen } from "./containers/TodoScreen";
import { CompletedTodoScreen } from "./containers/CompletedTodoScreen";
// Import Fonts
import SourceSansRegular from "../assets/fonts/source-sans-regular.ttf";
import SourceSansMedium from "../assets/fonts/source-sans-medium.ttf";
import SourceSansBold from "../assets/fonts/source-sans-bold.ttf";
// Import Context
import { Context, useTodos } from "./contexts/AppContext";

const { height } = Dimensions.get("window");
const BottomTab = createBottomTabNavigator();

export function EntryAppNavigator() {
  const { showClearTodosBtn } = useContext(Context);
  const { deleteAllTodos, todos } = useTodos();

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
          component={TodoListScreen}
          options={{
            title: "Todos",
            headerTitleStyle: {
              fontSize: 24,
              fontFamily: "SourceSansMedium",
            },
            headerRight: () => {
              const uncompletedTodos = todos.filter((t) => !t.isCompleted);
              const isDisabled = uncompletedTodos.length < 1;
              const noop = () => {};
              if (!showClearTodosBtn) return null;
              return (
                <TouchableOpacity
                  onPress={isDisabled ? noop : deleteAllTodos}
                  style={{ marginRight: height / 40 }}
                >
                  <AntDesignIcon
                    disabled={isDisabled}
                    name="delete"
                    size={24}
                    color={isDisabled ? "#c1cde0" : "red"}
                  />
                </TouchableOpacity>
              );
            },
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
              fontSize: 24,
              fontFamily: "SourceSansMedium",
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
