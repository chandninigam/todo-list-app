// Import Libraries
import { View, StyleSheet, FlatList } from "react-native";
// Import Components
import TodoCard from "../components/TodoCard";
// Import Custom Hook
import { useTodos } from "../contexts/AppContext";
import { AddTodoInputBtn } from "../components/AddTodoInputBtn";

export function TodoScreen() {
  const { todos } = useTodos();

  console.log(todos);
  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.topWrapper}>
        {/* FLATLIST */}
        <FlatList
          style={styles.flatList}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
          data={todos}
          renderItem={({ item }) => <TodoCard item={item} />}
        />
      </View>
      {/* FOOTER */}
      <AddTodoInputBtn />
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
