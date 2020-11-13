import React, { useEffect, useLayoutEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { useSelector, useDispatch } from 'react-redux'

import { PostList } from '../components/PostList'
import { AppHeadericon } from '../components/AppHeaderIcon'

export const BookmarkedScreen = function ({ navigation }) {
  const bookedNotes = useSelector(state => state.notes.bookedNotes)

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <AppHeadericon pressHandle={e => {
          navigation.toggleDrawer()
        }}>
          <AntDesign size={24} color="#fff" name="menufold" />
        </AppHeadericon>
      )
    });
  }, [])

  const openPostHanlder = (post) => {
    navigation.navigate('post', {
      postId: post.id
    })
  }

  if (bookedNotes.length === 0) return <Text style={styles.nothingText}>Пока ничего нет...</Text>

  return (
    <PostList data={bookedNotes} openPostHanlder={openPostHanlder} />
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: 5
  },
  nothingText: {
    padding: 15,
    textAlign: 'center'
  }
})