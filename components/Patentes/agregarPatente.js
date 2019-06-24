import React, { Component } from "react";

import { View, TextInput, TouchableOpacity, Text } from "react-native";

export default class AgregarPatente extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <View>
          <Text>Patente</Text>
          <TextInput />
          <Text>Descripcion</Text>
          <TextInput />
        </View>
        <View>
          <TouchableOpacity>
            <Text>Agregar patente</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
