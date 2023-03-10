import { StyleSheet, Text, View, FlatList, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useIsFocused } from '@react-navigation/native'
import UiButton from '../../../components/UI/UiButton'
import Loader from '../../../components/UI/Loader'
import SimpleToast from 'react-native-simple-toast';
const ListStudents = ({ navigation }) => {
    const [List, setList] = useState([])
    const [loding, setloding] = useState(true)

    useEffect(() => {
        getStudentList()
    }, [useIsFocused()])

    const getStudentList = async () => {
        try {
            let data = await fetch('https://light-pumps-seal.cyclic.app/DreamCoder/api/student')
            let res = await data.json()
            setList(res.message)
            if (res) {
                setloding(false)
            }
            console.log("=======>", res)
        } catch (err) {
            console.log("err====>", err)
        }

    }
    const deleteStudent = async (item) => {
        console.log("====item=====>", item)
        let data = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },

        };
        try {
            let results = await fetch(
                `https://light-pumps-seal.cyclic.app/DreamCoder/api/student/${item._id}`,
                data,
            );

            let res = await results.json();
            let resdata = await res;
            if (resdata) {
                SimpleToast.show(
                    `Delete student ${item.name} data ${item._id}`,
                    SimpleToast.SHORT,
                );
                getStudentList()
            }
            console.log("====resdata ====>", resdata);
        } catch (err) {
            console.log("===err===>", err)
        }
    }
    const renderItem = ({ item, index }) => {
        console.log("=====>", item)
        return (
            <View style={{ elevation: 20, borderRadius: 10, borderWidth: 5, borderColor: "black", backgroundColor: "grey" }}>
                <Text style={{ fontSize: 30, color: "black" }}>
                    Name :{item?.name}
                </Text>
                <Text style={{ fontSize: 30, color: "black" }}>
                    Email: {item?.email}
                </Text>
                <Text style={{ fontSize: 30, color: "black" }}>
                    Course: {item?.coursse}
                </Text>
                <Text style={{ fontSize: 30, color: "black" }}>
                    Number: {item?.number}
                </Text>
                <Text style={{ fontSize: 30, color: "black" }}>
                    Subject: {item?.subject}
                </Text>
                <Text style={{ fontSize: 30, color: "black" }}>
                    gender: {item?.gender}
                </Text>
                <Text style={{ fontSize: 30, color: "black" }}>
                    schoolname: {item?.schoolname}
                </Text>
                <Text style={{ fontSize: 30, color: "black" }}>
                    country: {item?.country}
                </Text>
                <View style={{ flexDirection: "row" }}>
                    <UiButton text='Delete' style={{ backgroundColor: "red", width: 100 }} onPress={() => deleteStudent(item)} />
                    <UiButton text='Edit' style={{ backgroundColor: "green", width: 100 }} />
                </View>
            </View>

        )
    }
    return (
        <View>
            <Loader loading={loding} />
            <UiButton onPress={() => { navigation.navigate('addstudent') }} text={"add Student"} />
            {
                List.length == 0 ?
                    <View>
                        <Image source={{ uri: "https://watermark.lovepik.com/photo/20211130/large/lovepik-primary-school-students-study-picture_501212451.jpg" }} style={{ height: 200, width: 200 }} />
                        <Text>Student List is empty</Text>
                    </View>
                    : ""
            }
            <FlatList
                data={List}
                renderItem={renderItem}
            />


        </View>
    )
}

export default ListStudents

const styles = StyleSheet.create({})