import { StyleSheet, View } from 'react-native';
import React, { memo } from 'react';
import { PADDING, STANDARD_WIDTH } from '../../constants/layout';

const Card = ({
    children,
    style = {}
}) => {
    return <View style={[styles.card, style]}>{children}</View>;
};

export default memo(Card);

const styles = StyleSheet.create({
    card: {
        width: STANDARD_WIDTH,
        alignSelf: 'center',
        marginVertical: PADDING,
    },
});
