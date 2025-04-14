import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

export default function Details({ route }) {
  const { mission } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={{ uri: mission.links.patch.small || 'https://via.placeholder.com/150' }}
        style={styles.image}
      />
      <Text style={styles.title}>{mission.name}</Text>
      <Text>Data: {new Date(mission.date_utc).toLocaleDateString()}</Text>
      <Text>Status: {mission.success ? 'Sucesso' : 'Falha'}</Text>
      <Text>Detalhes:</Text>
      <Text>{mission.details || 'Sem detalhes adicionais.'}</Text>
      <Text>Rocket ID: {mission.rocket}</Text>
      <Text>Launchpad ID: {mission.launchpad}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  image: { height: 150, width: 150, alignSelf: 'center', marginBottom: 20 },
  title: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
});
