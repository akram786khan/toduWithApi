import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { memo } from 'react'
import Paragraph from './Paragraph'
import colors from '../../constants/colors'

const Input = ({
  label = 'Input',
  placeholder,
  style,
  onChange = () => { },
  value,
  error,
  secureTextEntry = false

}) => {
  return (
    <View style={{ marginTop: 5 }}>
      <Text
        style={{ fontSize: 16, color: '#000' }}
      >{label}</Text>
      <TextInput
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        value={value}
        cursorColor={'red'}
        style={{
          padding: 0,
          borderWidth: 1,
          borderRadius: 8,
          paddingHorizontal: 10,
          height: 50,
          marginTop: 7,
          ...style,

        }}
        onChangeText={(text) => onChange(text)}
      />
      <Paragraph size={15} color={colors.red}>{error}</Paragraph>
    </View>
  )
}

export default memo(Input)

const styles = StyleSheet.create({})