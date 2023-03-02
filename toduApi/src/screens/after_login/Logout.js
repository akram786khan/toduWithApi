import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useIsFocused } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
const Logout = ({ navigation }) => {
    useEffect(() => {
        LogoutApp();
    }, [useIsFocused()])
    const LogoutApp = async () => {
        //  alert("Logout App");
        await AsyncStorage.removeItem('Token');
        navigation.navigate('Login')
    }
    return (
        <View>
            <Text>Logout</Text>
        </View>
    )
}

export default Logout

const styles = StyleSheet.create({})