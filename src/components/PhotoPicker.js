import React, { useEffect, useState } from 'react'
import * as ImagePicker from 'expo-image-picker'
import { View, StyleSheet, Image, Button, Platform, Alert} from 'react-native'

export const PhotoPicker = ({onPick}) => {
  const [image, setImage] = useState(null)

  const getPermissions = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestCameraRollPermissionsAsync();

      if (status !== 'granted') {
        Alert.alert('Простите, для использования фото требуется получить права');
        return false
      }

      return true
    }else {
      return true
    }
  }

  const takePhoto = async (e) => {
    const hasPermissions = await getPermissions()

    if(!hasPermissions) return

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
      onPick(result.uri)
    }
  }

  return (
    <View style={styles.container}>
      <Button title="выбрать фото" onPress={takePhoto} />

      {image && <Image source={{ uri: image }} style={styles.img} />}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10
  },
  img: {
    width: '100%',
    height: 200,
    marginTop: 10
  }
})