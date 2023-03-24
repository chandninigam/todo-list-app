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
  Alert,
} from "react-native";
import { AntDesign as Icon } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const { height, width } = Dimensions.get("window");
import { NavigationContainer } from "@react-navigation/native";

const BottomTab = createBottomTabNavigator();

function Todo() {
  const [todo, setTodo] = useState([]);
  const [input, setInput] = useState("");
  const [completeTodo, setCompleteTodo] = useState([]);
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
          setTodo([]);
          getDeleteAllList;
        },
        style: "destructive",
      },
    ]);
  }

  function onPressListDeleteIcon(item) {
    const filterTodo = todo.filter((each) => each !== item);
    Alert.alert("Delete", `Do you really want to delete ${`"${item}"`} ?`, [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        onPress: () => {
          setTodo(filterTodo);
        },
        style: "destructive",
      },
    ]);
  }

  function addTodoToList() {
    setTodo((prev) => [...prev, input]);
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
          setCompleteTodo((prev) => [...prev, item]);
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
      StatusBar.setBarStyle("dark-content");
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
            disabled={todo.length < 1}
            onPress={onPressAllDeleteIcon}
          >
            <Icon
              name="delete"
              size={24}
              color={todo.length < 1 ? "#8a8a8a" : "red"}
            />
          </TouchableOpacity>
        </View>
        {/* FLATLIST */}
        <FlatList
          style={styles.flatList}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
          data={todo}
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

function Completed() {
  return (
    <View style={completeTabStyle.wrapper}>
      <View style={completeTabStyle.header}>
        <Text style={completeTabStyle.headingText}>Completed</Text>
      </View>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <BottomTab.Navigator
        screenOptions={{
          tabBarLabelPosition: "beside-icon",
          tabBarLabelStyle: {
            fontWeight: "700",
            fontSize: 24,
          },
          tabBarIconStyle: { display: "none" },
          tabBarActiveTintColor: "white",
          tabBarInactiveTintColor: "black",
          tabBarActiveBackgroundColor: "#548af0",
          indicatorStyle: { backgroundColor: "blue", height: "100%" },
          pressOpacity: 1,
        }}
      >
        <BottomTab.Screen
          name="Todo"
          component={Todo}
          options={{ headerShown: false }}
        />
        <BottomTab.Screen
          name="Completed"
          component={Completed}
          options={{ headerShown: false }}
        />
      </BottomTab.Navigator>
    </NavigationContainer>
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

const completeTabStyle = StyleSheet.create({
  wrapper: {
    // backgroundColor: "red",
  },
  header: {
    display: "flex",
    marginTop: height / 16,
    padding: height / 80,
  },
  headingText: {
    display: "flex",
    alignSelf: "flex-start",
    fontSize: height / 32,
    fontWeight: "700",
  },
});
