import { View } from 'react-native'
import React from 'react'
import colors from '../../constants/colors';

const ErrorCatch = (component) => {
    try {
        return component
    } catch (error) {
        console.log(error);
        return <View style={{ flex: 1, backgroundColor: colors.red }} ></View>
    }
}

export default ErrorCatch
