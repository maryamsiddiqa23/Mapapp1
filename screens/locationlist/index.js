import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Image, Text } from 'react-native';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { db } from '../../util/firebase';

const LocationList = () => {
  const [LocData, setData] = useState(null);

  useEffect(() => {
    const q = query(collection(db, 'locations'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const locations = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      console.log(locations);
      setData(locations);
    });
    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={LocData}
        style={{ margin: 5, width: '100%' }}
        renderItem={({ item }) => {
          return (
            <View
              style={{
                flex: 1,
                width: '96%',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                margin: 5,
                backgroundColor: '#fea440',
                padding: 10,
                marginVertical: 5,
                marginHorizontal: 5,
                borderWidth: 1,
                borderColor: '#252d4a',
                borderRadius: 10,
              }}
            >
              <Image
                style={{ height: 70, width: 70 }}
                source={require('../../../assets/marker_black.png')}
              />
              <Text style={styles.text}>{`Latitude: ${item.latitude}`}</Text>
              <Text style={styles.text}>{`Longitude: ${item.longitude}`}</Text>
            </View>
          );
        }}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    color: '#fff',
  },
  list: {
    color: '#fff',
  },
  text: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 14,
    padding: 10,
  },
});
export default LocationList;