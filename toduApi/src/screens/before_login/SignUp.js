import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import FormContainer from '../../components/HOC/FormContainer'
import Input from '../../components/UI/Input'
import UiButton from '../../components/UI/UiButton'
import { isValidForm } from '../../backend/validForm'
import { validators } from '../../backend/Validation'
import { POST } from '../../backend/Backend'
import AsyncStorage from '@react-native-async-storage/async-storage'
const SignUp = ({ navigation }) => {
    const [firstname, setfirstname] = useState('');
    const [lastname, setlastname] = useState('');
    const [email, setemail] = useState('');
    const [number, setnumber] = useState('')
    const [password, setpassword] = useState('')
    const [gender, setgender] = useState('')
    const [errors, seterrors] = useState({})
    // const Signup = async () => {
    //     //  navigation.navigate("ListData")
    //     let form = {
    //         firstname: validators.checkRequire('First Name', firstname),
    //         lastname: validators.checkRequire('Last Name', lastname),
    //         email: validators.checkEmail('Email', email),
    //         number: validators.checkPhoneNumber('Mo.Number', number, 10, 11)
    //     }
    //     let obj = {
    //         firstname: firstname,
    //         lastname: lastname,
    //         email: email,
    //         number: number,
    //         password:password,
    //         gender:gender
    //     }
    //     console.log("====form", form);
    //     seterrors(form)
    //     if (isValidForm(form)) {
    //         //navigation.navigate('Login')
    //         // let body = {
    //         //     email: email,
    //         //     first_name: firstname,
    //         //     last_name: lastname,
    //         //     mobile_number: '+91' + number,
    //         //     device_information: {
    //         //         device_id: "12345",
    //         //         os_name: "android",
    //         //         model_name: "SM-M307F",
    //         //         os_version: "10",
    //         //         app_version: "1.3.0",
    //         //         manufacturer: "samsung",
    //         //         total_memory: "5860327424",
    //         //         fcm_token: "12345"
    //         //     }
    //         // }
    //         // console.log('body---->', body);
    //         // console.log('url---->', 'http://54.144.109.80:5000/api/v1/signup');

    //         // await POST(
    //         //     'http://54.144.109.80:5000/api/v1/signup',
    //         //     body,
    //         //     { 'Authorization': 'Basic YWRtaW46YWRtaW4=' },
    //         //     res => {
    //         //         //print("======>", res);
    //         //         // if (res?.ok == true) {
    //         //         //     navigation.navigate('Otp', { mobile })
    //         //         // }
    //         //         console.log("=======>", res);
    //         //     },
    //         //     err => {
    //         //         console.log('err====>', err);
    //         //     },
    //         //     fail => {
    //         //         console.log('fail', fail);
    //         //     }
    //         // )
    //         // return true
    //         let arr = [];
    //         let oldData = await AsyncStorage.getItem('SignUpData');
    //         //let oldData = []
    //         let newParse = JSON.parse(oldData)
    //         if (!oldData) {
    //             arr.push(obj)
    //         }
    //         else {
    //             arr = [...newParse]
    //             arr.push(obj)
    //         }
    //         // arr = []
    //         console.log('dsts===arrarr', arr);
    //         await AsyncStorage.setItem('SignUpData', JSON.stringify(arr))
    //         navigation.navigate('Login')
    //     }
    // }


    const Signup = async () => {
        //  navigation.navigate("ListData")
        let form = {
            firstname: validators.checkRequire('First Name', firstname),
            lastname: validators.checkRequire('Last Name', lastname),
            email: validators.checkEmail('Email', email),
            number: validators.checkPhoneNumber('Mo.Number', number, 10, 11),
            gender: validators.checkRequire('Gender', gender),
            password: validators.checkPassword('password', password, 8)


        }

        console.log("====form", form);
        seterrors(form)
        if (isValidForm(form)) {
            let body = {
                "firstName": firstname,
                "lastName": lastname,
                "email": email,
                "number": number,
                "password": password,
                "gender": gender
            }
            console.log("====body===>>", body)
            let data = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)

            }
            try {
                let results = await fetch("https://light-pumps-seal.cyclic.app/DreamCoder/api/userAuth/signup", data)

                let res = await results.json()
                let resdata = await res
                console.log("data=====resdata==>>", resdata)

                if (resdata.status == true) {

                    navigation.navigate('Login')
                } else {
                    alert("User Alredy Exist")
                }
            } catch (err) {
                console.log("====err======>", err)
                alert(err)
            }


        }
    }
    return (
        <FormContainer>
            <Input label='First Name' placeholder={'Enter the First Name'} onChange={setfirstname} error={errors?.firstname} />
            <Input label='Last Name' placeholder={'Enter the Last Name'} onChange={setlastname} error={errors?.lastname} />
            <Input label='Email' placeholder={'Enter the Email'} onChange={setemail} error={errors?.email} />
            <Input label='Password' placeholder={'Enter the Password'} onChange={setpassword} error={errors?.password} />
            <Input label='Number' placeholder={'Enter the Number'} onChange={setnumber} error={errors?.number} />
            <Input label='Gender' placeholder={'Enter the Gender'} onChange={setgender} error={errors?.gender} />

            <UiButton text={'SignUp'} style={{ backgroundColor: "green" }} textAlign="center" onPress={Signup} />
        </FormContainer>
    )
}

export default SignUp

const styles = StyleSheet.create({})