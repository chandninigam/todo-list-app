// Import Libraries
import { useContext, useEffect } from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import Toast, { BaseToast } from "react-native-toast-message";
// Import Components
import TodoCard from "../components/TodoCard";
import LottieView from "../components/LottieView";
import { AddTodoInputBtn } from "../components/AddTodoInputBtn";
import { TodoEditScreen } from "./TodoEditScreen";
// Import Custom Hook
import { useTodos, Context } from "../contexts/AppContext";

const TodoScreenStack = createStackNavigator();

export function TodoNavigator() {
  return (
    <TodoScreenStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <TodoScreenStack.Screen
        name="TodoListScreen"
        component={TodoListScreen}
        screenOptions
      />
      <TodoScreenStack.Screen
        name="TodoEditScreen"
        component={TodoEditScreen}
      />
    </TodoScreenStack.Navigator>
  );
}

export function TodoListScreen() {
  const { setShowClearTodosBtn } = useContext(Context);
  const { todos } = useTodos();
  const navigation = useNavigation();

  useEffect(() => {
    const unSubscribe = navigation.addListener("focus", () => {
      setShowClearTodosBtn(true);
    });
    return unSubscribe;
  }, [navigation]);

  function getInCompletedTodosLength() {
    const getInCompletedTodos = todos.filter(
      (todo) => todo.is_completed === false
    );
    return getInCompletedTodos.length;
  }

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.topWrapper}>
        {/* Conditonal rendering according to length of todos */}
        {getInCompletedTodosLength() < 1 ? (
          <LottieView
            path={require("../../assets/animations/emoji.json")}
            title="Empty List"
          />
        ) : (
          <FlatList
            style={styles.flatList}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
            data={todos}
            renderItem={({ item }) => <TodoCard item={item} />}
          />
        )}
      </View>
      {/* FOOTER */}
      <AddTodoInputBtn />
      <Toast
        config={{
          success: (props) => (
            <BaseToast
              {...props}
              text1Style={{ fontSize: 24 }}
              style={{ borderLeftColor: "green" }}
            />
          ),
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  topWrapper: {
    display: "flex",
    flex: 1,
  },
});
