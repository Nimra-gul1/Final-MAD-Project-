import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { db, doc, getDoc, updateDoc } from '../firebaseConfig'; 

const UpdateBookedCarScreen = ({ navigation }) => {
  const [carId, setCarId] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [description, setDescription] = useState('');
  const [isCarFetched, setIsCarFetched] = useState(false);

  // Function to fetch car details based on carId
  const fetchCarDetails = async () => {
    if (!carId.trim()) {
      Alert.alert('Error', 'Please enter a valid Car ID');
      return;
    }

    try {
      const carDocRef = doc(db, 'cars', carId);
      const carSnapshot = await getDoc(carDocRef);

      if (carSnapshot.exists()) {
        const carData = carSnapshot.data();
        setModel(carData.model);
        setYear(carData.year);
        setDescription(carData.description);
        setIsCarFetched(true);
      } else {
        Alert.alert('Error', 'Car not found');
        setIsCarFetched(false); // Reset car details if car is not found
      }
    } catch (error) {
      console.error('Error fetching car details:', error);
      Alert.alert('Error', 'Failed to fetch car details');
      setIsCarFetched(false); // Reset car details on error
    }
  };

  // Function to update the car details
  const handleUpdateCar = async () => {
    if (!carId.trim()) {
      Alert.alert('Error', 'Please enter a valid Car ID');
      return;
    }

    try {
      const carDocRef = doc(db, 'cars', carId);
      await updateDoc(carDocRef, { model, year, description });
      Alert.alert('Success', 'Car details updated');
      navigation.goBack();
    } catch (error) {
      console.error('Error updating car:', error);
      Alert.alert('Error', 'Failed to update car details');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.header}>Update Car Details</Text>

        {/* Car ID input field */}
        <TextInput
          style={styles.input}
          placeholder="Enter Car ID"
          value={carId}
          onChangeText={setCarId}
        />
        <TouchableOpacity style={styles.button} onPress={fetchCarDetails}>
          <Text style={styles.buttonText}>Fetch Car Details</Text>
        </TouchableOpacity>

        {/* Show car details and update if car is fetched */}
        {isCarFetched && (
          <>
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
            <TouchableOpacity style={styles.button} onPress={handleUpdateCar}>
              <Text style={styles.buttonText}>Update</Text>
            </TouchableOpacity>
          </>
        )}

        {/* Show loading or error message if car not fetched */}
        {!isCarFetched && carId.trim() && (
          <Text style={styles.errorText}>No car found with this ID</Text>
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
    padding: 20,
    backgroundColor: '#f9f9f9', /
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333', 
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 12,
    marginBottom: 20,
    width: '100%', 
    backgroundColor: '#f9f9f9', 
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%', 
    alignSelf: 'center',
    marginVertical: 10, 
  },
  buttonText: {
    color: '#fff',
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

export default UpdateBookedCarScreen;


