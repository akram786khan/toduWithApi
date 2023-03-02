import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import UiButton from '../../components/UI/UiButton'
import FormContainer from '../../components/HOC/FormContainer'
import Input from '../../components/UI/Input'
import { validators } from '../../backend/Validation'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { isValidForm } from '../../backend/validForm'
const AddListData = ({ navigation, route }) => {

    const [name, setname] = useState('')
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('')
    const [number, setnumber] = useState('')
    const [address, setaddress] = useState('')
    const [errors, seterrors] = useState({})
    const EditData = route?.params
    console.log(" Editt dataaaa=====>", EditData)
    useEffect(() => {
        if (EditData) {
            setname(EditData?.data?.name)
            setemail(EditData?.data?.email)
            setnumber(EditData?.data?.number)
            setpassword(EditData?.data?.password)
            setaddress(EditData?.data?.address)
        }
    }, [])
    const addData = async () => {
        let obj = {
            name: name,
            email: email,
            password: password,
            number: number,
            address: address
        }
        let data = {
            name: validators.checkRequire("Name", name),
            email: validators.checkEmail("Email", email),
            password: validators.checkPassword("Password", password),
            number: validators.checkPhoneNumber("Number", number, 9, 10),
            address: validators.checkRequire("address", address)
        }
        seterrors(data);
        if (isValidForm(data)) {
            let arr = []
            let oldData = await AsyncStorage.getItem('AddListData')
            if (oldData) {
                if (EditData) {
                    let newarr = JSON.parse(oldData)
                    newarr[EditData?.index] = obj
                    arr = newarr
                } else {
                    arr = JSON.parse(oldData)
                    arr.push(obj)
                }
            }
            else {
                arr.push(obj)
            }
            await AsyncStorage.setItem('AddListData', JSON.stringify(arr))
            navigation.goBack()
        }

    }


    return (
        <FormContainer>
            <Input label='Name' value={EditData && name} placeholder="Enter the name" onChange={setname} error={errors?.name} />
            <Input label='Email' value={EditData && email} placeholder="Enter the Email" onChange={setemail} error={errors?.email} />
            <Input label='Password' value={EditData && password} placeholder="Enter the password" onChange={setpassword} error={errors?.password} />
            <Input label='Number' value={EditData && number} placeholder="Enter the number" onChange={setnumber} error={errors?.number} />
            <Input label='Address' value={EditData && address} placeholder="Enter the address" onChange={setaddress} error={errors?.address} />
            <UiButton text={EditData ? "Edit Data " : "Add Data"} textAlign={'center'} onPress={addData} />




        </FormContainer>
    )
}

export default AddListData

const styles = StyleSheet.create({})