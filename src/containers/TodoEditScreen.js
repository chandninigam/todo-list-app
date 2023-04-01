// Import Libraries
import { useContext, useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Model from "react-native-modal";
import { Context, useTodos } from "../contexts/AppContext";

export function TodoEditScreen(props) {
  const todo = props.route.params?.todo;
  const [todoTitle, setTodoTitle] = useState(todo?.title || "");
  const [todoDescription, setTodoDescription] = useState(
    todo?.description || ""
  );
  const [isVisibleModal, setIsVisibleModal] = useState(true);
  const { setShowClearTodosBtn } = useContext(Context);
  const { addTodo, updateTodo } = useTodos();
  const navigation = useNavigation();

  useEffect(() => {
    const unSubscribe = navigation.addListener("focus", () => {
      setShowClearTodosBtn(false);
    });
    return unSubscribe;
  }, [navigation]);

  return (
    <Model isVisible={isVisibleModal}>
      <View style={styles.todoEditScreenWrapper}>
        <TextInput
          value={todoTitle}
          placeholder="Title"
          style={styles.todoEditScreenTitle}
          onChangeText={(value) => {
            setTodoTitle(value);
          }}
        />
        <View style={styles.todoEditScreenDescriptionWrapper}>
          <TextInput
            editable
            multiline
            numberOfLines={4}
            value={todoDescription}
            placeholder="Add Description"
            style={styles.todoEditScreenDescriptionText}
            onChangeText={(value) => {
              setTodoDescription(value);
            }}
          />
        </View>
        <TouchableOpacity
          style={styles.todoEditScreenAddBtn}
          onPress={() => {
            setIsVisibleModal(!isVisibleModal);
            if (todo) {
              // upadte existing todo
              updateTodo(todo, todoTitle, todoDescription);
            } else {
              // save new todo
              addTodo(todoTitle, todoDescription);
            }
          }}
        >
          <Text.Bold style={styles.todoEditScreenAddBtnText}>
            {todo ? "Update" : "Add"}
          </Text.Bold>
        </TouchableOpacity>
      </View>
    </Model>
  );
}

const styles = StyleSheet.create({
  todoEditScreenWrapper: {
    display: "flex",
    backgroundColor: "white",
    padding: 24,
    marginBottom: 32,
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
  todoEditScreenTitle: {
    fontSize: 24,
    fontWeight: "600",
  },
  todoEditScreenDescriptionWrapper: {
    marginTop: 16,
    height: 500,
  },
  todoEditScreenDescriptionText: {
    fontSize: 20,
  },
  todoEditScreenAddBtn: {
    display: "flex",
    alignSelf: "flex-end",
    padding: 12,
    marginTop: 8,
    backgroundColor: "#548af0",
    borderRadius: 12,
  },
  todoEditScreenAddBtnText: {
    fontSize: 20,
    color: "white",
  },
});
