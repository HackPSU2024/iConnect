import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Card from './compenents/Card';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Wallet" component={Wallet} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

function Home() {
  return (
    <View style={styles.container}>
      <Card 
        myName="King Bob"
        myTitles="Student at PSU"
        imageUrl={require("./image/fakeImage.png")}
        myDescription={"hehehe"}
      />
    </View>
  );
}

function Wallet() {
  return (
    <ScrollView>
      <View style={styles.container}>
        <Card 
          myName="King Bob"
          myTitles="Student at PSU"
          imageUrl={require("./image/fakeImage.png")}
          myDescription={"hehehe"}
        />
        <Card 
          myName="King Bob"
          myTitles="Student at PSU"
          imageUrl={require("./image/fakeImage.png")}
          myDescription={"hehehe"}
        />
        <Card 
          myName="King Bob"
          myTitles="Student at PSU"
          imageUrl={require("./image/fakeImage.png")}
          myDescription={"hehehe"}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
