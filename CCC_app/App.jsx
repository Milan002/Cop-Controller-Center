import React from "react";
import { Text } from "react-native";
//SCREEENS
import GoogleMapsScreen from "./src/screens/googlemaps/index";
import LoginScreen from "./src/screens/googlemaps/login";
import RegisterScreen from "./src/screens/googlemaps/Register";
import Map from "./src/screens/googlemaps/map"
//NAVIGATION
import {NavigationContainer} from "@react-navigation/native"
import {createNativeStackNavigator} from "@react-navigation/native-stack"

const Stack = createNativeStackNavigator(); // Corrected variable name

const App = ()=>{
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Register" component={RegisterScreen} />
                <Stack.Screen name="GoogleMaps" component={GoogleMapsScreen} />
                <Stack.Screen name="Map" component={Map} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default App;
