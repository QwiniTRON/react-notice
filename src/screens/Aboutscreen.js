import React, { useLayoutEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { AntDesign } from '@expo/vector-icons';

import { AppHeadericon } from '../components/AppHeaderIcon';

export const Aboutscreen = function ({ navigation }) {
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
    <View style={styles.center}>
      <Text style={styles.text}> Приложение для личных заметок.</Text>
      <Text style={styles.text}> Разработал QwiniTRON(БИН) version: 1.0.0</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 16,
    fontFamily: 'roboto-regular'
  }
})