import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Dimensions, Image } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
export default function App() {
  let loc;
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }
        loc = await Location.getCurrentPositionAsync({});
        setLocation(loc);
        if (!location) {
          location.coords.latitude = 33.269982;
          location.coords.longitude = 73.3191017;
        }
      } catch (e) {
        console.log(e.message);
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      {location && (
        <MapView
          style={styles.map}
          region={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          showsUserLocation={true}
        >
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            title={'My location marker'}
            description={'This is my current Location'}
            pinColor={'green'}
          ></Marker>
        </MapView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 80,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});