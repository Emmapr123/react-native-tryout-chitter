import React, { useState } from 'react'; 
import { StyleSheet, View, TextInput, Button } from 'react-native'

const NewTweet = ({
  loggedIn
}) => {
  const [tweetBody, setTweetBody] = useState('')

  return <View style={styles.newTweetBox}>
      <TextInput 
        style={styles.textInput}
        onChangeText={(text) => setTweetBody(text)}
        value={tweetBody}
      />
      <Button title={'Post'}/>
    </View>
}

const styles = StyleSheet.create({
  newTweetBox: {
    height: 20, 
    backgroundColor: 'pink',
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
})

export { NewTweet }