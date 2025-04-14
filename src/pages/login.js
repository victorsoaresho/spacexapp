import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Image,
} from "react-native";

const CustomButton = ({ onPress, children }) => (
  <Pressable
    style={({ pressed }) => [
      styles.button,
      pressed && styles.buttonPressed,
    ]}
    onPress={onPress}
  >
    {({ pressed }) => (
      <Text style={[styles.buttonText, pressed && styles.buttonTextPressed]}>
        {children}
      </Text>
    )}
  </Pressable>
);

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const handleLogin = async () => {
    const user = await AsyncStorage.getItem("user");
    if (!user) {
      alert("Nenhum usuário cadastrado!");
      return;
    }

    const userJson = JSON.parse(user);
    if (userJson.email === email && userJson.password === password) {
      navigation.navigate("Cards");
    } else {
      alert("E-mail ou senha inválidos!");
    }
  };

  const handleCadastro = () => {
    navigation.navigate("CadastrarUsuario");
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/logo-new.png")}
        style={styles.logo}
      />

      <TextInput
        style={styles.input}
        placeholder="Usuário (E-mail)"
        placeholderTextColor="#aaa"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#aaa"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />

      <CustomButton onPress={handleLogin}>Entrar</CustomButton>
      <CustomButton onPress={handleCadastro}>Cadastrar</CustomButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#000000",
    paddingTop: 120,
  },
  input: {
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    width: "80%",
    color: "#fff",
  },
  button: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 10,
    width: "80%",
    alignItems: "center",
    marginVertical: 5,
  },
  buttonPressed: {
    backgroundColor: "#1DA1F2",
  },
  buttonText: {
    color: "#000",
    fontWeight: "700",
  },
  buttonTextPressed: {
    color: "#fff",
  },
  logo: {
    width: 500,
    height: 125,
    marginBottom: 40,
    marginTop: -20,
    resizeMode: "contain",
  },
});

export default Login;
