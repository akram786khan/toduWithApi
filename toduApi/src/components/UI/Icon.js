import { StyleSheet, Image, ActivityIndicator } from 'react-native';
import React, { memo } from 'react';
import Clickable from '../HOC/Clickable';

const Icon = ({
    size = 23,
    source = null,
    disable = false,
    onPress = () => { },
    touchable = false,
    marginRight = 0,
    loading = false,
    loaderColor = '#fff',
    tintColor = null,
    resizeMode = 'contain',
    borderRadius = 0,
    round = false,
    iconStyle,
    containerStyle
}) => {
    return (
        <Clickable
            disable={disable || !touchable}
            onPress={onPress}
            scaleSize={0.95}
            style={[
                styles.wrapper(size),
                { marginRight, borderRadius, overflow: 'hidden', }, round ? styles.round(size) : undefined, containerStyle
            ]}>
            {loading ? (
                <ActivityIndicator size={'small'} color={loaderColor} />
            ) : (
                <Image
                    style={[
                        styles.icon(size),
                        {
                            tintColor,
                            resizeMode,
                        },
                        round ? styles.round(size) : undefined,
                        iconStyle
                    ]}
                    source={source}
                />
            )}
        </Clickable>
    );
};

export default memo(Icon);

const styles = StyleSheet.create({
    icon: size => {
        return {
            height: size,
            width: size,
            resizeMode: 'contain',
        };
    },
    wrapper: size => {
        return {
            height: size,
            width: size,
            justifyContent: 'center',
            alignItems: 'center',
            // marginVertical: 5,
        };
    },
    round: size => {
        return {
            borderRadius: size / 2,
            overflow: "hidden",
        };
    },

});

