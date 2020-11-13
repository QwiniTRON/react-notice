import * as Font from 'expo-font'
import {DB} from './db'

export async function INITApp () {
  try{
    await Font.loadAsync({
      'roboto-regular': require('../assets/fonts/Roboto-Regular.ttf'),
      'roboto-bold': require('../assets/fonts/Roboto-Bold.ttf')
    })
    await DB.INIT()
  } catch (err) {
    console.log(err, 'Bootstrap error');
  }
}