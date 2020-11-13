import React from 'react'
import { View, StyleSheet, ImageBackground, Text, TouchableOpacity } from 'react-native'

const POSTDEFAULTIMAGE = require('../../assets/Allada.jpg')

export const Post = ({ post, onOpen }) => {
  const imagePath = post.img ? { uri: post.img } : POSTDEFAULTIMAGE

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={e => onOpen(post)}>
      <View style={styles.post}>
        <ImageBackground style={styles.back} source={imagePath}>
          <View style={styles.textTitle}>
            <Text style={styles.title}>
              <Text style={styles.postName}>{post.title}</Text> {new Date(post.date).toLocaleDateString('ru')}
            </Text>
          </View>
        </ImageBackground>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  post: {
    marginBottom: 15,
    overflow: 'hidden'
  },
  back: {
    width: '100%',
    height: 200
  },
  textTitle: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingVertical: 5,
    alignItems: 'center',
    width: '100%'
  },
  title: {
    color: '#fff',
    fontFamily: 'roboto-regular'
  },
  postName: {
    fontSize: 20,
    marginRight: 5,
    fontFamily: 'roboto-regular'
  }
})
