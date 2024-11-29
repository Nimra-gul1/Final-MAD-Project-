import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { db, doc, deleteDoc } from '../firebaseConfig'; 

const DeleteBookedCarScreen = ({ navigation }) => {
  const [carId, setCarId] = useState('');
  const [isCarIdValid, setIsCarIdValid] = useState(true); // Validation for Car ID

  // Function to delete car based on carId
  const handleDeleteCar = async () => {
    if (!carId.trim()) {
      setIsCarIdValid(false);
      Alert.alert('Error', 'Please enter a valid Car ID');
      return;
    }
    try {
      const carDocRef = doc(db, 'cars', carId);
      await deleteDoc(carDocRef);
      Alert.alert('Success', 'Car deleted successfully');
      setCarId(''); 
      setIsCarIdValid(true); 
      navigation.goBack();
    } catch (error) {
      console.error('Error deleting car:', error);
      Alert.alert('Error', 'Failed to delete car');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.header}>Delete Car</Text>
        <TextInput
          style={[styles.input, !isCarIdValid && styles.inputError]}
          placeholder="Enter Car ID"
          value={carId}
          onChangeText={setCarId}
        />
        <TouchableOpacity style={styles.button} onPress={handleDeleteCar}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
        {!isCarIdValid && <Text style={styles.errorText}>Please provide a valid Car ID</Text>}
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
  inputError: {
    borderColor: 'red',
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
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
});

export default DeleteBookedCarScreen;




