import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function ViewMissions() {
  const route = useRoute();
  const navigation = useNavigation();
  const { savedMissions, removeMission } = route.params;

  const [missions, setMissions] = useState(savedMissions);

  const handleRemove = (id) => {
    removeMission(id);
    setMissions((prevMissions) => prevMissions.filter((mission) => mission.id !== id));

    Alert.alert("Missão removida", "A missão foi removida com sucesso.");
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={missions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image
              source={{ uri: item.links.patch.small || 'https://via.placeholder.com/150' }}
              style={styles.image}
            />
            <Text style={styles.title}>{item.name}</Text>

            <TouchableOpacity style={styles.button} onPress={() => handleRemove(item.id)}>
              <Text style={styles.buttonText}>REMOVER</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('Details', { mission: item })}
            >
              <Text style={styles.buttonText}>VER MAIS DETALHES</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: "#000000",
    paddingTop: 15,
  },
  card: {
    backgroundColor: '#1a1a1a',
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 8,
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
    color: '#fff',
  },
  button: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 10,
    width: "80%",
    alignItems: "center",
    marginVertical: 5,
  },
  buttonText: {
    color: "#000",
    fontWeight: "700",
  },
});
