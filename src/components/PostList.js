import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { FlatList } from 'react-native-gesture-handler';

import { Post } from './Post';

export const PostList = function ({data, openPostHanlder}) {
  return (
    <View style={styles.wrapper}>
      <FlatList
        data={data}
        renderItem={({ item }) => <Post post={item} onOpen={openPostHanlder} />}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: 5
  }
})