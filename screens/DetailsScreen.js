import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const DetailsScreen = ({ route }) => {
  const { weatherData } = route.params;

  const weatherIconUrl = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`;

  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <Text style={styles.cityName}>{weatherData.name}</Text>
        <View style={styles.weatherIconContainer}>
          <Image source={{ uri: weatherIconUrl }} style={styles.weatherIcon} />
        </View>
        <Text style={styles.weatherDescription}>{weatherData.weather[0].description}</Text>
        <Text style={styles.temperature}>{(weatherData.main.temp - 273.15).toFixed(2)}°C</Text>
        <View style={styles.additionalInfoContainer}>
          <Text style={styles.additionalInfo}>Humidity: {weatherData.main.humidity}%</Text>
          <Text style={styles.additionalInfo}>Wind Speed: {weatherData.wind.speed} m/s</Text>
          <Text style={styles.additionalInfo}>Pressure: {weatherData.main.pressure} hPa</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#6c64fb',
        alignItems: 'center',
      },
      cardContainer: {
        width: '90%',
        backgroundColor: '#A2B3F6',
        borderRadius: 10,
        padding: 20,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        marginBottom: 20,
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center"
      },
      cityName: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#000414',
        marginBottom: 10,
      },
      weatherIconContainer: {
        backgroundColor: '#8DA399', 
        borderRadius: 50, 
        padding: 10,
        marginBottom: 10,
        elevation: 3,

      },
      weatherIcon: {
        width: 80,
        height: 80,
      },
      weatherDescription: {
        fontSize: 20,
        color: '#000414',
        marginBottom: 10,
      },
      temperature: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#013F7D',
        marginBottom: 20,
      },
      additionalInfoContainer: {
        width: '100%',
        alignItems: 'flex-start',
      },
      additionalInfo: {
        fontSize: 20,
        color: '#000414',
        marginBottom: 8,
      },
});

export default DetailsScreen;
