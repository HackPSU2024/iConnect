// Card.js
import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

const Card = ({ myName, myTitles, imageUrl, myDescription }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.myName}>{myName}</Text>
      <Text style={styles.myTitles}>{myTitles}</Text>
      <Image source={{uri: imageUrl}} style={styles.image} />
      <Text style={styles.myDescription}>{myDescription}</Text>
    </View>
  );
};

const styles = {
  card: {
    width: "80%",
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 10,    
    marginBottom: 20,
  },
  myName: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  myTitles: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    marginBottom: 10,
  },
  myDescription: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
};

export default Card;
