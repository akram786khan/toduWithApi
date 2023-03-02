import React, { memo } from 'react';
import {
    Platform,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    View,
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';

const FocusAwareStatusBar = ({ backgroundColor, barStyle = 'light-content', ...props }) => {
    const isFocused = useIsFocused();
    return (
        Platform.OS === 'ios' ? isFocused && <View style={[styles.statusBar, { backgroundColor }]}>
            <SafeAreaView>
                <StatusBar animated={true} barStyle={barStyle} backgroundColor={backgroundColor} {...props} />
            </SafeAreaView>
        </View>
            : isFocused ? <StatusBar barStyle={barStyle} backgroundColor={backgroundColor} {...props} /> : null
    );
}

export default memo(FocusAwareStatusBar)
const STATUSBAR_HEIGHT = StatusBar.currentHeight;

const styles = StyleSheet.create({
    statusBar: {
        height: STATUSBAR_HEIGHT,
    },
});