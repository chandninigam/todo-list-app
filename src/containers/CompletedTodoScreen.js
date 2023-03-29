// Import Libraries
import { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { AntDesign as AntDesignIcon } from "@expo/vector-icons";
import EmptyList from "../components/EmptyList";
// Import Custom Hook
import { useTodos } from "../contexts/AppContext";

const { height } = Dimensions.get("window");

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
    <View style={completeTabStyle.wrapper}>
      {isAnyCompletedTodo === true ? (
        <EmptyList
          path={require("../../assets/animations/thinking-man.json")}
          title="No Completed Tasks"
        />
      ) : (
        <View>
          {todos.map((todo) => {
            if (todo.is_completed) {
              return (
                <View
                  key={todo.todo_date_completed}
                  style={completeTabStyle.listWrapper}
                >
                  <View style={completeTabStyle.listTitleIcon}>
                    <Text.Regular style={completeTabStyle.headingText}>
                      {todo.title}
                    </Text.Regular>
                    <AntDesignIcon name="checkcircle" size={24} color="green" />
                  </View>
                  <Text.Regular style={completeTabStyle.textCompletedOn}>
                    Completed on:
                    {` ${new Date().getDate()} - ${new Date().toLocaleString(
                      "default",
                      {
                        month: "long",
                      }
                    )}`}
                  </Text.Regular>
                </View>
              );
            }
            return null;
          })}
        </View>
      )}
    </View>
  );
}

const completeTabStyle = StyleSheet.create({
  wrapper: {
    display: "flex",
    flex: 1,
  },
  listWrapper: {
    display: "flex",
    backgroundColor: "white",
    margin: 12,
    shadowColor: "#000",
    borderRadius: 12,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.12,
    shadowRadius: 3.84,
    elevation: 2,
  },
  listTitleIcon: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: height / 80,
  },
  headingText: {
    display: "flex",
    flex: 1,
    alignSelf: "flex-start",
    fontSize: 20,
    fontWeight: "700",
  },
  textCompletedOn: {
    fontSize: 16,
    marginBottom: 8,
    paddingHorizontal: 16,
    color: "#abafb3",
  },
});
