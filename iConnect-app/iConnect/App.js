import { BarCodeScanner } from 'expo-barcode-scanner';
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, FlatList, TextInput, Button, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Card from './compenents/Card';

const Tab = createBottomTabNavigator();

export default function App() {

   return (
      <NavigationContainer>
         <View>

         </View>
         <Tab.Navigator>
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Wallet" component={Wallet} />
            <Tab.Screen name="Input User" component={UserInfo} />
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
   const [data, setData] = useState([]);

   //   useEffect(() => {
   //     fetchData();
   //   }, []);
   
     const fetchData = async () => {
      try {
         // console.log(data);
        const response = await fetch('http://10.0.2.2:5000/api/data');
      //   console.log(response);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        setData(jsonData);
        console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

   return (
      <>
         <Button title="Fetch Data" onPress={fetchData} />

         <ScrollView>
            {data.map((item, index) => (
                item.imageUrl && (
               <Card
                  myName={item.name}
                  myTitles={item.occupation}
                  imageUrl={item.imageUrl}
                  myDescription={item.description}
               />
                )
            ))}
         </ScrollView>
      </>

   );
}

function UserInfo() {
   const [name, setName]= useState([]);
   const [occupation, setOccupation]= useState([]);
   const [description, setDescription]= useState([]);

   const sendData = async () => {
      try {
         const response = await fetch('http://10.0.2.2:5000/api/send', {
            method: "POST", 
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify({
               // _id: Math.random().toString(24),
               name:name, 
               occupation:occupation, 
               description:description, 
               imageUrl:'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data='+name
            })
         });
         if (!response.ok) {
            throw new Error('Network response was not ok');
         }
         Alert.alert("Card submitted! :)");
      } catch (error) {
         console.error('Error fetching data:', error);
      }
   };
   
   return (
      <View>
         <ScrollView>
            <TextInput 
               onChangeText={setName}
               value={name}
               placeholder="Name"
            />
            <TextInput 
               onChangeText={setOccupation}
               value={occupation}
               placeholder="Occupation"/>
            
            <TextInput placeholder="Image URL"/>
            
            <TextInput 
               onChangeText={setDescription}
               value={description}
               placeholder="description"/>
            <Button 
               title='send' 
               onPress={sendData}
            />
         </ScrollView>
      </View>
   )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
