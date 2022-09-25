import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions,Button } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import { db } from '../../util/firebase';
import { setDoc, doc } from 'firebase/firestore';
import ImageButton from '../../components/imageButton';


export default function Main(props) {
  let loc;

  const [location, setLocation] = useState(null);

  // get current location

  const userCurrentLocation = async () => {
    try {
      loc = await Location.getCurrentPositionAsync({});
      setLocation(loc);
    } catch (e) {
      console.log(e + 'error in get loc');
      alert(e.message);
    }
  };

  // location foreground listener

  const startWatching = async () => {
    let subscriber;
    try {
      subscriber = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.BestForNavigation,
          timeInterval: 1000,
          distanceInterval: 5,
        },
        (location_update) => {
          if (!location_update) {
            location_update = location;
          }
          console.log('update location!', location_update.coords);
          setLocation(location_update);
          createLocation();
        }
      );
    } catch (err) {
      alert(err.message);
    }
    return subscriber;
  };
  //push location in db

  const createLocation = async () => {
    try {
      const docRef = await setDoc(doc(db, 'locations', Date.now() + ''), {
        id: Date.now() + '',
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        createdAt: new Date(),
      });
    } catch (e) {
      console.log(e);
      alert(e.message);
    }
  };

  useEffect(() => {
    userCurrentLocation();
    if (location) startWatching();
  }, []);

  return (
    <View style={styles.container}>
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
              title={'My location'}
              description={'This is my Location'}
              pinColor={'#fea440'}
            ></Marker>
          </MapView>
        )}
      </View>
      <View style={styles.container4}
      >
      <Button> list</Button>
      </View>
      <View style={styles.container3}>
        <ImageButton
          source={require('../../assets/listButton.png')}
          onPress={() => props.navigation.navigate('LocationList')}
          style={{ height: 70, width: 70 }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    backgroundColor: '#fff',
    alignItems: 'center',
    margin: 80,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  container3: {
    position: 'absolute',
    right: 20,
    bottom: 20,
  },
  container4:{
    flex:0.2
  }
});