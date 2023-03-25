import { useState, createContext, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

export const Context = createContext();

export function ContextProvider({ children }) {
  const [todos, setTodos] = useState([]);
  const [completeTodos, setCompleteTodos] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    (async function getTodos() {
      const data = await AsyncStorage.getItem("appdata");
      setTodos(JSON.parse(data));
    })();
  }, []);

  return (
    <Context.Provider
      value={{
        todos,
        setTodos,
        completeTodos,
        setCompleteTodos,
        input,
        setInput,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export function useTodos() {
  const { setTodos, todos, setCompleteTodos, input, setInput } =
    useContext(Context);
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
          await AsyncStorage.removeItem("appdata");
        },
        style: "destructive",
      },
    ]);
  }

  function deleteTodo(item) {
    const filterTodo = todos.filter((each) => each !== item);
    Alert.alert("Delete", `Do you really want to delete ${`"${item}"`} ?`, [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        onPress: () => {
          setTodos(filterTodo);
        },
        style: "destructive",
      },
    ]);
  }

  //   function addTodo() {
  //     return new Promise((resolve) => {
  //       setTodos(async (prev) => {
  //         const updatedTodos = [...prev, input];
  //         await AsyncStorage.setItem("appdata", JSON.stringify(updatedTodos));
  //         return updatedTodos;
  //       });
  //       resolve();
  //     });
  //   }

  function addTodo() {
    setTodos(async (prev) => {
      const updatedTodos = [...prev, input];
      await AsyncStorage.setItem("appdata", JSON.stringify(updatedTodos));
      return updatedTodos;
    });
    // console.log("new todos", todos);
    // await AsyncStorage.setItem("appdata", JSON.stringify(todos));
    setInput("");
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

  async function getTodos() {
    try {
      const data = await AsyncStorage.getItem("appdata");
      setTodos(data);
    } catch (err) {
      console.log(err);
    }
  }

  return {
    deleteAllTodos,
    deleteTodo,
    addTodo,
    setTodoCompleted,
    getTodos,
  };
}
