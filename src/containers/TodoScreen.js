// Import Libraries
import { useContext, useEffect } from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
// Import Components
import TodoCard from "../components/TodoCard";
import EmptyList from "../components/EmptyList";
import { AddTodoInputBtn } from "../components/AddTodoInputBtn";
import { TodoDescription } from "../components/Description";
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
        component={TodoDescription}
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

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.topWrapper}>
        {/* Conditonal rendering according to length of todos */}
        {todos.length < 1 ? (
          <EmptyList
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
