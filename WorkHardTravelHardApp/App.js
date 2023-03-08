import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import { theme } from "./colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Fontisto, Entypo } from "@expo/vector-icons";

STORAGE_KEY = "@toDos";
STORAGE_WORKING_KEY = "@working";

export default function App() {
  const [working, SetWorking] = useState(true);
  const [text, setText] = useState("");
  const [toDos, setToDos] = useState({});
  useEffect(() => {
    loadToDos();
  }, []);
  useEffect(() => {
    loadWorking();
  });
  const travel = () => {
    SetWorking(false);
    saveWorking(false);
  };
  const work = () => {
    SetWorking(true);
    saveWorking(true);
  };
  const onChangeText = (payload) => setText(payload);
  const saveWorking = async (toSaveWork) => {
    await AsyncStorage.setItem(STORAGE_WORKING_KEY, JSON.stringify(toSaveWork));
  };
  const loadWorking = async () => {
    const s = await AsyncStorage.getItem(STORAGE_WORKING_KEY);
    SetWorking(JSON.parse(s));
  };
  const saveToDos = async (toSave) => {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  };
  const loadToDos = async () => {
    const s = await AsyncStorage.getItem(STORAGE_KEY);
    setToDos(JSON.parse(s));
  };
  const addToDo = async () => {
    if (text === "") {
      return;
    }
    const newToDos = {
      ...toDos,
      [Date.now()]: { text, working, finish: false },
    };
    setToDos(newToDos);
    await saveToDos(newToDos);
    setText("");
  };
  const deleteToDo = async (key) => {
    Alert.alert("Delete To Do?", "Are you sure?", [
      {
        text: "Cancel",
      },
      {
        text: "I'm sure",
        onPress: async () => {
          const newToDos = { ...toDos };
          delete newToDos[key];
          setToDos(newToDos);
          await saveToDos(newToDos);
        },
      },
    ]);
  };
  const finishToDo = (key) => {
    console.log(toDos[key].finish);
    const newToDos = { ...toDos };
    newToDos[key].finish = !newToDos[key].finish;
    setToDos(newToDos);
    saveToDos(newToDos);
  };
  const editToDo = async (key) => {
    Alert.prompt("Edit Text", "DO you want to Edit your text?", [
      { text: "No" },
      {
        text: "Edit",
        style: "destructive",
        onPress: async (val) => {
          const newToDos = { ...toDos };
          newToDos[key].text = val;
          setToDos(newToDos);
          await saveToDos(newToDos);
        },
      },
    ]);
  };
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <TouchableOpacity onPress={work}>
          <Text
            style={{ ...styles.btnText, color: working ? "white" : theme.grey }}
          >
            Work
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={travel}>
          <Text
            style={{
              ...styles.btnText,
              color: !working ? "white" : theme.grey,
            }}
          >
            Travel
          </Text>
        </TouchableOpacity>
      </View>
      <TextInput
        returnKeyType="done"
        onSubmitEditing={addToDo}
        onChangeText={onChangeText}
        value={text}
        placeholder={working ? "Add a To Do" : "Where do you want to go?"}
        style={styles.input}
      />
      <ScrollView>
        {Object.keys(toDos).map((key) =>
          toDos[key].working === working ? (
            <View style={styles.toDo} key={key}>
              <Text style={styles.toDoText}>{toDos[key].text}</Text>
              <TouchableOpacity onPress={() => finishToDo(key)}>
                <Fontisto
                  name={
                    toDos[key].finish === true
                      ? "checkbox-active"
                      : "checkbox-passive"
                  }
                  size={24}
                  color={theme.grey}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteToDo(key)}>
                <Fontisto name="trash" size={15} color={theme.grey} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => editToDo(key)}>
                <Entypo name="pencil" size={24} color={theme.grey} />
              </TouchableOpacity>
            </View>
          ) : null
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bg,
    paddingHorizontal: 20,
  },
  header: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 100,
  },
  btnText: {
    fontSize: 38,
    fontWeight: "600",
    color: "white",
  },
  input: {
    backgroundColor: "white",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginVertical: 20,
    fontSize: 18,
  },
  toDo: {
    backgroundColor: theme.toDoBg,
    marginBottom: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  toDoText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
});
