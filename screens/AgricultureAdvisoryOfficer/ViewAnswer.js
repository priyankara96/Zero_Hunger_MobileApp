import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import { db } from "../../firebase-config/firebase-config";
import { useNavigation } from "@react-navigation/native";
import {
  collection,
  getDocs,
  updateDoc,
  getDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

export default function UpdateAnswer({ route }) {
  const { item } = route.params;
  const id = item.id;
  const [data, setData] = useState("");
  const navigation = useNavigation();
  const initialState = {
    name: "",
    connumber: "",
    question: "",
    answer: "",
  };

  useEffect(() => {
    const updatemember = async () => {
      try {
        const docRef = await getDoc(doc(db, "Answer", id));
        // console.log("Document update data:", docRef.data());
        setData({ ...docRef.data(), id: docRef.id });
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    };

    updatemember();
  }, []);

  const handleChangeText = (answer, value) => {
    setData((prevState) => ({ ...prevState, [answer]: value }));
  };

  const UpdateAnswer = async () => {
    try {
      await updateDoc(doc(db, "Answer", id), {
        answer: data.answer,
        question: data.question,
      });
      if (updateDoc) {
        ToastAndroid.show("Updated successfully!", ToastAndroid.SHORT);
        navigation.navigate("Answer List");
      }
    } catch (e) {
      console.error("Error adding document: ", e);
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorCode, errorMessage);
    }
  };

  return (
    <View style={{ flex: 1, top: 20, backgroundColor: "#f3ebf5" }}>
      <Text
        style={{
          color: "#2f0b9c",
          fontWeight: "bold",
          fontSize: 30,
          marginTop: 30,
          textAlign: "center",
          textShadowColor: "#585858",
          textShadowOffset: { width: 5, height: 5 },
          textShadowRadius: 10,
        }}
      >
        &nbsp;&nbsp;&nbsp;View Answer
      </Text>

      <Image
        style={{
          width: "20%",
          height: "10%",
          alignItems: "center",
          marginTop: -53,
          marginLeft: 20,
          borderRadius: 10,
        }}
        source={require("../../assets/1720482.png")}
      />
      <View
        style={{
          margin: 5,
          borderBottomWidth: 1,
          borderColor: "#BDBDBD",
          padding: 10,
        }}
      >
        <Text style={styles.text}>Question : </Text>
        <Text
          style={{
            borderColor: "#f3ebf5",
            backgroundColor: "#f3ebf5",
            borderWidth: 2,
            borderRadius: 10,
            padding: 5,
            paddingLeft: 10,
          }}
        >
          {item.question}
        </Text>
        {/* //// */}
        <br />
        <Text style={styles.text}>Answer:</Text>
        <Text
          style={{
            borderColor: "#f3ebf5",
            backgroundColor: "#f3ebf5",
            borderWidth: 2,
            borderRadius: 10,
            padding: 5,
            paddingLeft: 10,
          }}
        >
          {item.answer}
        </Text>
        <br/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "#0D0140",
    marginVertical: 5,
    fontWeight: "bold",
    fontSize: 15,
  },
  button: {
    marginTop: 15,
    backgroundColor: "#f0b841",
    height: 40,
    width: 100,
    marginLeft: 120,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 7,
  },
});
