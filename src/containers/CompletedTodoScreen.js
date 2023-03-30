// Import Libraries
import { useState, useEffect } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import LottieView from "../components/LottieView";
// Import Custom Hook
import { useTodos } from "../contexts/AppContext";
import CompletedTodoCard from "../components/CompletedTodoCard";

export function CompletedTodoScreen() {
  const [isAnyCompletedTodo, setIsAnyCompletedTodo] = useState(false);
  const { todos } = useTodos();

  useEffect(() => {
    const filteredIsComplted = todos.filter((todo) => {
      return todo.is_completed === true;
    });
    filteredIsComplted.length < 1
      ? setIsAnyCompletedTodo(true)
      : setIsAnyCompletedTodo(false);
  }, [todos]);

  return (
    <View style={completeTabStyle.completedTodoScreenContainer}>
      {isAnyCompletedTodo === true ? (
        <LottieView
          path={require("../../assets/animations/thinking-man.json")}
          title="No Completed Tasks"
        />
      ) : (
        <FlatList
          data={todos}
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
