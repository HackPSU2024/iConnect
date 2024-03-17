import {React, useEffect, useState, useRef } from 'react';
import { View, StyleSheet, ScrollView, Button, Text, Linking} from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Card from './compenents/Card';

import { BarCodeScanner } from "expo-barcode-scanner";


const Tab = createBottomTabNavigator();

// import env from './env';
// const test = env.REACT_APP_AUTHO_DOMAIN;

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={Home}/>
        <Tab.Screen name="Wallet" component={Wallet} />
        <Tab.Screen name="Scanner" component={Scanner} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

function Home() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>

      <Card 
        myName="King Bob"
        myTitles="Student at PSU"
        imageUrl={require("./image/fakeImage.png")}
        myDescription={"hehehe"}
      />

      <Button title="Scan QR code" onPress={() => navigation.navigate("Scanner")} />

    </View>
  );
}

function Wallet() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // TODO: get the ip
      const response = await fetch('http://104.39.240.107:5000/api/data');
      console.log(response);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          {data.map((item, index) => (
            <Card
                key={index}
                myName={item.name}
                myTitles={item.occupation}
                imageUrl={require("./image/fakeImage.png")}
                // imageUrl={item.imageUrl}
                myDescription={item.description}
            />
          ))}
        </View>
      </ScrollView>
    </>
  );
}

function Scanner() {
  const [hasPermision, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${Linking.openURL(`${data}`)} has been scanned`);
  }

  if (hasPermision === null) {
    return <Text>Requesting for Camera Permission ...</Text>
  }
  if (hasPermision === false) {
    return <Text>No Access to Camera</Text>
  }

  return (
    <View style={styles.container}>

      <Text>this is the scanner page</Text>
      <BarCodeScanner 
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style = {StyleSheet.absoluteFillObject}
      />
      {scanned && <Button title="Tap to Scan Again" onPress={() => setScanned(false)} />}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
