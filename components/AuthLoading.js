import React from "react";
import {
  ActivityIndicator,
  AsyncStorage,
  StyleSheet,
  View,
  Text
} from "react-native";

import API from "../api";

const randomword = [
  "No hay que ir para atrás ni para darse impulso",
  "Haz el amor y no la guerra",
  "Cada día sabemos más y entendemos menos",
  "Dar el ejemplo no es la principal manera de influir sobre los demás; es la única manera",
  "La pereza viaja tan despacio que la pobreza no tarda en alcanzarla ",
  "Pienso, luego existo",
  "Lo que no te mata, te hace más fuerte"
];

let randomnumber = Math.floor(Math.random() * 7);

export default class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem("token");
    let session = false;
    let typeUser = 0;
    if (userToken) {
      API.get("auth/check/" + userToken).then(async res => {
        console.log("--------");
        if (res.data.response) {
          await AsyncStorage.setItem("user", JSON.stringify(res.data.data[0]));
          session = true;
          if (
            res.data.data[0].tipo_usuario_id == 1 ||
            res.data.data[0].tipo_usuario_id == 2
          ) {
            typeUser = 1;
          } else {
            typeUser = 2;
          }
        }
      });
    } else {
      await AsyncStorage.clear();
    }
    setTimeout(() => {
      if (session) {
        if (typeUser == 1) {
          this.props.navigation.navigate("App");
        } else {
          this.props.navigation.navigate("Consulta");
        }
      } else {
        this.props.navigation.navigate("Auth");
      }
    }, 1000);
  };

  // Render any loading content that you like here
  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#00cec9",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 16,
            fontWeight: "bold",
            marginBottom: 50,
            alignSelf: "center",
            textAlign: "center"
          }}
        >
          {randomword[randomnumber]}
        </Text>
        <ActivityIndicator size="large" color="#2d3436" />
      </View>
    );
  }
}
