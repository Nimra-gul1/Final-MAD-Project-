import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { db, doc, setDoc } from '../firebaseConfig'; 

const BookCarScreen = ({ navigation }) => {
  const [carId, setCarId] = useState(''); // Field for user to enter car ID
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [description, setDescription] = useState('');

  // Function to save the car details
  const handleSaveCar = async () => {
    if (carId && model && year && description) {
      try {
        const carData = {
          model,
          year,
          description,
        };

        // Save to Firestore using the car ID provided by the user
        await setDoc(doc(db, 'cars', carId), carData);
        Alert.alert('Success', 'Car booked successfully!');

        // Navigate to ViewBookedCarScreen with the car ID
        navigation.navigate('ViewBookedCarScreen', { carId });
      } catch (error) {
        console.error('Error adding car:', error);
        Alert.alert('Error', 'Failed to book car.');
      }
    } else {
      Alert.alert('Error', 'Please fill out all fields, including Car ID');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Book Car</Text>
      <TextInput
        style={styles.input}
        placeholder="Car ID"
        value={carId}
        onChangeText={setCarId}
      />
      <TextInput
        style={styles.input}
        placeholder="Model"
        value={model}
        onChangeText={setModel}
      />
      <TextInput
        style={styles.input}
        placeholder="Year"
        value={year}
        onChangeText={setYear}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <TouchableOpacity style={styles.button} onPress={handleSaveCar}>
        <Text style={styles.buttonText}>Save Car</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    width: '80%',
    alignSelf: 'center',
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    width: '60%',
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default BookCarScreen;









