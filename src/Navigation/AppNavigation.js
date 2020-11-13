import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { Platform, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createDrawerNavigator } from '@react-navigation/drawer'

import { Mainscreen } from '../screens/Mainscreen'
import { Aboutscreen } from '../screens/Aboutscreen'
import { BookmarkedScreen } from '../screens/BookmarkedScreen'
import { CreateScreen } from '../screens/CreateScreen'
import { PostScreen } from '../screens/PostScreen'
import { THEME } from '../theme'
import {EditScreen} from '../screens/EditScreen'
import { AntDesign } from '@expo/vector-icons'


const PostStack = createStackNavigator()
const BookmarkedStack = createStackNavigator()
const AboutStack = createStackNavigator()
const CreateStack = createStackNavigator()
const Tab = createBottomTabNavigator()
const MainNavigatorDrower = createDrawerNavigator()

const getTabBarIcon = (name) => (opts) => {
  let isFocused = opts.focused
  let size = isFocused ? 30 : 22
  let color = isFocused ? THEME.MAIN_COLOR : THEME.MAIN_COLOR_DISABLED

  return <AntDesign size={size} color={color} name={name} />
}
const getDrawerIcon = (size, color, name) => {
  return (info) => <AntDesign size={size} color={color} name={name} />
}

const stackMenusStyleOptions = () => ({
  headerStyle: {
    backgroundColor: Platform.select({ 'ios': '#fff', 'android': THEME.MAIN_COLOR })
  },
  headerTintColor: Platform.select({ 'ios': THEME.MAIN_COLOR, 'android': '#fff' })
})

// STACK
const PostStackMenu = (props) => {
  return (
    <PostStack.Navigator initialRouteName="Main" screenOptions={stackMenusStyleOptions()}>

      <PostStack.Screen
        options={{
          headerTitle: 'Мой блог'
        }}
        name="Main"
        component={Mainscreen}
      />

      <PostStack.Screen
        name="about"
        options={{ headerTitle: 'о приложении' }}
        component={Aboutscreen} />

      <PostStack.Screen
        name="post"
        component={PostScreen}
      />

      <PostStack.Screen
        name="edit"
        component={EditScreen}
      />

    </PostStack.Navigator>
  )
}

const BookMarkedStackMenu = (props) => {
  return (
    <BookmarkedStack.Navigator initialRouteName="bookmarked" screenOptions={stackMenusStyleOptions()}>

      <BookmarkedStack.Screen
        name="bookmarked"
        component={BookmarkedScreen}
        options={{
          title: 'Избранные'
        }}
      />

      <BookmarkedStack.Screen
        name="post"
        component={PostScreen}
      />

    </BookmarkedStack.Navigator>
  )
}

const AboutStackMenu = (props) => {
  return (
    <AboutStack.Navigator initialRouteName="about" screenOptions={stackMenusStyleOptions()}>

      <AboutStack.Screen
        name="about"
        component={Aboutscreen}
        options={{
          title: "об приложении"
        }}
      />

    </AboutStack.Navigator>
  )
}

const CreateStackMenu = (props) => {
  return (
    <CreateStack.Navigator initialRouteName="create" screenOptions={stackMenusStyleOptions()}>

      <CreateStack.Screen
        name="create"
        component={CreateScreen}
        options={{
          title: "создать пост"
        }}
      />

    </CreateStack.Navigator>
  )
}

// TAB
const TabNavigatorMenu = (props) => (
  <Tab.Navigator initialRouteName="postmenu"
    tabBarOptions={{
      activeBackgroundColor: "#aef",
      allowFontScaling: true,
      labelStyle: {
        fontSize: 14,
        fontFamily: 'roboto-bold'
      },
      tabStyle: {
        paddingTop: 9,
        borderTopWidth: 1,
        borderTopColor: 'rgba(50, 50, 50, 0.3)'
      }
    }}
  >
    <Tab.Screen
      name="postmenu"
      component={PostStackMenu}
      options={{
        tabBarIcon: getTabBarIcon('switcher'),
        title: 'все посты'
      }}
    />

    <Tab.Screen
      name="bookmarkedmenu"
      component={BookMarkedStackMenu}
      options={{
        tabBarIcon: getTabBarIcon('star'),
        title: "отмеченные"
      }}
    />
  </Tab.Navigator>
)

export function Navigation(props) {
  return (
    <NavigationContainer >
      <MainNavigatorDrower.Navigator drawerContentOptions={{
        labelStyle: {
          fontSize: 14,
          fontFamily: 'roboto-bold'
        }
      }}>

        <MainNavigatorDrower.Screen
          name="padmenu"
          options={{
            title: "блог",
            drawerIcon: getDrawerIcon(18, THEME.MAIN_COLOR, 'switcher'),
          }}
          component={TabNavigatorMenu} />

        <MainNavigatorDrower.Screen
          name="about"
          options={{
            title: "об приложении",
            drawerIcon: getDrawerIcon(18, THEME.MAIN_COLOR, 'infocirlce')
          }}
          component={AboutStackMenu} />

        <MainNavigatorDrower.Screen
          name="create"
          options={{
            title: "создать пост",
            drawerIcon: getDrawerIcon(18, THEME.MAIN_COLOR, 'plus')
          }}
          component={CreateStackMenu} />

      </MainNavigatorDrower.Navigator>
    </NavigationContainer>
  )
}