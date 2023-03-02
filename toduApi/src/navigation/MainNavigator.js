import React, { useState, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './StackNavigator';
import { AuthStack } from './StackNavigator';
import { useIsFocused } from '@react-navigation/native';
import DrawerNavigator from './DrawerNavigator'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View } from 'react-native';
/*

 Always use stack navigation at the root of your project

*/

const MainNavigator = () => {
    const [isAuth, setisAuth] = useState(false)
    useEffect(() => {
        checkToken();
    }, [])
    const checkToken = async () => {
        let token = await AsyncStorage.getItem('Token')
        console.log("stakee=====>", token)
        if (!token) {
            console.log("=====>akram")
            setisAuth(false)
            //return <AuthStack />
            //setinitialname('Login')

        } else {
            setisAuth(true)
            //return <StackNavigator />
            //setinitialname("DrawerNavigator")
        }
        console.log("====initialname====>>", isAuth)

    }
    const abc = () => {

        setTimeout(() => {
            console.log("====abc call")
            return <AuthStack />
        }, 500)
    }
    return (
        <NavigationContainer>
            {/* <StackNavigator /> */}
            {/* <DrawerNavigator /> */}
            {isAuth ? <StackNavigator /> : <AuthStack />}


        </NavigationContainer>
    )
}

export default MainNavigator