import React from "react";
import {
  createSwitchNavigator,
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer
} from "react-navigation";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import LoginScreen from "./components/Login";
import RegisterScreen from "./components/Register";
import HomeScreen from "./components/Home";
import ConsultaScreen from "./components/Consultor/Consulta";
import UserpatentesScreen from "./components/Userpatentes";
import LogoutScreen from "./components/Logout";
import AuthLoadingScreen from "./components/AuthLoading";

const AppStack = createBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarLabel: "Home",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="home-account" size={24} color={tintColor} />
        )
      }
    },
    Userpatentes: {
      screen: UserpatentesScreen,
      navigationOptions: {
        tabBarLabel: "Patentes",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="car" size={24} color={tintColor} />
        )
      }
    },
    Logout: {
      screen: LogoutScreen,
      navigationOptions: {
        tabBarLabel: "Logout",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="logout" size={24} color={tintColor} />
        )
      }
    }
  },
  {
    tabBarOptions: {
      activeTintColor: "#fff",
      inactiveTintColor: "#636e72",
      activeBackgroundColor: "#2d3436",
      inactiveBackgroundColor: "#2d3436",
      showIcon: true,
      showLabel: false,
      style: {
        borderTopColor: "#000"
      }
    }
  }
);

const ConsultorStack = createBottomTabNavigator(
  {
    Consulta: {
      screen: ConsultaScreen,
      navigationOptions: {
        tabBarLabel: "Consulta",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="home-account" size={24} color={tintColor} />
        )
      }
    },
    Logout: {
      screen: LogoutScreen,
      navigationOptions: {
        tabBarLabel: "Logout",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="logout" size={24} color={tintColor} />
        )
      }
    }
  },
  {
    tabBarOptions: {
      activeTintColor: "#fff",
      inactiveTintColor: "#636e72",
      activeBackgroundColor: "#2d3436",
      inactiveBackgroundColor: "#2d3436",
      showIcon: true,
      showLabel: false,
      style: {
        borderTopColor: "#000"
      }
    }
  }
);

const AuthStack = createStackNavigator({
  Login: {
    screen: LoginScreen
  },
  Register: {
    screen: RegisterScreen
  }
});

const Navigation = createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: AppStack,
      Consulta: ConsultorStack,
      Auth: AuthStack
    },
    {
      initialRouteName: "AuthLoading"
    }
  )
);

export default class App extends React.Component {
  render() {
    return <Navigation />;
  }
}
