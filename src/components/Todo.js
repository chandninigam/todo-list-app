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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Context } from "../context/main";

const { height } = Dimensions.get("window");

export function Todo() {
  const { todos, setTodos, setCompleteTodos } = useContext(Context);
  const [input, setInput] = useState("");

  // const [loaded] = useFonts({
  //   sans: require("./assets/fonts/sans.ttf"),
  // });

  // if (!loaded) {
  //   return null;
  // }
  function onPressAllDeleteIcon() {
    Alert.alert("Delete All", "Do you really want to delete all?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        onPress: () => {
          setTodos([]);
          getDeleteAllList;
        },
        style: "destructive",
      },
    ]);
  }

  function onPressListDeleteIcon(item) {
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

  function addTodoToList() {
    setTodos((prev) => [...prev, input]);
    dataSet;
    setInput("");
  }

  function onPressCompleteIcon(item) {
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

  const dataSet = async () => {
    try {
      await AsyncStorage.setItem("appdata", todo);
    } catch (err) {
      console.log("err-->", err);
    }
  };

  const getDeleteAllList = async () => {
    try {
      await AsyncStorage.removeItem("appdata");
    } catch (err) {
      console.log("error", console.error);
    }
  };

  const getData = async () => {
    try {
      const data = await AsyncStorage.getItem("appdata");
      setTodos(data);
    } catch (err) {
      console.log(err);
    }
  };

  function ListTodo({ item }) {
    return (
      <View style={listStyles.container}>
        <Text style={listStyles.listText}>{item}</Text>
        <TouchableOpacity
          style={listStyles.checkIcon}
          onPress={() => {
            onPressCompleteIcon(item);
          }}
        >
          <Icon name="checkcircleo" size={24} color="green" />
        </TouchableOpacity>
        <TouchableOpacity
          style={listStyles.deleteIcon}
          onPress={() => {
            onPressListDeleteIcon(item);
          }}
        >
          <Icon name="delete" size={20} color="red" />
        </TouchableOpacity>
      </View>
    );
  }

  useEffect(() => {
    () => {
      // StatusBar.setBarStyle("dark-content");
      getData();
    };
  }, []);

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.topWrapper}>
        <View style={styles.headerWrapper}>
          <Text style={styles.heading}>TODO APP</Text>
          <TouchableOpacity
            disabled={todos.length < 1}
            onPress={onPressAllDeleteIcon}
          >
            <Icon
              name="delete"
              size={24}
              color={todos.length < 1 ? "#8a8a8a" : "red"}
            />
          </TouchableOpacity>
        </View>
        {/* FLATLIST */}
        <FlatList
          style={styles.flatList}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
          data={todos}
          renderItem={({ item }) => <ListTodo item={item} />}
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
          onSubmitEditing={addTodoToList}
        />
        <TouchableOpacity style={styles.addTodoBtn} onPress={addTodoToList}>
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
    marginTop: height / 16,
  },
  headerWrapper: {
    display: "flex",
    flexDirection: "row",
    padding: height / 80,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  heading: {
    display: "flex",
    alignSelf: "flex-start",
    fontSize: height / 32,
    flex: 1,
    fontWeight: 700,
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
    // paddingVertical: height / 54,
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
  flatList: {
    marginTop: height / 40,
  },
});

const listStyles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    padding: height / 64,
    backgroundColor: "white",
    marginBottom: height / 40,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  listText: {
    color: "black",
    fontSize: 20,
    flex: 0.8,
  },
  checkIcon: {
    flex: 0.1,
    marginHorizontal: height / 80,
  },
  deleteIcon: {
    flex: 0.1,
  },
});
