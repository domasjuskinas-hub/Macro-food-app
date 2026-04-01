import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';

export default function FoodMacrosApp() {
  const [food, setFood] = useState('');
  const [weight, setWeight] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Food Macros</Text>
      <Text style={styles.subtitle}>Track your nutrition</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Analyze Food</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Food name (e.g., Chicken Breast)" 
          placeholderTextColor="#666"
          onChangeText={setFood}
        />
        <TextInput 
          style={styles.input} 
          placeholder="Weight in grams (e.g., 100)" 
          placeholderTextColor="#666"
          keyboardType="numeric"
          onChangeText={setWeight}
        />
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>🍎 Analyze with AI</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.summaryCard}>
        <Text style={styles.cardTitle}>Today's Summary</Text>
        <View style={styles.statsRow}>
          <StatBox label="Calories" value="0" color="#FF6B6B" />
          <StatBox label="Protein" value="0.0g" color="#4ECDC4" />
          <StatBox label="Carbs" value="0.0g" color="#FFE66D" />
          <StatBox label="Fats" value="0.0g" color="#45B7D1" />
        </View>
      </View>
    </SafeAreaView>
  );
}

const StatBox = ({ label, value, color }) => (
  <View style={[styles.statBox, { borderLeftColor: color }]}>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', padding: 20 },
  title: { color: '#fff', fontSize: 28, fontWeight: 'bold' },
  subtitle: { color: '#888', marginBottom: 20 },
  card: { backgroundColor: '#1A1A1A', padding: 20, borderRadius: 15, marginBottom: 20 },
  summaryCard: { backgroundColor: '#1A1A1A', padding: 20, borderRadius: 15 },
  cardTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginBottom: 15 },
  input: { backgroundColor: '#2A2A2A', color: '#fff', padding: 15, borderRadius: 10, marginBottom: 10 },
  button: { backgroundColor: '#4CAF50', padding: 15, borderRadius: 10, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between' },
  statBox: { borderLeftWidth: 3, paddingLeft: 8 },
  statValue: { color: '#fff', fontWeight: 'bold' },
  statLabel: { color: '#888', fontSize: 12 }
});
