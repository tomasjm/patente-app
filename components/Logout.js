import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  AsyncStorage,
  Dimensions,
  Image
} from "react-native";

export default class Logout extends React.Component {
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
        <View
          style={{
            flex: 2,
            justifyContent: "flex-end"
          }}
        >
          <Text
            style={{
              fontSize: 38,
              color: "white",
              fontFamily: "Roboto",
              fontWeight: "100"
            }}
          >
            PatenteApp
          </Text>
        </View>
        <View
          style={{
            flex: 4,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Image
            source={require("../assets/logo.png")}
            resizeMode="contain"
            style={styles.logo}
          />
        </View>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <TouchableOpacity style={styles.button} onPress={this.cerrarSesion}>
            <Text
              style={{
                color: "white",
                alignSelf: "center",
                fontWeight: "bold"
              }}
            >
              Cerrar Sesión
            </Text>
          </TouchableOpacity>
        </View>
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
    backgroundColor: "#d63031",
    textAlign: "center",
    borderRadius: 5,
    padding: 10,
    width: deviceWidth - 100
  },
  logo: {
    width: deviceWidth * 0.75
  }
});
