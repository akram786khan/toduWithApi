import RNPickerSelect from 'react-native-picker-select';

const Dropdown = (
    { placeholder = "Please select", item = {},
        onChange = () => { },
    }
) => {
    console.log("====item===>", item);
    return (
        <RNPickerSelect
            // placeholder={placeholder}
            placeholder={{
                label: placeholder,
                value: null,
            }}
            style={{
                ...pickerStyle,

            }}
            onValueChange={(value) => onChange(value)}
            items={item}
        />
    );
};

const pickerStyle = {
    inputIOS: {
        color: 'grey',
        paddingHorizontal: 10,
        backgroundColor: 'red',
        borderRadius: 5,
    },
    placeholder: {
        color: 'grey',
    },
    inputAndroid: {
        color: 'grey',
        paddingHorizontal: 10,
        backgroundColor: 'white',
        borderRadius: 80,

    },
};

export default Dropdown;