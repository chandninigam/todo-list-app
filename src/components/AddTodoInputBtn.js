// Import Libraries
import { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { AntDesign as AntDesignIcon } from "@expo/vector-icons";
// Import Custom Hook
import { useTodos } from "../contexts/AppContext";

const { height } = Dimensions.get("window");

export function AddTodoInputBtn() {
  const [input, setInput] = useState("");
  const { addTodo } = useTodos();

  return (
    <View style={styles.wrapper}>
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
        <AntDesignIcon
          name="plus"
          size={32}
          style={styles.addIcon}
          color="white"
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
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
