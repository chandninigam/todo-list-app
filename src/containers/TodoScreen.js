// Import Libraries
import { useContext, useEffect } from "react";
import { View, StyleSheet, FlatList } from "react-native";

import { useNavigation } from "@react-navigation/native";
import Toast, { BaseToast } from "react-native-toast-message";

// Import Components
import TodoCard from "../components/TodoCard";
import LottieView from "../components/LottieView";
import { AddTodoButton } from "../components/AddTodoButton";

// Import Custom Hook
import { useTodos, Context } from "../contexts/AppContext";
import { TodoEditModal } from "./TodoEditModal";

export function TodoListScreen(props) {
  const { todos } = useTodos();

  const { setShowClearTodosBtn } = useContext(Context);
  const navigation = useNavigation();

  useEffect(() => {
    const unSubscribe = navigation.addListener("focus", () => {
      setShowClearTodosBtn(true);
    });
    return unSubscribe;
  }, [navigation]);

  function getInCompletedTodosLength() {
    const getInCompletedTodos = todos.filter(
      (todo) => todo.isCompleted === false
    );
    return getInCompletedTodos.length;
  }

  return (
    <View style={styles.todoListScreenWrapper}>
      <TodoEditModal editable={true} />
      {/* HEADER */}
      <View style={styles.todoListScreenListViewWrapper}>
        {/* Conditonal rendering according to length of todos */}
        {getInCompletedTodosLength() < 1 ? (
          <LottieView
            path={require("../../assets/animations/emoji.json")}
            title="Empty List"
          />
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
            data={todos}
            renderItem={({ item }) => <TodoCard item={item} />}
          />
        )}
      </View>
      {/* FOOTER */}
      <AddTodoButton />
      <Toast
        config={{
          success: (props) => (
            <BaseToast
              {...props}
              text1Style={{ fontSize: 20, fontWeight: "400" }}
              style={{ borderLeftColor: "green" }}
            />
          ),
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  todoListScreenWrapper: {
    flex: 1,
    backgroundColor: "#fff",
  },
  todoListScreenListViewWrapper: {
    display: "flex",
    flex: 1,
  },
});
