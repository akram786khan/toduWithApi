import { StyleSheet, Text, View, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useIsFocused } from '@react-navigation/native'
import UiButton from '../../../components/UI/UiButton'

const ListStudents = () => {
    const [List, setList] = useState([])

    useEffect(() => {
        getStudentList()
    }, [useIsFocused()])

    const getStudentList = async () => {
        try {
            let data = await fetch('https://light-pumps-seal.cyclic.app/DreamCoder/api/student')
            let res = await data.json()
            setList(res.message)
            console.log("=======>", res)
        } catch (err) {
            console.log("err====>", err)
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
                    <UiButton text='Delete' style={{ backgroundColor: "red", width: 100 }} />
                    <UiButton text='Edit' style={{ backgroundColor: "green", width: 100 }} />
                </View>
            </View>

        )
    }
    return (
        <View>
            <FlatList
                data={List}
                renderItem={renderItem}
            />
        </View>
    )
}

export default ListStudents

const styles = StyleSheet.create({})