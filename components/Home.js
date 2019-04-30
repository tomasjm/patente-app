import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  AsyncStorage,
  Dimensions
} from "react-native";

import API from "../api";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.button}>
          <Text
            style={{ color: "white", alignSelf: "center", fontWeight: "bold" }}
          >
            INFORMACION USUARIO
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
let deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#00cec9",
    alignItems: "center",
    justifyContent: "center"
  },
  button: {
    backgroundColor: "#00cec9",
    textAlign: "center",
    borderRadius: 5,
    padding: 10,
    width: deviceWidth - 100
  }
});
