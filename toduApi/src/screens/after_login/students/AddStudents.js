import { StyleSheet, Text, View, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import FormContainer from '../../../components/HOC/FormContainer';
import Input from '../../../components/UI/Input';
import UiButton from '../../../components/UI/UiButton';
// import { ImagePath } from '../../../Assets';
import Paragraph from '../../../components/UI/Paragraph';
import Clickable from '../../../components/HOC/Clickable';
import Colors from '../../../constants/colors';
import { validators } from '../../../backend/Validation';
import { isValidForm } from '../../../backend/validForm';
import Dropdown from '../../../components/UI/Dropdown';
import { useIsFocused } from '@react-navigation/native';

const AddStudents = ({ navigation }) => {
    const [name, setname] = useState('');
    const [email, setemail] = useState('');
    const [course, setcourse] = useState('');
    const [subject, setsubject] = useState('');
    const [number, setnumber] = useState('');
    const [gender, setgender] = useState('');
    const [country, setcountry] = useState('');
    const [scholl, setscholl] = useState('');
    const [error, seterror] = useState({});
    const [subjectData, setsubjectData] = useState([])
    const [coursedata, setcoursedata] = useState([]);
    const [countrydata, setcountrydata] = useState([]);
    const [CountrySchool, setCountrySchool] = useState([])
    useEffect(() => {
        getCourses();
        getCountry();
    }, [useIsFocused()])
    const getCourses = async () => {
        try {
            let results = await fetch(
                'https://light-pumps-seal.cyclic.app/DreamCoder/api/Course'
            );

            let res = await results.json();
            let resdata = await res;
            console.log("==course  ==== resdata==>", resdata);
            let data = resdata.message;

            let arr = []
            let abc = "hello" + "*"
            data.map((item, index) => {
                let obj = {
                    label: item.CourseName,
                    value: item.CourseName + "*" + item._id,
                    color: "black"
                }
                arr.push(obj)
            })
            setcoursedata(arr)
            console.log("==arrr===>>", arr)
        } catch (err) {
            console.log("==err==>", err);
        }
    }
    const getCountry = async () => {
        try {
            let results = await fetch(
                'https://light-pumps-seal.cyclic.app/DreamCoder/api/Country'
            );

            let res = await results.json();
            let resdata = await res;
            console.log("==course  ==== resdata==>", resdata);
            let data = resdata.message;

            let arr = []
            data.map((item, index) => {
                let obj = {
                    label: item.CountryCode + " " + item.CountryName,
                    value: item.CountryName + "*" + item._id,
                    color: "black"
                }
                arr.push(obj)
            })
            setcountrydata(arr)
            console.log("==arrr===>>", arr)
        } catch (err) {
            console.log("==err==>", err);
        }
    }
    const AddWithValidationData = async () => {
        const form = {
            Name: validators.checkRequire('Students Name', name),
            Email: validators.checkEmail('Students Email', email),
            Course: validators.checkRequire('Students Course', course),
            Subject: validators.checkRequire('Students Subject', subject),
            Number: validators.checkRequire(' Number', number),
            Gender: validators.checkRequire('Gender', gender),
            Country: validators.checkRequire('Students Country', country),
            Scholl: validators.checkRequire('Students Scholl', scholl),
        };
        seterror(form);
        if (isValidForm(form)) {
            let body = {
                name: name,
                email: email,
                coursse: course,
                subject: subject,
                number: number,
                gender: gender,
                schoolname: scholl,
                country: country,
            };

            let data = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            };
            try {
                let results = await fetch(
                    'https://light-pumps-seal.cyclic.app/DreamCoder/api/student',
                    data,
                );

                let res = await results.json();
                let resdata = await res;
                if (resdata.status == true) {
                    navigation.navigate('StudentsList');
                } else {
                    alert('User Alrdy Exist');
                }

                console.log('=======Data======', resdata);
            } catch (err) {
                alert(err);
            }
        }
    };
    const setSubjets = async (idName) => {

        let newData = idName.split("*")
        setcourse(newData[0])
        try {
            let results = await fetch(
                `https://light-pumps-seal.cyclic.app/DreamCoder/api/Course/${newData[1]}`
            );

            let res = await results.json();
            let resdata = await res;
            console.log("==subject  ==== resdata==>", resdata);
            let data = resdata.Subjects;

            let arr = []
            data.map((item, index) => {
                let obj = {
                    label: item,
                    value: item,
                    color: "black"
                }
                arr.push(obj)
            })
            setsubjectData(arr)
            console.log("==arrr===>>", arr)
        } catch (err) {
            console.log("==err=abc=>", err);
        }
        console.log("=======newData==>", newData)
    }
    const setcountryfunction = async (idName) => {

        let newData = idName.split("*")
        setcountry(newData[0])
        console.log("====newData========>>>", newData)
        try {
            let results = await fetch(
                `https://light-pumps-seal.cyclic.app/DreamCoder/api/Country/${newData[1]}`
            );

            let res = await results.json();
            let resdata = await res;
            console.log("==subject  ==== resdata==>", resdata);
            let data = resdata.SchoolNames;

            let arr = []
            data.map((item, index) => {
                let obj = {
                    label: item,
                    value: item,
                    color: "black"
                }
                arr.push(obj)
            })
            setCountrySchool(arr)
            console.log("==arrr===>>", arr)
        } catch (err) {
            console.log("==err=abc=>", err);
        }
        console.log("=======newData==>", newData)
    }
    return (
        <FormContainer style={styles.MainContainer}>
            <Clickable style={styles.Container1}>
                {/* <Image
                    source={ImagePath.Students}
                    style={styles.Img1}
                    resizeMode="contain"
                /> */}
            </Clickable>
            <Paragraph
                textAlign="center"
                size={20}
                color={Colors.purple}
                style={{ fontWeight: 'bold', marginVertical: 10, bottom: 4 }}>
                Add Students Details
            </Paragraph>
            <View>
                <Input
                    label=""
                    placeholder={'Students Name...'}
                    style={styles.inp}
                    onChange={setname}
                    error={error?.Name}
                />
                <Input
                    label=""
                    placeholder={'Students Email...'}
                    style={styles.inp}
                    onChange={setemail}
                    error={error?.Email}
                />

                <View style={{ borderWidth: 1, borderColor: "black", overflow: 'hidden', borderRadius: 10 }}>
                    <Dropdown item={coursedata}
                        placeholder={"Students Course..."}
                        onChange={(e) => setSubjets(e)}
                    />
                </View>
                {/* <Input
          placeholder={'Students Subject...'}
          style={styles.inp}
          onChange={setsubject}
          error={error?.Subject}
        /> */}
                <View style={{ borderWidth: 1, borderColor: "black", overflow: 'hidden', borderRadius: 10, marginVertical: 20 }}>
                    <Dropdown item={subjectData}
                        placeholder={"Student Subject"}
                        onChange={(e) => setsubject(e)}
                    />
                </View>

                <Input
                    label=""
                    placeholder={'Number...'}
                    style={styles.inp}
                    keyboardType="number-pad"
                    onChange={setnumber}
                    error={error?.Number}
                />

                <View style={{ borderWidth: 1, borderColor: "black", overflow: 'hidden', borderRadius: 10, marginVertical: 20 }}>
                    <Dropdown item={[{ label: "Male", value: "Male", color: "black" },
                    { label: "Female", value: "Female", color: "black" },
                    ]}
                        placeholder={"Gender"}
                        onChange={(e) => setgender(e)}
                    />
                </View>

                <View style={{ borderWidth: 1, borderColor: "black", overflow: 'hidden', borderRadius: 10, marginVertical: 20 }}>
                    <Dropdown item={countrydata}
                        placeholder={"Country"}
                        onChange={(e) => setcountryfunction(e)}
                    />
                </View>
                <View style={{ borderWidth: 1, borderColor: "black", overflow: 'hidden', borderRadius: 10, marginVertical: 20 }}>
                    <Dropdown item={CountrySchool}
                        placeholder={"Students School"}
                        onChange={(e) => setscholl(e)}
                    />
                </View>
                <UiButton
                    text="Add"
                    onPress={() => AddWithValidationData()}
                    style={styles.inp}
                />
            </View>
        </FormContainer>
    );
};

export default AddStudents;

const styles = StyleSheet.create({
    MainContainer: {
        paddingHorizontal: 10,
    },
    Container1: {
        // borderWidth: 1,
        borderColor: 'red',
        margin: 10,
        alignItems: 'center',
        height: 200,
        borderRadius: 20,
        backgroundColor: Colors.cofi,
        elevation: 10,
    },

    Img1: {
        width: '100%',
        height: '100%',
        borderRadius: 20,
    },
    inp: {
        borderWidth: 1,
        borderRadius: 10,
    },
});