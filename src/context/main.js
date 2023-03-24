import { useState, createContext } from "react";

export const Context = createContext();

export function ContextProvider({ children }) {
  const [todos, setTodos] = useState([]);
  const [completeTodos, setCompleteTodos] = useState([]);
  return (
    <Context.Provider
      value={{ todos, setTodos, completeTodos, setCompleteTodos }}
    >
      {children}
    </Context.Provider>
  );
}
