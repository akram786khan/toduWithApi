import { View, Text, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
//import Home from '../screens/after_login/Home'
import { createDrawerNavigator } from '@react-navigation/drawer';
import Login from '../screens/before_login/Login';
//import Profile from '../screens/after_login/Profile';
import TabNavigator from './TabNavigator';
import Logout from '../screens/after_login/Logout';
import SignUp from '../screens/before_login/SignUp';
import ListData from '../screens/after_login/ListData';
import AddListData from '../screens/after_login/AddListData';
import DashBord from '../screens/after_login/DashBord';
import CustomSidebarMenu from '../components/UI/CustomDrower';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import ListStudents from '../screens/after_login/students/ListStudents';
import ListEmployes from '../screens/after_login/employes/ListEmployes';
import ListProducts from '../screens/after_login/products/ListProducts';
const Drawer = createDrawerNavigator();
// const Logout = () => {
//     out();
// }
// const out = async () => {
//     Alert.alert("Logout");
//     await AsyncStorage.removeItem("Token");
//     //navigation.navigate('Login');
// }
const DrawerNavigator = () => {
    const [token, settoken] = useState('')
    useEffect(() => {
        checkLogin()
    }, [useIsFocused()])
    const checkLogin = async () => {
        let data = await AsyncStorage.getItem('Token')
        console.log("======>>====>>", data)
        settoken(data)
    }


    return (
        <Drawer.Navigator initialRouteName="Dashbord"
            drawerContent={props => <CustomSidebarMenu {...props} />}
        >


            <Drawer.Screen
                name="Dashbord"
                component={DashBord}
                options={{ drawerLabel: 'Dashbord' }}
            />
            <Drawer.Screen
                name="Students"
                component={ListStudents}
                options={{ drawerLabel: 'Students' }}
            />

            <Drawer.Screen
                name="Employes"
                component={ListEmployes}
                options={{ drawerLabel: 'Employes' }}
            />
            <Drawer.Screen
                name="Products"
                component={ListProducts}
                options={{ drawerLabel: 'Products' }}
            />
            <Drawer.Screen
                name='Logout'
                component={Logout}
                options={{ drawerLabel: 'Logout' }}
            />
            {/*
        <Drawer.Screen
          name="Profile"
          component={Profile}
          options={{ drawerLabel: 'Profile' }}
        /> */}
        </Drawer.Navigator>
    )
}

export default DrawerNavigator



