import { useState, useEffect, useContext } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
  TextInput,
} from "react-native";
import { AntDesign as Icon } from "@expo/vector-icons";
import { useTodos } from "../contexts/AppContext";
import TodoCard from "../components/TodoCard";

const { height } = Dimensions.get("window");

export function TodoScreen() {
  const [input, setInput] = useState("");

  const { addTodo, todos } = useTodos();

  // console.log("Todos", todos);
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
      <View style={styles.bottomWrapper}>
        <TextInput
          placeholder="Add Todo"
          style={styles.inputTodo}
          defaultValue={input}
          autoCorrect={false}
          returnKeyType="done"
          onChangeText={(value) => {
            setInput(value);
          }}
          // called only when multiline is false
          onSubmitEditing={() => {
            addTodo(input);
            setInput("");
          }}
        />
        <TouchableOpacity
          style={styles.addTodoBtn}
          onPress={() => {
            addTodo(input);
            setInput("");
          }}
        >
          <Icon name="plus" size={32} style={styles.addIcon} color="white" />
        </TouchableOpacity>
      </View>
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
  bottomWrapper: {
    paddingVertical: height / 48,
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
  },
  inputTodo: {
    flex: 0.9,
    backgroundColor: "white",
    padding: height / 80,
    fontSize: 20,
    borderRadius: 32,
    marginLeft: height / 100,
    paddingLeft: 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.19,
    shadowRadius: 3.84,
    elevation: 1,
    backgroundColor: "white",
  },
  addTodoBtn: {
    flex: 0.1,
    backgroundColor: "#548af0",
    marginHorizontal: height / 120,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: height / 100,
    paddingVertical: height / 88,
    borderRadius: height / 24,
    shadowColor: "#548af",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 1,
  },
});
