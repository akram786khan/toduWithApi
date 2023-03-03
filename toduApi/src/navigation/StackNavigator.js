import React, { useState, useEffect } from 'react'
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import colors from '../constants/colors';
import { View, StatusBar } from 'react-native';
import DrawerNavigator from './DrawerNavigator'
//import TabNavigator from './TabNavigator'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
const commonOptions = {
    headerTitle: '',
    headerStyle: {
        backgroundColor: colors.white,
    },
    headerShadowVisible: false,
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    headerShown: false
};


const StackNavigator = () => {
    const [initialname, setinitialname] = useState('')
    const { Navigator, Screen } = createStackNavigator()

    return (
        <Navigator
            screenOptions={{
                // your stack style
            }}
            initialRouteName={'DrawerNavigator'}
        >
            <Screen
                name='DrawerNavigator'
                // use getComponent instead of component for better speed 
                getComponent={() => require('./DrawerNavigator').default}
                options={{
                    ...commonOptions
                }}
            />
            <Screen
                name='Signup'
                // use getComponent instead of component for better speed 
                getComponent={() => require('../screens/before_login/SignUp').default}
                options={{
                    ...commonOptions,
                    headerShown: false
                }}
            />
            {/* <Screen
                name='Dashbord'
                // use getComponent instead of component for better speed 
                getComponent={() => require('../screens/after_login/DashBord').default}
                options={{
                    ...commonOptions,
                    headerShown: false
                }}
            /> */}
            <Screen
                name='ListData'
                // use getComponent instead of component for better speed 
                getComponent={() => require('../screens/after_login/ListData').default}
                options={{
                    ...commonOptions,
                    headerShown: false
                }}
            />
            <Screen
                name="addstudent"
                getComponent={() =>
                    require('../screens/after_login/students/AddStudents').default
                }
                options={{
                    ...commonOptions,
                }}
            />
            <Screen
                name='Login'
                // use getComponent instead of component for better speed 
                getComponent={() => require('../screens/before_login/Login').default}
                options={{
                    ...commonOptions,
                    headerShown: false
                }}
            />
            <Screen
                name='Logout'
                // use getComponent instead of component for better speed 
                getComponent={() => require('../screens/after_login/Logout').default}
                options={{
                    ...commonOptions,
                    headerShown: false
                }}
            />
            <Screen
                name='AddListData'
                // use getComponent instead of component for better speed 
                getComponent={() => require('../screens/after_login/AddListData').default}
                options={{
                    ...commonOptions,
                    headerShown: false
                }}
            />
            {/* <Screen
                name='Otp'
                // use getComponent instead of component for better speed 
                getComponent={() => require('../screens/before_login/Otp').default}
                options={{
                    ...commonOptions
                }}
            />  */}
        </Navigator>
    )
}

export default StackNavigator


export const AuthStack = () => {
    const { Navigator, Screen } = createStackNavigator()
    return (
        <View style={{ flex: 1 }}>
            {Platform.OS == 'android' ? (
                <StatusBar
                    translucent={true}
                    backgroundColor={'red'}
                    barStyle="light-content"
                />
            ) : (
                <View />
            )}
            <Navigator
                screenOptions={{
                    ...commonOptions,
                }}
                initialRouteName={"Login"}>
                <Screen
                    name="Login"
                    getComponent={() =>
                        require('../screens/before_login/Login').default
                    }
                    options={{
                        ...commonOptions,
                    }}
                />
                <Screen
                    name="SignUp"
                    getComponent={() =>
                        require('../screens/before_login/SignUp').default
                    }
                    options={{
                        ...commonOptions,
                    }}
                />
                <Screen
                    name='DrawerNavigator'
                    // use getComponent instead of component for better speed 
                    getComponent={() => require('./DrawerNavigator').default}
                    options={{
                        ...commonOptions
                    }}
                />
                <Screen
                    name="liststudent"
                    getComponent={() =>
                        require('../screens/after_login/students/ListStudents').default
                    }
                    options={{
                        ...commonOptions,
                    }}
                />
                <Screen
                    name="addstudent"
                    getComponent={() =>
                        require('../screens/after_login/students/AddStudents').default
                    }
                    options={{
                        ...commonOptions,
                    }}
                />
                <Screen
                    name="listemploye"
                    getComponent={() =>
                        require('../screens/after_login/employes/ListEmployes').default
                    }
                    options={{
                        ...commonOptions,
                    }}
                />
                <Screen
                    name="addemploye"
                    getComponent={() =>
                        require('../screens/after_login/employes/AddEmployes').default
                    }
                    options={{
                        ...commonOptions,
                    }}
                />

                <Screen
                    name="listproduct"
                    getComponent={() =>
                        require('../screens/after_login/products/ListProducts').default
                    }
                    options={{
                        ...commonOptions,
                    }}
                />
                <Screen
                    name="addproduct"
                    getComponent={() =>
                        require('../screens/after_login/products/AddProducts').default
                    }
                    options={{
                        ...commonOptions,
                    }}
                />

                {/* <Stack.Screen
            name="HomeMe"
            getComponent={() =>
              require('../Screen/Private/Home/HomeMe').default
            }
            options={{
              ...commonOptions,
            }}
          /> */}




            </Navigator>
        </View>
    );
};