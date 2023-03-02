

import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import FormContainer from '../../components/HOC/FormContainer'
import Input from '../../components/UI/Input'
import UiButton from '../../components/UI/UiButton'
import { iconPath } from '../../assets'
import { useIsFocused } from '@react-navigation/native'
import { isValidForm } from '../../backend/validForm'
import { validators } from '../../backend/Validation'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Clickable from '../../components/HOC/Clickable'
const Login = ({ navigation }) => {
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [errors, seterrors] = useState([])
    const [SignUpData, setSignUpData] = useState({})
    const [changeLockImage, setchangeLockImage] = useState(iconPath.lock)
    useEffect(() => {
        getUser();
        // checkToken();
    }, [useIsFocused()])
    const getUser = async () => {
        let SignData = await AsyncStorage.getItem('SignUpData');
        let parsee = JSON.parse(SignData)
        console.log("====parsee====", parsee);
        setSignUpData(parsee)

    }
    // const checkToken = async () => {
    //     let Token = await AsyncStorage.getItem('Token');
    //     if (Token) {
    //         navigation.navigate('DrawerNavigator')
    //     }
    // }
    const changeLock = () => {
        setchangeLockImage(changeLockImage == iconPath.unlock ? iconPath.lock : iconPath.unlock)
    }
    const LoginWith = async () => {
        console.log("===sdfs")
        let form = {
            email: validators.checkEmail("Email", email),
            password: validators.checkPassword("Password", password, 8),
        }
        seterrors(form)
        if (isValidForm(form)) {
            // let data = SignUpData.filter((item, index) => {
            //     return item.email == email
            // })
            // console.log('=====data====', data);
            // if (data[0]?.email == email && data[0]?.number == password) {
            //     console.log('=====truuuuu');
            //     navigation.navigate('ListData')
            // }
            let body = {
                "email": email,
                "password": password
            }
            let data = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)

            }
            try {
                let results = await fetch("https://light-pumps-seal.cyclic.app/DreamCoder/api/userAuth/login", data)

                let res = await results.json()
                let resdata = await res
                console.log("data=====resdata==>>", resdata)
                if (resdata.status == true) {
                    await AsyncStorage.setItem("Token", JSON.stringify(resdata.token))
                    navigation.navigate('DrawerNavigator')
                } else {
                    alert("Invaid Details")
                }
                // setloginres(resdata.token);
                // console.log("===setloginres===>", loginres)
            } catch (err) {
                alert(err)
            }



        }
    }

    return (
        <FormContainer>
            <Input placeholder={'Enter the Email and phone no'}
                label={"Email"} onChange={setemail}
                error={errors?.email}
                style={{ width: 390 }}
            />
            <View style={{ flexDirection: "row" }}>
                <Input placeholder={"Enter the Password"}
                    style={{ width: 390 }}
                    label={"Password"} onChange={setpassword}
                    error={errors?.password}
                    secureTextEntry={changeLockImage == iconPath.unlock ? false : true}
                />
                <TouchableOpacity onPress={changeLock}>
                    <Image source={changeLockImage} style={{ height: 25, width: 25, top: 45, right: 40 }} />
                </TouchableOpacity>
            </View>
            <Clickable onPress={() => navigation.navigate('Signup')}><Text style={{ fontSize: 20, color: 'blue', textAlign: "right", margin: 10 }}>SignUp</Text></Clickable>
            <UiButton text={'LogIn'}
                style={styles.loginBtn}
                textAlign={"center"}
                textColor={'blue'}
                onPress={LoginWith}
            />

        </FormContainer>
    )
}

export default Login

const styles = StyleSheet.create({})