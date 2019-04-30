import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  AsyncStorage,
  Dimensions
} from "react-native";

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.cerrarSesion = this.cerrarSesion.bind(this);
  }
  cerrarSesion() {
    AsyncStorage.clear().then(() => {
      this.props.navigation.navigate("Auth");
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={this.cerrarSesion}>
          <Text
            style={{ color: "white", alignSelf: "center", fontWeight: "bold" }}
          >
            PATENTES
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
