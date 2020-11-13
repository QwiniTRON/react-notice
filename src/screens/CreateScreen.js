import React, { useLayoutEffect, useState, useRef } from 'react'
import { View, StyleSheet, Image, ScrollView, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { Text, Input, Button } from '@ui-kitten/components'
import { useDispatch } from 'react-redux'

import { AppHeadericon } from '../components/AppHeaderIcon';
import { addNote } from '../store/notes/actions'
import { PhotoPicker } from '../components/PhotoPicker'

export const CreateScreen = function ({ navigation }) {
  const [text, setText] = useState('')
  const [title, setTitle] = useState('')
  const dispatch = useDispatch()
  const imgRef = useRef(null)

  const pickHandle = (uri) => {
    imgRef.current = uri
  }

  const createNote = (withDefaultPhoto) => {
    imgPath = withDefaultPhoto ? '' : imgRef.current

    const note = {
      img: imgPath,
      text: text.trim(),
      date: new Date().toJSON(),
      booked: false,
      title: title.trim()
    }
    dispatch(addNote(note))
    navigation.navigate('Main')
  }

  const saveHandler = () => {
    if (!imgRef.current) {
      Alert.alert(
        "Вы не выбрали фото",
        "Вбрать фото или оставить по умолчанию?",
        [{
          text: "оставить фото по умолчанию",
          onPress: () => { createNote(true) }
        },
        {
          text: "Отмена",
          style: "cancel"
        }],
        { cancelable: false }
      );
    } else {
      createNote(false)
    }
  }

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

  return (
    <ScrollView>
      <TouchableWithoutFeedback onPress={e => {
        Keyboard.dismiss()
      }}>
        <View style={styles.container}>
          <Text style={styles.title} category='h3'>Создание заметки</Text>
          <Text style={styles.inputTitle}>Название</Text>
          <Input
            caption="введите название вашей заметки"
            value={title}
            placeholder="Название заметки"
            onChangeText={setTitle} />

          <Text style={styles.inputTitle}>Содержание</Text>
          <Input
            caption="введите вашу заметку"
            value={text}
            placeholder="введите текст заметки"
            multiline={true}
            textStyle={{ minHeight: 64 }}
            onChangeText={setText} />

          <PhotoPicker onPick={pickHandle} />

          <View style={styles.createPost}>
            <Button disabled={text.trim().length < 6 || title.trim().length < 3} status='info' onPress={saveHandler}>
              Создать пост
            </Button>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 5
  },
  title: {
    textAlign: 'center',
    fontFamily: 'roboto-regular',
    margin: 5
  },
  img: {
    width: '100%',
    height: 200
  },
  createPost: {
    paddingHorizontal: 10,
    marginTop: 10
  },
  inputTitle: {
    fontSize: 14,
    fontFamily: 'roboto-regular'
  }
})