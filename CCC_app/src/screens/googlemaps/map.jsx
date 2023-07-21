import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, Circle } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { useFocusEffect } from '@react-navigation/native'; 
import GetLocation from 'react-native-get-location';

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    width: '100%',
    position: 'absolute',
    top: 0,
    zIndex: 99,
  },
  statusButton: {
    width: 75,
    height: 75,
    borderRadius: 37,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

const Map = ({ route ,  navigation  }) => {
  const { userId, dlat, dlong } = route.params;
  const GOOGLE_MAPS_API_KEY="Your_API_Key"
  
  const [origin,setOrigin] = useState({
    latitude: 37.4219983,
    longitude: -122.084,

  });
  const [destination,setDestination] = useState({
    latitude:parseFloat(dlat),
    longitude: parseFloat(dlong),
  });
  
  const _getCurrentLocation = () => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 5000,
    })
      .then(location => {
        console.log("My current location =>", location);
        setOrigin({
          ...origin,
          latitude: location.latitude,
          longitude: location.longitude,
        });
        
        if(location.latitude===dlat && location.longitude ===dlong){
          navigation.navigate('GoogleMaps', { userId: data?.id });
        }
        //_updateLocation(location.latitude, location.longitude); // Pass the updated color

      })
      .catch(error => {
        const { code, message } = error;
        console.warn(code, message);
      });
  };
  
  useFocusEffect(
    React.useCallback(() => {
      const intervalId = setInterval(() => {
        _getCurrentLocation();
      }, 2000);
      
      return () => clearInterval(intervalId); // Cleanup function to clear interval when screen loses focus
    }, [])
  );


  return (
    <View style={styles.container}>
       
        <MapView 
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={{
            latitude: origin.latitude,
            longitude:  origin.longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
        >
          {origin!==undefined ? <Marker coordinate={origin}/>:null}
          {destination!==undefined ? <Marker coordinate={destination}/>:null}
          {origin!=undefined && destination!=undefined ? (<MapViewDirections
          origin={origin}
          destination={destination}
          apikey={GOOGLE_MAPS_API_KEY}
          />):null}

          
        </MapView>
      
    </View>
  );
};

export default Map;
