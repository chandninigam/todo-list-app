// Import Libraries
import { useState, useEffect } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import LottieView from "../components/LottieView";
// Import Containers
import { TodoEditModal } from "./TodoEditModal";
// Import Components
import CompletedTodoCard from "../components/CompletedTodoCard";
// Import Custom Hook
import { useTodos } from "../contexts/AppContext";

export function CompletedTodoScreen() {
  const [isAnyCompletedTodo, setIsAnyCompletedTodo] = useState(false);
  const { todos } = useTodos();

  useEffect(() => {
    const filteredIsComplted = todos.filter((todo) => {
      return todo.isCompleted === true;
    });
    filteredIsComplted.length < 1
      ? setIsAnyCompletedTodo(true)
      : setIsAnyCompletedTodo(false);
  }, [todos]);

  const sortedByCompletedTodo = todos.sort(
    (a, b) =>
      Number(new Date(b.dateCompleted)) - Number(new Date(a.dateCompleted))
  );

  return (
    <View style={completeTabStyle.completedTodoScreenContainer}>
      <TodoEditModal editable={false} />
      {isAnyCompletedTodo === true ? (
        <LottieView
          path={require("../../assets/animations/thinking-man.json")}
          title="No Completed Tasks"
        />
      ) : (
        <FlatList
          data={sortedByCompletedTodo}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
          renderItem={({ item }) => <CompletedTodoCard item={item} />}
        />
      )}
    </View>
  );
}

const completeTabStyle = StyleSheet.create({
  completedTodoScreenContainer: {
    display: "flex",
    flex: 1,
    backgroundColor: "#fff",
  },
});
