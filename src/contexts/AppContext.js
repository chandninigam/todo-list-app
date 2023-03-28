import { useState, createContext, useEffect, useContext } from "react";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const Context = createContext();

export function ContextProvider({ children }) {
  const [todos, setTodos] = useState([]);
  const [completeTodos, setCompleteTodos] = useState([]);

  useEffect(() => {
    (async function getTodos() {
      const todosString = await AsyncStorage.getItem("TodoAppData");
      const todos = JSON.parse(todosString) || [];
      setTodos(todos);
    })();
  }, []);

  return (
    <Context.Provider
      value={{
        todos,
        setTodos,
        completeTodos,
        setCompleteTodos,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export function useTodos() {
  const { setTodos, todos, setCompleteTodos } = useContext(Context);

  function addTodo(input) {
    const createdTodoObject = {
      title: input,
      description: "Long Description",
      isCompleted: false,
      todo_created: new Date(),
      date_completed: null,
    };
    setTodos((prev) => {
      const updatedTodos = [...prev, createdTodoObject];
      AsyncStorage.setItem("TodoAppData", JSON.stringify(updatedTodos));
      return updatedTodos;
    });
  }

  function setTodoCompleted(item) {
    Alert.alert("Completed", `Congratulations for completeing "${item}" task`, [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Completed",
        onPress: () => {
          setCompleteTodos((prev) => [...prev, item]);
        },
        style: "default",
      },
    ]);
  }

  function deleteTodo(item) {
    const filterTodo = todos.filter((each) => each !== item);
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
            AsyncStorage.setItem("TodoAppData", JSON.stringify(filterTodo));
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
          setTodos([]);
          await AsyncStorage.removeItem("TodoAppData");
        },
        style: "destructive",
      },
    ]);
  }

  return {
    todos,
    setTodos,
    setTodoCompleted,
    addTodo,
    deleteAllTodos,
    deleteTodo,
  };
}
