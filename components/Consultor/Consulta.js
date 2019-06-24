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

import API from "../../api";

export default class Consulta extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      patente: null,
      datos: {
        nombre: "null",
        correo: "null",
        fono: "null",
        anexo: "null"
      }
    };
    this.handleModal = this.handleModal.bind(this);
    this.consultarDatos = this.consultarDatos.bind(this);
  }
  handleModal() {
    console.log(this.state);
    this.setState({
      ...this.state,
      modalVisible: !this.state.modalVisible
    });
  }
  consultarDatos() {
    API.get("patentes/" + this.state.patente).then(response => {
      if (response.data.response) {
        if (response.data.data.length > 0) {
          let newdata = response.data.data[0];
          console.log(newdata);
          this.setState({
            ...this.state,
            modalVisible: true,
            datos: {
              nombre: newdata.nombre,
              correo: newdata.correo,
              fono: newdata.fono,
              anexo: newdata.anexo
            }
          });
        } else {
          Alert.alert(
            "Esta patente no se encuentra registrada en la base de datos"
          );
        }
      } else {
        Alert.alert("Hubo un error en el sistema");
      }
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
              padding: 15
            }}
          >
            <Text style={{ textAlign: "center", fontSize: 18 }}>
              Datos consultados
            </Text>
            <View style={styles.modalview}>
              <Text style={{ textAlign: "left" }}>Nombre</Text>
              <View style={styles.smodalview}>
                <Text style={{ padding: 5, textAlign: "center" }}>
                  {this.state.datos.nombre}
                </Text>
              </View>
            </View>
            <View style={styles.modalview}>
              <Text style={{ textAlign: "left" }}>Anexo</Text>
              <View style={styles.smodalview}>
                <Text style={{ padding: 5, textAlign: "center" }}>
                  {this.state.datos.anexo}
                </Text>
              </View>
            </View>
            <View style={styles.modalview}>
              <Text style={{ textAlign: "left" }}>Correo</Text>
              <View style={styles.smodalview}>
                <Text style={{ padding: 5, textAlign: "center" }}>
                  {this.state.datos.correo}
                </Text>
              </View>
            </View>
            <View style={styles.modalview}>
              <Text style={{ textAlign: "left" }}>Numero</Text>
              <View style={styles.smodalview}>
                <Text style={{ padding: 5, textAlign: "center" }}>
                  {this.state.datos.fono}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              style={{
                marginBottom: 15,
                backgroundColor: "#00cec9",
                padding: 8,
                marginTop: 15
              }}
              onPress={this.handleModal}
            >
              <Text style={{ alignSelf: "center", color: "#fff" }}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <View
          style={{
            alignSelf: "center",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontSize: 21,
              alignSelf: "center",
              marginBottom: 10
            }}
          >
            Consultar datos de patente
          </Text>
          <TextInput
            style={styles.textinput}
            onChangeText={patente =>
              this.setState({
                ...this.state,
                patente: patente
              })
            }
          />
          <TouchableOpacity onPress={this.consultarDatos} style={styles.button}>
            <Text style={{ color: "#fff", alignSelf: "center" }}>
              Consultar
            </Text>
          </TouchableOpacity>
        </View>
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
    width: deviceWidth - 100,
    borderColor: "#01a3a4",
    backgroundColor: "#01a3a4",
    borderWidth: 1,
    borderRadius: 3,
    padding: 10,
    alignSelf: "center",
    marginBottom: 15,
    fontSize: 20,
    color: "#fff"
  },
  modalview: {
    marginTop: 10
  },
  smodalview: {
    width: deviceWidth - 150,
    marginTop: 5,
    borderColor: "#222f3e",
    borderWidth: 1
  }
});
