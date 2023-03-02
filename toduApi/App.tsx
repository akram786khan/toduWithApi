import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import MainNavigator from './src/navigation/MainNavigator'
import Login from './src/screens/before_login/Login'
import AsyncStorage from '@react-native-async-storage/async-storage'


const App = () => {
  // const token = AsyncStorage.getItem('token')


  return (
    <MainNavigator />
  )
}

export default App

const styles = StyleSheet.create({})