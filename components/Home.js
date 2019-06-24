import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  AsyncStorage,
  Dimensions,
  StatusBar,
  TextInput,
  Alert
} from "react-native";
import Modal from "react-native-modal";

import API from "../api";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      usuario: {
        nombre: "",
        anexo: "",
        correo: "",
        fono: ""
      },
      nUsuario: {
        nombre: "",
        anexo: "",
        correo: "",
        fono: ""
      }
    };
    AsyncStorage.getItem("user").then(user => {
      let datos = JSON.parse(user);
      this.setState({
        ...this.state,
        usuario: {
          nombre: datos.nombre,
          anexo: datos.anexo,
          correo: datos.correo,
          fono: datos.fono
        },
        nUsuario: {
          nombre: datos.nombre,
          anexo: datos.anexo,
          correo: datos.correo,
          fono: datos.fono
        }
      });
    });
    this.handleModal = this.handleModal.bind(this);
    this.editarDatos = this.editarDatos.bind(this);
  }
  handleModal() {
    console.log(this.state);
    this.setState({
      ...this.state,
      modalVisible: !this.state.modalVisible
    });
  }
  editarDatos() {
    AsyncStorage.getItem("token").then(token => {
      API.post("datosusuario", this.state.nUsuario, {
        headers: {
          Authorization: token
        }
      }).then(response => {
        console.log(response.data);
        if (response.data.response) {
          Alert.alert("Datos editados correctamente!");
          this.setState({
            ...this.state,
            usuario: {
              nombre: this.state.nUsuario.nombre,
              anexo: this.state.nUsuario.anexo,
              fono: this.state.nUsuario.fono,
              correo: this.state.nUsuario.correo
            }
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
              Datos usuario
            </Text>
            <View
              style={{
                flexDirection: "column",
                alignItems: "center"
              }}
            >
              <TextInput
                textAlign={"center"}
                style={styles.textinput}
                placeholder="nombre"
                value={this.state.nUsuario.nombre}
                onChangeText={nombre => {
                  let state = { ...this.state };
                  state.nUsuario.nombre = nombre;
                  this.setState({
                    state
                  });
                }}
              />
              <TextInput
                textAlign={"center"}
                style={styles.textinput}
                placeholder="anexo"
                value={this.state.nUsuario.anexo}
                onChangeText={anexo => {
                  let state = { ...this.state };
                  state.nUsuario.anexo = anexo;
                  this.setState({
                    state
                  });
                }}
              />
              <TextInput
                textAlign={"center"}
                style={styles.textinput}
                placeholder="fono"
                value={this.state.nUsuario.fono}
                onChangeText={fono => {
                  let state = { ...this.state };
                  state.nUsuario.fono = fono;
                  this.setState({
                    state
                  });
                }}
              />
              <TextInput
                textAlign={"center"}
                style={styles.textinput}
                placeholder="correo"
                value={this.state.nUsuario.correo}
                onChangeText={correo => {
                  let state = { ...this.state };
                  state.nUsuario.correo = correo;
                  this.setState({
                    state
                  });
                }}
              />
            </View>
            <TouchableOpacity
              style={{
                marginBottom: 15,
                backgroundColor: "#00cec9",
                padding: 8
              }}
              onPress={this.editarDatos}
            >
              <Text style={{ alignSelf: "center", color: "#fff" }}>Grabar</Text>
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
        <View style={styles.dataView}>
          <Text style={styles.dataText}>Nombre</Text>
          <Text style={styles.singledataText}>{this.state.usuario.nombre}</Text>
        </View>
        <View style={styles.dataView}>
          <Text style={styles.dataText}>Anexo</Text>
          <Text style={styles.singledataText}>{this.state.usuario.anexo}</Text>
        </View>
        <View style={styles.dataView}>
          <Text style={styles.dataText}>Número</Text>
          <Text style={styles.singledataText}>{this.state.usuario.fono}</Text>
        </View>
        <View style={styles.dataView}>
          <Text style={styles.dataText}>Correo</Text>
          <Text style={styles.singledataText}>{this.state.usuario.correo}</Text>
        </View>
        <TouchableOpacity onPress={this.handleModal} style={styles.button}>
          <Text style={{ color: "#fff", alignSelf: "center" }}>
            Editar información
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

let deviceWidth = Dimensions.get("window").width;
let deviceHeigth = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight,
    flex: 1,
    backgroundColor: "#00cec9",
    alignItems: "center",
    justifyContent: "center",
    justifyContent: "space-around"
  },
  button: {
    backgroundColor: "#d63031",
    textAlign: "center",
    borderRadius: 5,
    padding: 10,
    width: deviceWidth - 100
  },
  dataView: {
    width: deviceWidth - 35,
    backgroundColor: "#fff",
    borderRadius: 4,
    height: deviceHeigth / 8
  },
  dataText: {
    marginTop: 5,
    marginLeft: 10,
    marginBottom: 5
  },
  singledataText: {
    marginTop: 10,
    alignSelf: "center",
    fontSize: 18
  },
  textinput: {
    width: deviceWidth - 50,
    borderBottomColor: "#2d3436",
    borderBottomWidth: 2,
    alignSelf: "center",
    marginBottom: 15,
    fontSize: 20
  }
});
