import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';

const CarSaleScreen = ({ navigation }) => {
  useEffect(() => {
    // Setting a timer for 4 seconds
    const timer = setTimeout(() => {
      navigation.replace('LuxuryCarScreen'); 
    }, 4000); // 4000 ms = 4 seconds

    
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
       <Image source={require('../assets/logocar.jpeg')} 
       
        style={styles.image}
        resizeMode="contain" 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',  
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 400,  
    height: 400, 
  },
});

export default CarSaleScreen;