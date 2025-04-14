import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  Alert,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

export default function Card() {
  const [missions, setMissions] = useState([]);
  const [filteredMissions, setFilteredMissions] = useState([]);
  const [savedMissions, setSavedMissions] = useState([]);
  const [searchText, setSearchText] = useState('');
  const navigation = useNavigation();

  const fetchMissions = async () => {
    try {
      const response = await axios.get('https://api.spacexdata.com/v4/launches');
      const sliced = response.data.slice(0, 20);
      setMissions(sliced);
      setFilteredMissions(sliced); 
    } catch (error) {
      console.error('Erro ao buscar missões:', error);
    }
  };

  const addMission = (mission) => {
    if (!savedMissions.some(item => item.id === mission.id)) {
      setSavedMissions([...savedMissions, mission]);
      showSuccessAlert(mission.name);
    } else {
      Alert.alert("Atenção", "Essa missão já foi adicionada.");
    }
  };

  const removeMission = (id) => {
    const updated = savedMissions.filter(mission => mission.id !== id);
    setSavedMissions(updated);
  };

  const goToDetails = (mission) => {
    navigation.navigate('Details', { mission });
  };

  const showSuccessAlert = (missionName) => {
    Alert.alert("Sucesso", `Missão "${missionName}" adicionada com sucesso.`);
  };

  const handleSearch = (text) => {
    setSearchText(text);
    const filtered = missions.filter(m =>
      m.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredMissions(filtered);
  };

  useEffect(() => {
    fetchMissions();
  }, []);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Pesquisar missões"
        placeholderTextColor="#aaa"
        value={searchText}
        onChangeText={handleSearch}
      />

      <FlatList
        data={filteredMissions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image
              source={{ uri: item.links.patch.small || 'https://via.placeholder.com/150' }}
              style={styles.image}
            />
            <Text style={styles.title}>{item.name}</Text>

            <TouchableOpacity style={styles.button} onPress={() => addMission(item)}>
              <Text style={styles.buttonText}>ADICIONAR</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Details', { mission: item })}>
              <Text style={styles.buttonText}>VER MAIS DETALHES</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <Text style={{ color: '#fff', textAlign: 'center', marginTop: 20 }}>
            Nenhuma missão carregada. Pesquise e adicione.
          </Text>
        }
      />

      <TouchableOpacity
        style={styles.mission}
        onPress={() =>
          navigation.navigate('ViewMissions', {
            savedMissions,
            removeMission,
          })
        }
      >
        <Text style={styles.buttonText}>Ver Missões Adicionadas</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    paddingTop: 10,
    justifyContent: "center"
  },
  input: {
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginVertical: 15,
    width: "80%",
    color: "#fff",
    alignSelf: "center", 
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
    color: '#fff'
  },
  mission: {
    backgroundColor: "#1DA1F2",
    height: 70,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5,
    alignSelf: "stretch", 
  }
  
});
