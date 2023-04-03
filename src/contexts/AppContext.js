import { useState, createContext, useEffect, useContext } from "react";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";
import { TODOS_STORAGE_KEY } from "../constants";

export const Context = createContext();

export function ContextProvider({ children }) {
  const [todos, setTodos] = useState([]);
  const [showClearTodosBtn, setShowClearTodosBtn] = useState(true);
  const [showClearCompletedTodosBtn, setShowClearCompletedTodosBtn] =
    useState(true);
  const [showTodoEditModal, setShowTodoEditModal] = useState(false);
  const [selectedEditTodo, setSelectedEditTodo] = useState(null);

  useEffect(() => {
    (async function getTodos() {
      const todosString = await AsyncStorage.getItem(TODOS_STORAGE_KEY);
      const todos = JSON.parse(todosString) || [];
      setTodos(todos);
    })();
  }, []);

  return (
    <Context.Provider
      value={{
        todos,
        setTodos,
        showClearTodosBtn,
        setShowClearTodosBtn,
        showClearCompletedTodosBtn,
        setShowClearTodosBtn,
        showTodoEditModal,
        setShowTodoEditModal,
        selectedEditTodo,
        setSelectedEditTodo,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export function useTodos() {
  const {
    todos,
    setTodos,
    showTodoEditModal,
    setShowTodoEditModal,
    selectedEditTodo,
    setSelectedEditTodo,
  } = useContext(Context);

  function addTodo(todo) {
    // Add id for Every new Todo
    const createdTodoObject = {
      ...todo,
      id: uuid.v4(),
      isCompleted: false,
      dateCreated: new Date(),
      dateCompleted: null,
    };
    setTodos((prev) => {
      const updatedTodos = [...prev, createdTodoObject];
      AsyncStorage.setItem(TODOS_STORAGE_KEY, JSON.stringify(updatedTodos));
      return updatedTodos;
    });
  }

  function updateTodo(todo, updatedTodo) {
    // Compare on basis of id
    const index = todos.findIndex((todoObj) => todoObj.id === todo.id);
    let updatedTodos = [...todos];
    updatedTodos[index] = {
      ...updatedTodos[index],
      ...updatedTodo,
    };
    setTodos(() => {
      AsyncStorage.setItem(TODOS_STORAGE_KEY, JSON.stringify(updatedTodos));
      return updatedTodos;
    });
  }

  function setTodoCompleted(item) {
    const index = todos.findIndex((obj) => obj.id === item.id);
    let newArrayTodo = [...todos];
    newArrayTodo[index] = {
      ...newArrayTodo[index],
      isCompleted: true,
      dateCompleted: new Date(),
    };
    setTodos(() => {
      const updatedTodos = newArrayTodo;
      AsyncStorage.setItem(TODOS_STORAGE_KEY, JSON.stringify(updatedTodos));
      return updatedTodos;
    });
  }

  function deleteTodo(item) {
    const filterTodo = todos.filter((each) => each.id !== item.id);
    Alert.alert(
      "Delete",
      `Do you really want to remove ${`"${item.title}"`} ?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Remove",
          onPress: () => {
            setTodos(filterTodo);
            AsyncStorage.setItem(TODOS_STORAGE_KEY, JSON.stringify(filterTodo));
          },
          style: "destructive",
        },
      ]
    );
  }

  function deleteAllTodos() {
    Alert.alert("Delete All", "Do you really want to delete all?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        onPress: async () => {
          const completedTodos = todos.filter((t) => t.isCompleted);
          setTodos(completedTodos);
          await AsyncStorage.setItem(
            TODOS_STORAGE_KEY,
            JSON.stringify(completedTodos)
          );
        },
        style: "destructive",
      },
    ]);
  }

  function deletedAllCompletedTodos() {
    Alert.alert(
      "Delete All Completed Todos",
      "Do you really want to delete all?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: async () => {
            const unCompletedTodos = todos.filter((t) => !t.isCompleted);
            setTodos(unCompletedTodos);
            await AsyncStorage.setItem(
              TODOS_STORAGE_KEY,
              JSON.stringify(unCompletedTodos)
            );
          },
          style: "destructive",
        },
      ]
    );
  }

  return {
    todos,
    setTodos,
    showTodoEditModal,
    setShowTodoEditModal,
    selectedEditTodo,
    setSelectedEditTodo,
    addTodo,
    updateTodo,
    setTodoCompleted,
    deleteTodo,
    deleteAllTodos,
    deletedAllCompletedTodos,
  };
}
