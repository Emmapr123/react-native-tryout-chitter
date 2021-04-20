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
  <Text> {body}</Text></View>
}

const styles = StyleSheet.create({
  tweet: {
    borderColor: 'red',
    borderWidth: 1,
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});

export {Tweet}