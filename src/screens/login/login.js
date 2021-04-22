import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, ActivityIndicator} from 'react-native';
import axios from 'axios';

const Login = ({
  setLoggedIn
}) => {
  const [userName, setUserName] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const login = async() => {
    try{
      setIsLoading(true)
      await axios.post("https://chitter-backend-api-v2.herokuapp.com/users", {"user": {"handle": userName, "password": userPassword}});
      const session = await axios.post("https://chitter-backend-api-v2.herokuapp.com/sessions", {"session": {"handle": userName, "password": userPassword}});
      setLoggedIn({...session.data, userName})
      setIsLoading(false)
    }catch(error) {
      console.log('error', {error})
      setIsLoading(false)
    }
  }

return <View>
<TextInput
  style={styles.textInput}
  placeholder={'Username'}
  onChangeText={(text) => setUserName(text)}
  value={userName}
/>
<TextInput
style={styles.textInput}
placeholder={'Password'}
onChangeText={(text) => setUserPassword(text)}
value={userPassword}
/>
{isLoading ? <ActivityIndicator /> : <Button title={'Log in'} onPress={!isLoading ? login : undefined}/>}
</View>
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

export {Login};








