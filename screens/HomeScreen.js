import React, { useState, useEffect,  } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet,   } from 'react-native';
import axios from 'axios';
import { API_WEATHER_KEY, API_GOOGLEMAPS_KEY } from '../api/apiConfig';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Ionicons } from '@expo/vector-icons';

const HomeScreen = ({ navigation }) => {
  // const [city, setCity] = useState('');
  // const [weatherData, setWeatherData] = useState(null);
  // const [forecastData, setForecastData] = useState(null);

    const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);





  const searchWeather = async (lat, lng) => {
    try {
      const weatherResponse = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_WEATHER_KEY}`
      );

      setWeatherData(weatherResponse.data);

      const forecastResponse = await axios.get(
        `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&appid=${API_WEATHER_KEY}`
      );

      const next5DaysForecast = forecastResponse.data.list.filter(
        (item, index) => index % 8 === 0 && index < 40
      );

      setForecastData(next5DaysForecast);
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };
  const handleSelectPlace = async (place) => {
    try {
      const { place_id } = place;

      const placeDetailsResponse = await axios.get(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&key=${API_GOOGLEMAPS_KEY}`
      );

      const { lat, lng } = placeDetailsResponse.data.result.geometry.location;

      searchWeather(lat, lng);
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };

  
  useEffect(() => {
    const defaultLat = 46.9750; 
    const defaultLng = 32.0339; 

    searchWeather(defaultLat, defaultLng);
  }, []);

  const renderItem = ({ item }) => {
    const dateTime = new Date(item.dt * 1000);
    const dayOfWeek = getDayOfWeek(dateTime.getDay());

    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('Details', { weatherData: item })}
        style={styles.forecastItem}
      >
        <Text style={styles.dayOfWeek}>{dayOfWeek}</Text>
      <Text style={styles.weatherDescription}>{item.weather[0].description}</Text>
      <Text style={styles.temperature}>{(item.main.temp - 273.15).toFixed(2)}°C</Text>
      </TouchableOpacity>
    );
  };

  const getDayOfWeek = (dayIndex) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[dayIndex];
  };

 
  

  return (
    <View style={styles.container}>
    
      <GooglePlacesAutocomplete
  placeholder="Search for a city"
  onPress={(data, details = null) => {
    handleSelectPlace(details);
  }}
  fetchDetails={true}
  query={{
    key: API_GOOGLEMAPS_KEY,
    language: 'en',
  }}
  renderRightButton={() => (
    <Ionicons name="search" size={20} color="gray" style={{ marginRight: 10 }} />
  )}
  styles={{
    container: {
      flex: 0,
      position: 'absolute',
      width: '100%',
      zIndex: 1,

    },
    textInputContainer: {
      width: '100%',
      backgroundColor: 'rgba(255, 255, 255, 1)',
      // borderTopWidth: 0.5,
      // borderBottomWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 10,
      marginTop: 10,
      marginLeft: 15,
      flexDirection: 'row', 
      alignItems: 'center', 
      elevation: 3,
    },
    textInput: {
      flex: 1, 
      height: 40,
      marginLeft: 0,
      marginRight: 0,
      marginTop: 0,
      marginBottom: 0,
      paddingLeft: 10,
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
    },
    listView: {
      position: 'absolute',
      top: 55,
      left: 20,
      right: -10,
      backgroundColor: 'white',
      borderRadius: 5,
      flex: 0,
      elevation: 3,
      zIndex: 2,
    },
    row: {
      padding: 13,
      height: 44,
      flexDirection: 'row',
    },
    separator: {
      height: 0.5,
      backgroundColor: 'rgba(0,0,0,0.2)',
    },
    description: {
      fontWeight: 'bold',
    },
    predefinedPlacesDescription: {
      color: '#1faadb',
    },
  }}
/>
{weatherData && (
        <TouchableOpacity style={styles.currentWeather} onPress={() => navigation.navigate('Details', { weatherData })}>
            <Text style={styles.cityName}>{weatherData.name}</Text>
            <Text style={styles.weatherDescription}>{weatherData.weather[0].description}</Text>
            <Text style={styles.temperature}>{(weatherData.main.temp - 273.15).toFixed(2)}°C</Text>
        </TouchableOpacity>
      )}
      {forecastData && (
        <FlatList
          data={forecastData}
          renderItem={renderItem}
          keyExtractor={(item) => item.dt.toString()}
          style={styles.forecastList}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#6c64fb', 
  },
  currentWeather: {
    marginTop: 60,
    alignItems: 'center',
    backgroundColor: '#A2B3F6',
    borderRadius: 10,
    padding: 20,
    elevation: 3, 
  },
  cityName: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000414', 
    marginBottom: 5,
  },
  forecastList: {
    marginTop: 20,
  },
  forecastItem: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#8EA3F6', 
    marginVertical: 5,
    marginHorizontal: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2, 
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  dayOfWeek: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333', 
  },
  weatherDescription: {
    fontSize: 18,
    color: '#000414', 
  },
  temperature: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#013F7D', 
  },
});

export default HomeScreen;
