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
    if (userToken) {
      API.get("auth/check/" + userToken).then(async res => {
        if (res.data.response) {
          console.log(res.data.user[0]);
          await AsyncStorage.setItem("user", JSON.stringify(res.data.user[0]));
          session = true;
        }
      });
    } else {
      await AsyncStorage.clear();
    }
    setTimeout(() => {
      this.props.navigation.navigate(session ? "App" : "Auth");
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
