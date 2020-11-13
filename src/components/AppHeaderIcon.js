import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

export const AppHeadericon = function (props) {
  return (
    <TouchableOpacity activeOpacity={0.5} onPress={props.pressHandle}>
      <View
        style={{
          marginHorizontal: 5,
          shadowColor: '#000',
          shadowOffset: 0,
          shadowRadius: 4,
          shadowOpacity: 0.5,
          backgroundColor: '#49f',
          padding: 5,
          borderRadius: 4,
          elevation: 10
        }}
        {...props}
      >
        {props.children}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({})