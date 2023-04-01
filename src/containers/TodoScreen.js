// Import Libraries
import { useContext, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import Toast, { BaseToast } from "react-native-toast-message";
import Modal from "react-native-modal";
// Import Components
import TodoCard from "../components/TodoCard";
import LottieView from "../components/LottieView";
import { AddTodoButton } from "../components/AddTodoButton";

// Import Custom Hook
import { useTodos, Context } from "../contexts/AppContext";
import { AntDesign as AntDesignIcon } from "@expo/vector-icons";

export function TodoListScreen(props) {
  // const todo = props.route.params?.todo;
  // const todo = {};
  // const [todoTitle, setTodoTitle] = useState("");
  // const [todoDescription, setTodoDescription] = useState("");
  // const [isVisibleModal, setIsVisibleModal] = useState(false);
  const { setShowClearTodosBtn } = useContext(Context);
  const {
    todos,
    showTodoEditModal,
    setShowTodoEditModal,
    selectedEditTodo,
    setSelectedEditTodo,
    addTodo,
    updateTodo,
  } = useTodos();
  const navigation = useNavigation();

  useEffect(() => {
    const unSubscribe = navigation.addListener("focus", () => {
      setShowClearTodosBtn(true);
    });
    return unSubscribe;
  }, [navigation]);

  function getInCompletedTodosLength() {
    const getInCompletedTodos = todos.filter(
      (todo) => todo.is_completed === false
    );
    return getInCompletedTodos.length;
  }

  return (
    <View style={styles.todoListScreenWrapper}>
      <Modal isVisible={showTodoEditModal}>
        <View style={modalStyles.todoEditScreenWrapper}>
          <TextInput
            value={selectedEditTodo?.title}
            placeholder="Title"
            style={modalStyles.todoEditScreenTitle}
            onChangeText={(value) => {
              // setTodoTitle(value);
            }}
          />
          <View style={modalStyles.todoEditScreenDescriptionWrapper}>
            <TextInput
              editable
              multiline
              numberOfLines={4}
              value={selectedEditTodo?.description}
              placeholder="Add Description"
              style={modalStyles.todoEditScreenDescriptionText}
              onChangeText={(value) => {
                // setTodoDescription(value);
              }}
            />
          </View>
          <TouchableOpacity
            style={modalStyles.todoEditScreenAddBtn}
            onPress={() => {
              setShowTodoEditModal(false);
              if (selectedEditTodo) {
                // upadte existing todo
                updateTodo(selectedEditTodo, {
                  title: "abc",
                  description: "abc2",
                });
              } else {
                // save new todo
                addTodo({ title: "test5", description: "test5" });
              }
            }}
          >
            <Text.Bold style={modalStyles.todoEditScreenAddBtnText}>
              {selectedEditTodo ? "Update" : "Add"}
            </Text.Bold>
          </TouchableOpacity>
        </View>
      </Modal>
      {/* HEADER */}
      <View style={styles.todoListScreenListViewWrapper}>
        {/* Conditonal rendering according to length of todos */}
        {getInCompletedTodosLength() < 1 ? (
          <LottieView
            path={require("../../assets/animations/emoji.json")}
            title="Empty List"
          />
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
            data={todos}
            renderItem={({ item }) => <TodoCard item={item} />}
          />
        )}
      </View>
      {/* FOOTER */}
      <AddTodoButton />
      <Toast
        config={{
          success: (props) => (
            <BaseToast
              {...props}
              text1Style={{ fontSize: 20, fontWeight: "400" }}
              style={{ borderLeftColor: "green" }}
            />
          ),
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  todoListScreenWrapper: {
    flex: 1,
    backgroundColor: "#fff",
  },
  todoListScreenListViewWrapper: {
    display: "flex",
    flex: 1,
  },
});

const modalStyles = StyleSheet.create({
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
