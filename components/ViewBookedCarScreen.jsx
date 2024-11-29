import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { db, doc, getDoc } from '../firebaseConfig'; 

const ViewBookedCarScreen = () => {
  const [carId, setCarId] = useState(''); 
  const [car, setCar] = useState(null); 

  const fetchCarDetails = async () => {
    if (!carId) {
      Alert.alert('Error', 'Please enter a valid Car ID');
      return;
    }

    try {
      const carDocRef = doc(db, 'cars', carId); 
      const carSnapshot = await getDoc(carDocRef);

      if (carSnapshot.exists()) {
        setCar(carSnapshot.data()); 
      } else {
        Alert.alert('Error', 'Car not found');
        setCar(null); // Clear car details if not found
      }
    } catch (error) {
      console.error('Error fetching car details:', error);
      Alert.alert('Error', 'Failed to fetch car details');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.header}>View Booked Car</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter Car ID"
          value={carId}
          onChangeText={setCarId}
        />

        <TouchableOpacity style={styles.button} onPress={fetchCarDetails}>
          <Text style={styles.buttonText}>Fetch Car Details</Text>
        </TouchableOpacity>

        {car && (
          <View style={styles.detailsContainer}>
            <Text style={styles.detailText}>Model: {car.model}</Text>
            <Text style={styles.detailText}>Year: {car.year}</Text>
            <Text style={styles.detailText}>Description: {car.description}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f4f8',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 20,
    width: '85%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 8,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 12,
    marginBottom: 20,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  button: {
    backgroundColor: 'black',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  detailsContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
  },
  detailText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 8,
  },
});

export default ViewBookedCarScreen;





