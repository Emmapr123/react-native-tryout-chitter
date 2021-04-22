import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, Image, SafeAreaView, TouchableWithoutFeedback, ScrollView, Button, TextInput, View, ActivityIndicator } from 'react-native';
import axios from 'axios'
import { Tweet, NewTweet } from './src/components';
import { Login } from './src/screens/';



const TweetList = (props) => {
  const {tweets = []} = props
  return tweets.map((tweet)=> <Tweet key={tweet.id} {...{tweet}}/>)
}


export default function App() {
  const [tweets,setTweets] = useState([])
  const [loggedIn, setLoggedIn] = useState(false)

  const getTweets = async() => {
    await axios.get("https://chitter-backend-api-v2.herokuapp.com/peeps").then((res) => {
      setTweets(res.data)  
    })
  }

  useEffect(() => {
    getTweets()
  },[])

  return (
    <SafeAreaView  style={styles.container}>

      {loggedIn ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          <NewTweet />
        <TweetList tweets={tweets}/>
        <StatusBar style="auto" />
        </ScrollView>
      ) : (
       <Login {...{setLoggedIn}} />
      )}
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tweet: {
    borderColor: 'red',
    borderWidth: 1,
  },
  textInput: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#E1E5EA',
    borderRadius: 4,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 14,
    paddingRight: 14,
    fontSize: 16,
    color: 'black',
  }
});
