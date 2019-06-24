import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  KeyboardAvoidingView
} from "react-native";

import API from "../api";
import { AsyncStorage, Alert } from "react-native";
import { Dimensions } from "react-native";

export default class Login extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      password: null
    };

    this.handleLogin = this.handleLogin.bind(this);
  }
  handleLogin(e) {
    e.preventDefault();
    if (!(this.state.user != null) && !(this.state.password != null)) {
      Alert.alert("Error!", "El usuario y/o la contraseña son incorrectos");
      return;
    }
    API.post("auth/login", this.state)
      .then(response => {
        if (response.data.response) {
          Alert.alert("Éxito!", "Has ingresado correctamente");
          AsyncStorage.setItem("token", response.data.data.token).then(() => {
            this.props.navigation.navigate("AuthLoading");
          });
        } else {
          Alert.alert("Error!", "El usuario y/o la contraseña son incorrectos");
        }
      })
      .catch(err => {
        console.log("ERROR!");
        console.log(err);
      });
  }
  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <View style={styles.logoContainer}>
          <Text
            style={{
              fontFamily: "sans-serif-light",
              fontSize: 42,
              color: "white",
              fontWeight: "100"
            }}
          >
            PatenteApp
          </Text>
          <Text
            style={{
              fontFamily: "sans-serif-light",
              fontSize: 18,
              color: "white",
              fontWeight: "100"
            }}
          >
            ufro
          </Text>
        </View>
        <View style={styles.formContainer}>
          <TextInput
            autoCapitalize="none"
            style={styles.textInput}
            onChangeText={user => this.setState({ user })}
            placeholder="usuario"
            placeholderTextColor="#636e72"
          />
          <TextInput
            autoCapitalize="none"
            style={styles.textInput}
            secureTextEntry={true}
            onChangeText={password => this.setState({ password })}
            placeholder="contraseña"
            placeholderTextColor="#636e72"
          />
          <TouchableOpacity style={styles.button} onPress={this.handleLogin}>
            <Text
              style={{
                color: "white",
                alignSelf: "center"
              }}
            >
              Ingresar
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.navigate("Register")}
          >
            <Text
              style={{
                color: "white",
                alignSelf: "center"
              }}
            >
              Registrarse
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
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
  textInput: {
    height: 40,
    backgroundColor: "#dfe6e9",
    borderRadius: 10,
    padding: 10,
    width: deviceWidth - 100,
    marginBottom: 20,
    color: "#2d3436"
  },
  button: {
    backgroundColor: "#e74c3c",
    textAlign: "center",
    borderRadius: 5,
    padding: 10,
    width: deviceWidth - 100,
    marginBottom: 10
  },
  logoContainer: {
    flex: 5,
    alignItems: "center",
    justifyContent: "center"
  },
  formContainer: {
    flex: 4
  },
  logo: {
    height: 230,
    width: 230
  }
});
