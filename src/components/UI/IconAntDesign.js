import React from 'react'
import { AntDesign } from '@expo/vector-icons'

export const IconAntDesign = function ({ size, name }) {
  return <AntDesign size={size} name={name} />
}

export const getIconAntDesign = (size, name) => () => <IconAntDesign
  size={size} name={name}
/>
