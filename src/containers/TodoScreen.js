import { useState, useEffect, useContext } from "react";
import {
  View,
  Alert,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
} from "react-native";
import { AntDesign as Icon } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { Context, useTodos } from "../contexts/AppContext";
import TodoCard from "../components/TodoCard";
import MyFont from "../../assets/fonts/source-sans-regular.ttf";

const { height } = Dimensions.get("window");

export function TodoScreen() {
  const { todos, input, setInput } = useContext(Context);
  // const [input, setInput] = useState("");

  const { addTodo } = useTodos();

  const [loaded] = useFonts({
    sans: MyFont,
  });

  if (!loaded) {
    return null;
  }
  console.log(todos);
  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.topWrapper}>
        {/* <View style={styles.headerWrapper}> */}
        {/* <Text style={styles.heading}>TODO APP</Text>
          <TouchableOpacity
            disabled={todos.length < 1}
            onPress={deleteAllTodos}
          >
            <Icon
              name="delete"
              size={24}
              color={todos.length < 1 ? "#8a8a8a" : "red"}
            />
          </TouchableOpacity>
        </View> */}
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
            addTodo();
            // .then(() => {
            //   setInput("");
            // });
          }}
        />
        <TouchableOpacity
          style={styles.addTodoBtn}
          onPress={() => {
            addTodo().then((res) => {
              setInput("");
            });
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
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
    backgroundColor: "white",
  },
  addTodoBtn: {
    flex: 0.1,
    backgroundColor: "#548af0",
    marginHorizontal: height / 120,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: height / 80,
    paddingVertical: height / 88,
    borderRadius: height / 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
});
