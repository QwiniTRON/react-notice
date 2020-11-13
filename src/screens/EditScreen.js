import React, { useLayoutEffect, useState, useRef } from 'react'
import { View, StyleSheet, ScrollView, TouchableWithoutFeedback, Keyboard, Alert, Image } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { Text, Input, Button } from '@ui-kitten/components'
import { useDispatch, useSelector } from 'react-redux'

import { AppHeadericon } from '../components/AppHeaderIcon';
import { editNote } from '../store/notes/actions'
import { PhotoPicker } from '../components/PhotoPicker'

const POSTDEFAULTIMAGE = require('../../assets/Allada.jpg')

export const EditScreen = function ({ navigation, route }) {
  const noteId = route.params.noteId
  const note = useSelector(state => state.notes.notes.find(n => n.id == noteId))
  const [text, setText] = useState(note.text)
  const [title, setTitle] = useState(note.title)
  const [imgPath, setImgPath] = useState(null)
  const dispatch = useDispatch()

  const pickHandle = (uri) => {
    setImgPath(uri)
  }

  const editNoteHandle = () => {
    const noteObj = {
      img: imgPath,
      text: text.trim(),
      title: title.trim(),
      sourceNote: {...note},
      id: noteId
    }
    dispatch(editNote(noteObj))
    navigation.navigate('Main')
  }

  const saveHandler = () => {
    Alert.alert(
      "Обновить запись",
      "Точно обновить запись?",
      [{
        text: "обновить",
        onPress: () => { editNoteHandle() }
      },
      {
        text: "Отмена",
        style: "cancel"
      }],
      { cancelable: false }
    )
  }


  const imgPreviewPath = note.img ? { uri: note.img } : POSTDEFAULTIMAGE
  return (
    <ScrollView>
      <TouchableWithoutFeedback onPress={e => {
        Keyboard.dismiss()
      }}>
        <View style={styles.container}>
          <Text style={styles.title} category='h3'>Редактирование заметки</Text>
          <Text style={styles.inputTitle}>Название</Text>
          <Input
            caption="введите название вашей заметки"
            value={title}
            placeholder="Название вашей заметки"
            onChangeText={setTitle} />

          <Text style={styles.inputTitle}>Содержание</Text>
          <Input
            caption="введите вашу заметку"
            value={text}
            placeholder="введите текст заметки"
            multiline={true}
            textStyle={{ minHeight: 64 }}
            onChangeText={setText} />

          {!imgPath && <Image style={styles.previewPhoto} source={imgPreviewPath} />}
          <PhotoPicker onPick={pickHandle} />

          <View style={styles.createPost}>
            <Button disabled={text.trim().length < 6 || title.trim().length < 3} status='info' onPress={saveHandler}>
              Редактировать пост
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
  },
  previewPhoto: {
    width: '100%',
    height: 200
  }
})