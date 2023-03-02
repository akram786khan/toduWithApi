import { SafeAreaView, View } from 'react-native';
import React from 'react';
import Container from './Container';
import colors from '../../constants/colors';
import { globalStyle } from '../../constants/globalStyle';

const ViewContainer = ({
    children,
    backgroundColor = colors.white,
    style = {},
    useSafeArea = false
}) => {
    return (
        <Container>
            {
                useSafeArea
                    ? <SafeAreaView style={[globalStyle.container(backgroundColor), style]}>
                        {children}
                    </SafeAreaView>
                    : <View style={[globalStyle.container(backgroundColor), style]}>
                        {children}
                    </View>
            }
        </Container>
    );
};

export default ViewContainer;