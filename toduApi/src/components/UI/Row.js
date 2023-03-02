import { StyleSheet, View } from 'react-native';
import React, { memo } from 'react';

const Row = ({ children, style }) => {
    return <View style={[styles.buttonRow, style]}>{children}</View>;
};

export default memo(Row);

const styles = StyleSheet.create({
    buttonRow: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'center',
        flexWrap: 'wrap',
    },
});
