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
    // paddingVertical: height / 48,
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: "white",
    padding: 4,
    borderRadius: 32,
    marginHorizontal: 12,
    marginBottom: 16,
    paddingLeft: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.121,
    shadowRadius: 3.84,
    elevation: 1,
  },
  inputTodo: {
    flex: 0.9,
    fontSize: 20,
  },
  addTodoBtn: {
    flex: 0.1,
    backgroundColor: "#548af0",
    marginHorizontal: 4,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingVertical: 10,
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
