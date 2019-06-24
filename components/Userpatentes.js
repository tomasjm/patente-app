import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  AsyncStorage,
  Dimensions,
  FlatList,
  StatusBar,
  Alert,
  Button
} from "react-native";

import Modal from "react-native-modal";

import API from "../api";
import { TextInput } from "react-native-gesture-handler";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      patentes: [],
      nPatente: {
        patente: null,
        desc: null
      }
    };
    AsyncStorage.getItem("token").then(token => {
      API.get("patentes/", {
        headers: {
          Authorization: token
        }
      }).then(response => {
        let newArray = response.data.data;
        response.data.data.forEach((el, i) => {
          newArray[i].key = i.toString();
        });
        this.setState({
          ...this.state,
          patentes: newArray
        });
      });
    });

    this.handleModal = this.handleModal.bind(this);
    this.deletePatente = this.deletePatente.bind(this);
    this.crearPatente = this.crearPatente.bind(this);
  }

  handleModal() {
    this.setState({
      ...this.state,
      modalVisible: !this.state.modalVisible
    });
  }
  crearPatente() {
    AsyncStorage.getItem("token").then(token => {
      API.post("patentes", this.state.nPatente, {
        headers: {
          Authorization: token
        }
      }).then(response => {
        if (response.data.response) {
          Alert.alert("Patente creada éxitosamente");
          API.get("patentes/", {
            headers: {
              Authorization: token
            }
          }).then(response => {
            let newArray = response.data.data;
            response.data.data.forEach((el, i) => {
              newArray[i].key = i.toString();
            });
            this.setState({
              ...this.state,
              patentes: newArray
            });
          });
        }
      });
    });
  }
  deletePatente(id) {
    AsyncStorage.getItem("token").then(token => {
      API.delete("patentes/" + id, {
        headers: {
          Authorization: token
        }
      }).then(response => {
        if (response.data.response) {
          Alert.alert("Patente eliminada correctamente");
          API.get("patentes/", {
            headers: {
              Authorization: token
            }
          }).then(response => {
            let newArray = response.data.data;
            response.data.data.forEach((el, i) => {
              newArray[i].key = i.toString();
            });
            this.setState({
              ...this.state,
              patentes: newArray
            });
          });
        }
      });
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <Modal
          animationType="slide"
          transparent={true}
          isVisible={this.state.modalVisible}
          onRequestClose={() => {
            this.setState({
              ...this.state,
              modalVisible: false
            });
          }}
        >
          <View
            style={{
              alignSelf: "center",
              backgroundColor: "#fff",
              borderRadius: 5,
              padding: 35
            }}
          >
            <Text
              style={{ fontSize: 24, alignSelf: "center", marginBottom: 15 }}
            >
              Nueva patente
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center"
              }}
            >
              <TextInput
                textAlign={"center"}
                style={styles.textinput}
                onChangeText={patente =>
                  this.setState({
                    ...this.state,
                    nPatente: { patente, desc: null }
                  })
                }
              />
            </View>
            <Text
              style={{
                alignSelf: "center",
                color: "#636e72",
                fontSize: 12,
                marginBottom: 15
              }}
            >
              Formato AAAA-BBBB
            </Text>
            <TouchableOpacity
              style={{
                marginBottom: 15,
                backgroundColor: "#00cec9",
                padding: 8
              }}
              onPress={this.crearPatente}
            >
              <Text style={{ alignSelf: "center", color: "#fff" }}>
                Crear patente
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                marginBottom: 15,
                backgroundColor: "#00cec9",
                padding: 8
              }}
              onPress={this.handleModal}
            >
              <Text style={{ alignSelf: "center", color: "#fff" }}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <View
          style={{
            marginTop: StatusBar.currentHeight,
            flex: 70
          }}
        >
          <FlatList
            data={this.state.patentes}
            renderItem={patente => {
              return (
                <TouchableOpacity
                  onPress={() => this.deletePatente(patente.item.id)}
                  style={{
                    padding: 15,
                    backgroundColor: "#00cec9",
                    width: deviceWidth,
                    borderTopColor: "#2d3436",
                    borderBottomColor: "#2d3436",
                    borderBottomWidth: 1,
                    borderTopWidth: 0
                  }}
                >
                  <Text
                    style={{
                      alignSelf: "center",
                      color: "white",
                      fontWeight: "bold"
                    }}
                  >
                    {patente.item.patente}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
        <View
          style={{ flex: 20, alignItems: "center", justifyContent: "center" }}
        >
          <TouchableOpacity onPress={this.handleModal} style={styles.button}>
            <Text
              style={{
                fontWeight: "bold",
                color: "white",
                alignSelf: "center"
              }}
            >
              Agregar patente
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
  textinput: {
    width: deviceWidth / 2 - 50,
    borderBottomColor: "#2d3436",
    borderBottomWidth: 2,
    alignSelf: "center",
    marginBottom: 15,
    fontSize: 20
  }
});
