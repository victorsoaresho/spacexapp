import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./pages/login";
import Details from "./pages/details";
import Cards from "./pages/cards"
import ViewMissions from "./pages/missions"
import CadastrarUsuario from "./pages/cadastro";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createStackNavigator();

export default function Routes() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Login"
                component={Login}
                options={{
                title: "",
                headerLeft: null,
                headerTitleAlign: "center",
                headerStyle: {
                    backgroundColor: "#000000",
                },
                headerTitleStyle: {
                    color: "#fff",
                    fontWeight: "bold",
                },
                }}
            />
            <Stack.Screen
                name="CadastrarUsuario"
                component={CadastrarUsuario}
                options={{
                title: "",
                headerTitleAlign: "center",
                headerStyle: {
                    backgroundColor:"#000000",
                },
                headerTitleStyle: {
                    color: "#000000",
                    fontWeight: "bold",
                },
                }}
            />
            <Stack.Screen
                name="Details"
                component={Details}
                options={{
                title: "",
                headerTitleAlign: "center",
                headerStyle: {
                    backgroundColor:"#000000",
                },
                headerTitleStyle: {
                    color: "#000000",
                    fontWeight: "bold",
                },
                }}
            />
            <Stack.Screen
                name="Cards"
                component={Cards}
                options={{
                title: "Missões",
                headerTitleAlign: "center",
                headerStyle: {
                    backgroundColor:"#000000",
                },
                headerTitleStyle: {
                    color: "#fff",
                    fontWeight: "bold",
                },
                }}
            />
            <Stack.Screen
                name="ViewMissions"
                component={ViewMissions}
                options={{
                title: "Missões adicionadas",
                headerTitleAlign: "center",
                headerStyle: {
                    backgroundColor:"#000000",
                },
                headerTitleStyle: {
                    color: "#fff",
                    fontWeight: "bold",
                },
                }}
            />
            </Stack.Navigator>
                
        
    )
}