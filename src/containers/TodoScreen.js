// Import Libraries
import { useContext, useEffect } from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { AntDesign as AntDesignIcon } from "@expo/vector-icons";

// Import Components
import TodoCard from "../components/TodoCard";
import LottieView from "../components/LottieView";
import { AddTodoButton } from "../components/AddTodoButton";

// Import Custom Hook
import { useTodos, Context } from "../contexts/AppContext";
import { TodoEditModal } from "./TodoEditModal";

export function TodoListScreen(props) {
  const { todos } = useTodos();

  const { setShowClearTodosBtn } = useContext(Context);
  const navigation = useNavigation();

  useEffect(() => {
    const unSubscribe = navigation.addListener("focus", () => {
      setShowClearTodosBtn(true);
    });
    return unSubscribe;
  }, [navigation]);

  function getInCompletedTodosLength() {
    const getInCompletedTodos = todos.filter(
      (todo) => todo.isCompleted === false
    );
    return getInCompletedTodos.length;
  }

  // Customerised Toast
  const toastConfig = {
    tomatoToast: ({ props }) => (
      <View style={toastStyles.toastWrapper}>
        <AntDesignIcon
          name="checkcircle"
          size={28}
          color="green"
          style={toastStyles.toastIcon}
        />
        <View style={toastStyles.toastTextWrapper}>
          <Text style={toastStyles.toastTitle}>Success</Text>
          <Text style={toastStyles.toastSubtitle}>{props.text}</Text>
        </View>
      </View>
    ),
  };

  return (
    <View style={styles.todoListScreenWrapper}>
      <TodoEditModal editable={true} />
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
        config={
          toastConfig
          //   {
          //   success: (props) => (
          //     <BaseToast
          //       {...props}
          //       text1Style={{ fontSize: 20, fontWeight: "400" }}
          //       style={{ borderLeftColor: "green" }}
          //     />
          //   ),
          // }
        }
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

// Customerised Toast Style
const toastStyles = StyleSheet.create({
  toastWrapper: {
    height: 60,
    width: "90%",
    backgroundColor: "white",
    display: "flex",
    flexDirection: "row",
    marginTop: "150%",
    borderLeftColor: "green",
    borderWidth: 4,
    borderColor: "white",
    padding: 4,
    justifyContent: "center",
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
  toastIcon: {
    paddingHorizontal: 8,
    display: "flex",
    alignSelf: "center",
  },
  toastTextWrapper: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    justifyContent: "center",
    marginLeft: 12,
  },
  toastTitle: {
    fontSize: 20,
    fontWeight: "600",
    paddingBottom: 4,
  },
  toastSubtitle: {
    fontSize: 14,
    fontWeight: "400",
    paddingBottom: 4,
  },
});
