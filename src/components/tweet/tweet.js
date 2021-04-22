import React from 'react';
import {Text, StyleSheet, View} from 'react-native'
import dayjs from 'dayjs';

const Tweet = ({
  tweet: {
  user: {
    handle
  },
  created_at,
  body
} }) => {
  const timeStamp = dayjs(created_at).format("DD/MM")

  return <View style={styles.tweet}>
    <View style={styles.row}>
    <Text>{handle}</Text><Text>
  {timeStamp}</Text>
  </View>
  <Text style={styles.tweetBody}> {body}</Text></View>
}

const styles = StyleSheet.create({
  tweet: {
    backgroundColor: 'lightblue',
    height: 80,
    borderWidth: 1,
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  tweetBody: {
    backgroundColor: 'white',
    marginTop: 20,
    marginLeft: 4,
    marginRight: 4,
  }
});

export {Tweet}