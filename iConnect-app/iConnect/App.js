import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, FlatList, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Card from './compenents/Card';

const Tab = createBottomTabNavigator();

// function App() {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const response = await fetch('/api/data');
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
//       const jsonData = await response.json();
//       setData(jsonData);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//   return (

//   );
// }


export default function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
   console.log("fetch");
   try {
     const response = await fetch('http://10.0.2.2:5000/api/data');
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
    <NavigationContainer> 
    <View>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginVertical: 10 }}>
        Data from MongoDB
      </Text>
      <Button title="Fetch Data" onPress={fetchData} />
      {/* <FlatList
        data={data}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <Text style={{ fontSize: 18 }}>{item.name}</Text>
        )}
      /> */}
    </View>
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
