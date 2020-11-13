import React, { useEffect, useLayoutEffect } from 'react'
import { View, Text, StyleSheet, Image, Button, ScrollView, Alert } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { useDispatch, useSelector } from 'react-redux'
import { Text as UIText } from '@ui-kitten/components'

import { AppHeadericon } from '../components/AppHeaderIcon'
import { toogleBooked, deleteNote } from '../store/notes/actions'
import { THEME } from '../theme'

const POSTDEFAULTIMAGE = require('../../assets/Allada.jpg')

export const PostScreen = function ({ navigation, route }) {
  const postId = route.params.postId
  const dispatch = useDispatch()
  const post = useSelector(state => state.notes.notes).find(n => n.id == postId)
  const isBooked = post?.booked

  useLayoutEffect(() => {
    if (!post) return

    const iconName = isBooked ? "star" : "staro";

    navigation.setOptions({
      headerRight: () => (
        <AppHeadericon pressHandle={e => dispatch(toogleBooked(post))}>
          <AntDesign size={24} color="#fff" name={iconName} />
        </AppHeadericon>
      )
    })
  }, [isBooked])

  const removeHandler = e => {
    Alert.alert(
      'удаление поста',
      'вы уверены что хотите удалить пост?',
      [
        {
          text: 'отменить',
          style: 'cancel'
        },
        {
          text: 'удалить',
          onPress() {
            navigation.goBack()
            dispatch(deleteNote(postId, post.img))
          },
          style: 'destructive'
        }
      ],
      { cancelable: false }
    );
  }

  const editHandle = () => {
    navigation.navigate('edit', {noteId: postId})
  }

  useEffect(() => {
    if (!post) return
    navigation.setOptions({
      headerTitle: `пост от ${new Date(post.date).toLocaleDateString('ru')}`
    })
  }, [])

  if (!post) return null

  const imagePath = post.img ? { uri: post.img } : POSTDEFAULTIMAGE

  return (
    <View style={styles.container}>
      <Image style={styles.img} source={imagePath} />
      <UIText style={styles.title} category="h2">{post.title}</UIText>

      <View style={styles.content}>
        <ScrollView style={styles.postContent}>
          <Text style={styles.postText}>{post.text}</Text>
        </ScrollView>
        <View style={styles.postButtons}>
          <View style={styles.deleteButton}>
            <Button title="удалить" color={THEME.DANGER_COLOR} onPress={removeHandler} />
          </View>
          <View style={styles.deleteButton}>
            <Button title="редактировать" color={THEME.MAIN_COLOR} onPress={editHandle} />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    flexGrow: 1,
    flexBasis: 1
  },
  img: {
    width: '100%',
    height: 200
  },
  postText: {
    fontSize: 16,
    fontFamily: 'roboto-regular'
  },
  postContent: {
    padding: 5
  },
  deleteButton: {
    width: '45%',
    marginTop: 10,
    marginBottom: 10
  },
  title: {
    textAlign: 'center'
  },
  postButtons: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    justifyContent: 'space-between'
  }
})