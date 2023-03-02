import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Login from '../screens/before_login/Login';
import SignUp from '../screens/before_login/SignUp';
import AddListData from '../screens/after_login/AddListData';
import ListData from '../screens/after_login/ListData';
//import Profile from '../screens/after_login/Profile';
const Tab = createBottomTabNavigator();
const TabNavigator = () => {
    return (
        <Tab.Navigator
            initialRouteName="ListData"
            screenOptions={{
                tabBarActiveTintColor: '#e91e63',
            }}
        >
            <Tab.Screen
                name="ListData"
                component={ListData}
                options={{
                    headerShown: false,
                    tabBarLabel: 'ListData',
                    //   tabBarIcon: ({ color, size }) => (
                    //     <MaterialCommunityIcons name="home" color={color} size={size} />
                    //   ),
                }}
            />
            <Tab.Screen
                name="AddListData"
                component={AddListData}
                options={{
                    headerShown: false,
                    tabBarLabel: 'AddListData',
                    //   tabBarIcon: ({ color, size }) => (
                    //     <MaterialCommunityIcons name="bell" color={color} size={size} />
                    //   ),
                    tabBarBadge: 3,
                }}
            />
            {/* <Tab.Screen
            name="Profile"
            component={Profile}
            options={{
              tabBarLabel: 'Profile',
            //   tabBarIcon: ({ color, size }) => (
            //     <MaterialCommunityIcons name="account" color={color} size={size} />
            //   ),
            }}
          /> */}
        </Tab.Navigator>
    );
}

export default TabNavigator