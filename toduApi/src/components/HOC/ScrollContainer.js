import { StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import ViewContainer from './ViewContainer';
import colors from '../../constants/colors';

const ScrollContainer = ({
    children,
    backgroundColor = colors.white,
    style = {},
    useSafeArea = false,
    showsVerticalScrollIndicator = false
}) => {
    return (
        <ViewContainer useSafeArea={useSafeArea} backgroundColor={backgroundColor} style={style}>
            <ScrollView
                showsVerticalScrollIndicator={showsVerticalScrollIndicator}
                style={[containerStyle.container(backgroundColor), styles.scroll]}>
                {children}
            </ScrollView>
        </ViewContainer>
    );
};

export default ScrollContainer;

const styles = StyleSheet.create({
    scroll: {},
});
