import axios from "axios";
import { AsyncStorage } from "react-native";

const getToken = async () => {
  const userToken = await AsyncStorage.getItem("token");
  return userToken;
};
export default axios.create({
  baseURL: "http://157.230.6.149:3002/",
  timeout: 5000,
  headers: { "X-Custom-Header": "foobar", Authorization: getToken() }
});
