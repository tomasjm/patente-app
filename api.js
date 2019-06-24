import axios from "axios";
import { AsyncStorage } from "react-native";

let getToken = () => {
  AsyncStorage.getItem("token").then(token => {
    return token;
  });
};
export default axios.create({
  baseURL: "http://157.230.6.149:3002/",
  timeout: 5000,
  headers: {
    "X-Custom-Header": "foobar"
  }
});
