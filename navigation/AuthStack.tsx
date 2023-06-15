import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { Main } from '../screens/Main.screen'
import { Profile } from '../screens/Profile'

export type AuthStackParams = {
    Main: undefined
    Profile: {
      _id: string
    }
  }

const Stack  = createNativeStackNavigator<AuthStackParams>();

export const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName='Main'>
        <Stack.Screen name='Main' component={Main} options={{headerShown: false}} />
        <Stack.Screen name='Profile' component={Profile} />
    </Stack.Navigator>
  )
}
