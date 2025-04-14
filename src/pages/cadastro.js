import React, { Component } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  TextInput,
  Pressable,
  Text,
  Image,
  StyleSheet,
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

export default class CadastrarUsuario extends Component {
  state = {
    nome: "",
    telefone: "",
    cpf: "",
    email: "",
    curso: "",
    password: "",
  };

  handleCadastro = async () => {
    const { nome, telefone, cpf, email, curso, password } = this.state;
    if (!email || !password) {
      alert("Preencha todos os campos!");
      return;
    }
    const user = { nome, telefone, cpf, email, curso, password };
    await AsyncStorage.setItem("user", JSON.stringify(user));
    alert("Usuário cadastrado com sucesso!");
    this.props.navigation.navigate("Login");
  };

  render() {
    const { nome, telefone, cpf, email, curso, password } = this.state;

    return (
      <View style={styles.container}>
        <Image source={require("../../assets/logo-new.png")} style={styles.logo} />
        <Text style={styles.textHandler}>
            
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Nome"
          placeholderTextColor="#888"
          value={nome}
          onChangeText={(text) => this.setState({ nome: text })}
        />

        <TextInput
          style={styles.input}
          placeholder="Telefone"
          placeholderTextColor="#888"
          value={telefone}
          onChangeText={(text) => this.setState({ telefone: text })}
        />

        <TextInput
          style={styles.input}
          placeholder="CPF"
          placeholderTextColor="#888"
          value={cpf}
          onChangeText={(int) => this.setState({ cpf: int })}
        />

        <TextInput
          style={styles.input}
          placeholder="E-mail"
          placeholderTextColor="#888"
          value={email}
          onChangeText={(text) => this.setState({ email: text })}
        />

        <TextInput
          style={styles.input}
          placeholder="Curso"
          placeholderTextColor="#888"
          value={curso}
          onChangeText={(text) => this.setState({ curso: text })}
        />

        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor="#888"
          secureTextEntry
          value={password}
          onChangeText={(text) => this.setState({ password: text })}
        />
        <CustomButton onPress={this.handleCadastro}>Salvar</CustomButton>
        <Text style={styles.textDown}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#000000",
      paddingHorizontal: 20,
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
      width: 495,
      height: 125,
      marginBottom: 480,
      resizeMode: "contain",
    },
    textHandler: {
        color: "#fff",
        fontWeight: "700",
        marginBottom: -470
    },
    textDown: {
        marginBottom: 115
    }
  });
  
  