import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, Image, SafeAreaView, TouchableWithoutFeedback, ScrollView, Button, TextInput, View, ActivityIndicator } from 'react-native';
import axios from 'axios'
import { Tweet } from './src/components/tweet';


const TweetList = (props) => {
  const {tweets = []} = props
  
  return tweets.map((tweet)=> <Tweet key={tweet.id} {...{tweet}}/>)
}


export default function App() {
  const [tweets,setTweets] = useState([])
  const [loggedIn, setLoggedIn] = useState(false)
  const [blurRadius, setBlurRadius] = useState(50)
  const [userName, setUserName] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    axios.get("https://chitter-backend-api-v2.herokuapp.com/peeps").then((res) => {
      setTweets(res.data)  
    })
  },[])

  console.log("_____TWEETS", tweets)

  const onSmudge = () => {
    setBlurRadius(previousState => {
      if (previousState>0) {
        return previousState - 10
      } else return 0
    })
  }

  const login = async() => {
    try{
      setIsLoading(true)
      await axios.post("https://chitter-backend-api-v2.herokuapp.com/users", {"user": {"handle": userName, "password": userPassword}});
      const session = await axios.post("https://chitter-backend-api-v2.herokuapp.com/sessions", {"session": {"handle": userName, "password": userPassword}});
      setLoggedIn(session.data)
      setIsLoading(false)
    }catch(error) {
      console.log('error', {error})
      setIsLoading(false)
    }
  }

  return (
    <SafeAreaView  style={styles.container}>

      {loggedIn ? (
        <ScrollView showsVerticalScrollIndicator={false}>
        <TweetList tweets={tweets}/>
  
        <Text>Acebook!</Text>
        <TouchableWithoutFeedback onPress={onSmudge}><Image 
        blurRadius={blurRadius}
        style={{
          width:200,
          height:300,
        }}
        source={{
          uri: "https://static.wikia.nocookie.net/montypython/images/6/6a/Face_the_press_4.jpg/revision/latest/top-crop/width/360/height/450?cb=20180621121504",
          }} />
          </TouchableWithoutFeedback>
        <StatusBar style="auto" />
        </ScrollView>
      ) : (
        <View>
          <Text>{userName}</Text>
          <TextInput
            placeholder={'Username'}
            onChangeText={(text) => setUserName(text)}
            value={userName}
          />
          <TextInput
          placeholder={'Password'}
          onChangeText={(text) => setUserPassword(text)}
          value={userPassword}
          />
          {isLoading ? <ActivityIndicator /> : <Button title={'Log in'} onPress={!isLoading ? login : undefined}/>}
          </View>
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
  }

});
