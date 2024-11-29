
import React, { createContext, useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios'; // Import Axios

// Import Screens
import LoginScreen from './components/LoginScreen';
import SignupScreen from './components/SignupScreen';
import HomeScreen from './components/HomeScreen';
import MainMenu from './components/MainMenu';
import BookCarScreen from './components/BookCarScreen';
import ViewBookedCarScreen from './components/ViewBookedCarScreen';
import UpdateBookedCarScreen from './components/UpdateBookedCarScreen';
import DeleteBookedCarScreen from './components/DeleteBookedCarScreen';
import Notifications from './components/Notifications';
import LuxuryCarScreen from './components/LuxuryCarScreen';
import CarSaleScreen from './components/CarSaleScreen';

// Create CarContext 
const CarContext = createContext();

export const useCarContext = () => useContext(CarContext);


const axiosInstance = axios.create({
  baseURL: 'https://carsale-a13bb-default-rtdb.firebaseio.com/',  
});


const CarProvider = ({ children }) => {
  const [cars, setCars] = useState([]);

  const fetchCars = async () => {
    try {
      const response = await axiosInstance.get('/cars.json'); 
      setCars(response.data ? Object.values(response.data) : []);
    } catch (error) {
      console.error('Error fetching cars:', error);
    }
  };

  const addCar = async (car) => {
    try {
      const response = await axiosInstance.post('/cars.json', car);
      setCars((prevCars) => [...prevCars, { id: response.data.name, ...car }]);
    } catch (error) {
      console.error('Error adding car:', error);
    }
  };

  const updateCar = async (updatedCar) => {
    try {
      await axiosInstance.put(`/cars/${updatedCar.id}.json`, updatedCar);
      setCars((prevCars) =>
        prevCars.map((car) => (car.id === updatedCar.id ? updatedCar : car))
      );
    } catch (error) {
      console.error('Error updating car:', error);
    }
  };

  const deleteCar = async (carId) => {
    try {
      await axiosInstance.delete(`/cars/${carId}.json`);
      setCars((prevCars) => prevCars.filter((car) => car.id !== carId));
    } catch (error) {
      console.error('Error deleting car:', error);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  return (
    <CarContext.Provider value={{ cars, addCar, updateCar, deleteCar }}>
      {children}
    </CarContext.Provider>
  );
};

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

// Drawer Navigator 
const DrawerNavigator = () => (
  <Drawer.Navigator screenOptions={{ headerShown: false }}>
    <Drawer.Screen name="HomeDrawer" component={Tabs} />
    <Drawer.Screen name="MainMenu" component={MainMenu} />
    <Drawer.Screen name="BookCarScreen" component={BookCarScreen} />
    <Drawer.Screen name="ViewBookedCarScreen" component={ViewBookedCarScreen} />
    <Drawer.Screen name="UpdateBookedCarScreen" component={UpdateBookedCarScreen} />
    <Drawer.Screen name="DeleteBookedCarScreen" component={DeleteBookedCarScreen} />
    <Drawer.Screen name="Notifications" component={Notifications} />
  </Drawer.Navigator>
);

// Bottom Tab Navigator
const Tabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName;
        if (route.name === 'Home') iconName = 'home-outline';
        else if (route.name === 'Notifications') iconName = 'notifications-outline';
        else if (route.name === 'MainMenu') iconName = 'menu-outline';
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#000',
      tabBarInactiveTintColor: 'gray',
    })}
  >
    <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
    <Tab.Screen name="Notifications" component={Notifications} options={{ headerShown: false }} />
    <Tab.Screen name="MainMenu" component={MainMenu} options={{ headerShown: false }} />
  </Tab.Navigator>
);


const AppNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="CarSaleScreen" component={CarSaleScreen} />
    <Stack.Screen name="LuxuryCarScreen" component={LuxuryCarScreen} />
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Signup" component={SignupScreen} />
    <Stack.Screen name="Home" component={DrawerNavigator} />
  </Stack.Navigator>
);

export default function App() {
  return (
    <CarProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </CarProvider>
  );
}

