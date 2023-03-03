import { StyleSheet, Text, View, Image } from 'react-native';
import React, { useState } from 'react';
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
                    <Dropdown item={[{ label: "Basic Course", value: "Basic Course", color: "black" },
                    { label: "Frountend Course", value: "Frountend Course", color: "black" },
                    { label: "Backend Course", value: "Backend Course", color: "black" }
                    ]}
                        placeholder={"Students Course..."}
                        onChange={(e) => setcourse(e)}
                    />
                </View>
                {/* <Input
          placeholder={'Students Subject...'}
          style={styles.inp}
          onChange={setsubject}
          error={error?.Subject}
        /> */}
                <View style={{ borderWidth: 1, borderColor: "black", overflow: 'hidden', borderRadius: 10, marginVertical: 20 }}>
                    <Dropdown item={[{ label: "HTML", value: "HTML", color: "black" },
                    { label: "CSS", value: "CSS", color: "black" },
                    { label: "JAVA", value: "JAVA", color: "black" }
                    ]}
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
                    <Dropdown item={[{ label: "094", value: "094", color: "black" },
                    { label: "800", value: "800", color: "black" },
                    ]}
                        placeholder={"Country"}
                        onChange={(e) => setcountry(e)}
                    />
                </View>
                <View style={{ borderWidth: 1, borderColor: "black", overflow: 'hidden', borderRadius: 10, marginVertical: 20 }}>
                    <Dropdown item={[{ label: "MDS", value: "MDS", color: "black" },
                    { label: "MKS", value: "MKS", color: "black" },
                    { label: "SNS", value: "SNS", color: "black" },
                    ]}
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