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

const { height, width } = Dimensions.get("window");

export default function App() {
  const [todo, setTodo] = useState([
    { id: 1, title: "First Todo" },
    { id: 2, title: "Second Todo" },
  ]);
  // const [loaded] = useFonts({
  //   sans: require("./assets/fonts/sans.ttf"),
  // });

  // if (!loaded) {
  //   return null;
  // }

  function ListTodo({ todo }) {
    return (
      <View style={listStyles.container}>
        <Text style={{ color: "black", fontSize: 20 }}>{todo.title}</Text>
      </View>
    );
  }

  useEffect(() => {
    () => {
      StatusBar.setBarStyle("dark-content");
    };
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.topWrapper}>
        <View style={styles.headerWrapper}>
          <Text style={styles.heading}>TODO APP</Text>
          <Icon name="delete" size={24} color="red" />
        </View>
        {/* FLatList */}
        <FlatList
          style={styles.flatList}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
          data={todo}
          renderItem={({ item }) => <ListTodo todo={item} />}
        />
      </View>
      <View style={styles.bottomWrapper}>
        <TextInput placeholder="Add Todo" style={styles.inputTodo} />
        <TouchableOpacity style={styles.addTodoBtn}>
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
});
