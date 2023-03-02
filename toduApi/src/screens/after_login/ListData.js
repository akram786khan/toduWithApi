import { StyleSheet, Text, View, FlatList, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useIsFocused } from '@react-navigation/native'
import UiButton from '../../components/UI/UiButton'
import { imagePath } from '../../assets'
import AsyncStorage from '@react-native-async-storage/async-storage'
const ListData = ({ navigation }) => {
    const [data, setdata] = useState([])

    useEffect(() => {
        getdata()
    }, [useIsFocused()])
    const getdata = async () => {
        let AsyncStorageData = await AsyncStorage.getItem("AddListData")
        console.log("  ===AsyncStorageData==", AsyncStorageData);
        let newdata = await JSON.parse(AsyncStorageData)
        console.log("  newdata ===  ", newdata);
        setdata(newdata)
    }
    const deletee = async (i) => {
        // let arr2 = [];
        // arr2.push(data[i])
        // await AsyncStorage.setItem('deletedData', JSON.stringify(arr2))
        console.log("=====>>>>index ", i);
        let arr = data.filter((item, index) => {
            return index != i;
        })

        setdata(arr)
        await AsyncStorage.setItem('AddListData', JSON.stringify(arr))
        // let dataa = await AsyncStorage.getItem('deletedData')
        // console.log('deleted   daa =====>>>', dataa)


    }
    const edit = (i) => {
        let objData = data[i];
        navigation.navigate('AddListData', { data: objData, index: i })
    }
    const renderItem = ({ item, index }) => {
        return (
            <View style={{ elevation: 20, borderRadius: 10, borderWidth: 5, borderColor: "black", backgroundColor: "grey" }}>
                <Text style={{ fontSize: 30, color: "black" }}>
                    Name :{item?.name}
                </Text>
                <Text style={{ fontSize: 30, color: "black" }}>
                    Email: {item?.email}
                </Text>
                <Text style={{ fontSize: 30, color: "black" }}>
                    Password: {item?.password}
                </Text>
                <Text style={{ fontSize: 30, color: "black" }}>
                    Number: {item?.number}
                </Text>
                <Text style={{ fontSize: 30, color: "black" }}>
                    Address: {item?.address}
                </Text>
                <View style={{ flexDirection: "row" }}>
                    <UiButton text='Delete' style={{ backgroundColor: "red", width: 100 }} onPress={() => deletee(index)} />
                    <UiButton text='Edit' style={{ backgroundColor: "green", width: 100 }} onPress={() => edit(index)} />
                </View>
            </View>

        )
    }

    return (
        <View>
            <View>
                <UiButton text="+" style={{ width: 40, padding: 10, flexDirection: "row", justifyContent: "center" }} txtSize={30} onPress={() => navigation.navigate('AddListData')} />
                {
                    data?.length == 0 ?
                        <View>
                            <Image source={imagePath.boximage} style={{ width: 200, height: 200, alignSelf: "center" }} />
                            <Text style={{ color: "black", textAlign: "center", marginVertical: 20, fontSize: 20 }}>List Is Empty</Text>
                        </View>
                        : ""
                }

                <FlatList
                    data={data}
                    renderItem={renderItem}
                />

            </View>
        </View>
    )
}

export default ListData

const styles = StyleSheet.create({})