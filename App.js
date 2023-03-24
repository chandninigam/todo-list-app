import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { AntDesign as Icon } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { height, width } = Dimensions.get("window");

export default function App() {
  const [todo, setTodo] = useState([]);
  const [input, setInput] = useState("");
  // const [loaded] = useFonts({
  //   sans: require("./assets/fonts/sans.ttf"),
  // });

  // if (!loaded) {
  //   return null;
  // }

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
      console.log("data", data);
      setTodo(data);
    } catch (err) {
      console.log(err);
    }
  };

  function ListTodo({ item }) {
    return (
      <View style={listStyles.container}>
        <Text style={listStyles.listText}>{item}</Text>
        <TouchableOpacity
          onPress={() => {
            const filterTodo = todo.filter((each) => each !== item);
            setTodo(filterTodo);
          }}
        >
          <Icon name="delete" size={24} color="red" />
        </TouchableOpacity>
      </View>
    );
  }

  useEffect(() => {
    () => {
      StatusBar.setBarStyle("dark-content");
      getData();
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.topWrapper}>
        <View style={styles.headerWrapper}>
          <Text style={styles.heading}>TODO APP</Text>
          <TouchableOpacity
            disabled={todo.length < 1}
            onPress={() => {
              setTodo([]);
              getDeleteAllList;
            }}
          >
            <Icon
              name="delete"
              size={24}
              color={todo.length < 1 ? "#8a8a8a" : "red"}
            />
          </TouchableOpacity>
        </View>
        {/* FlatList */}
        <FlatList
          style={styles.flatList}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
          data={todo}
          renderItem={({ item }) => <ListTodo item={item} />}
        />
      </View>
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
          onSubmitEditing={() => {
            // called only when multiline is false
            setTodo((prev) => [...prev, input]);
          }}
        />
        <TouchableOpacity
          style={styles.addTodoBtn}
          onPress={() => {
            setTodo((prev) => [...prev, input]);
            dataSet;
            setInput("");
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
    flex: 1,
  },
});
