import { StyleSheet, ActivityIndicator, View, Modal } from 'react-native';
import React, { memo } from 'react';
import colors from '../../constants/colors';

const Loader = ({ loading = false, close = () => { } }) => {
    return (
        <Modal
            transparent
            visible={loading}
            onRequestClose={close}
        >
            <View
                style={[styles.loader]}>
                {loading && <ActivityIndicator size={'large'} color={colors.white} />}
            </View>
        </Modal>
    );
};

export default memo(Loader);

const styles = StyleSheet.create({
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.black + '70',
        ...StyleSheet.absoluteFillObject,
    },
});
