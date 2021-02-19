import React, { useState } from 'react';
import { StyleSheet, ActivityIndicator, View, Text, Alert, StatusBar } from 'react-native';
import { Button, Input, Icon } from 'react-native-elements';
import auth from '@react-native-firebase/auth';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


export default function Reset({ navigation }) {
    const [email, setEmail] = useState('');
    const [showLoading, setShowLoading] = useState(false);

    const reset = async () => {
        if (email.length == 0) {
            alert("Email cannot be empty");
            setShowLoading(false);


        } else {
            setShowLoading(true);
            try {
                await auth().sendPasswordResetEmail(email);
                alert("We have sent an email to reset your password. Please check your inbox  " + email)
                setShowLoading(false);
            } catch (e) {
                setShowLoading(false);
                Alert.alert(
                    e.message
                );
            }
        }

    };


    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" hidden={false} backgroundColor="#DA428B" translucent={true} />

            <Text style={styles.txtLogin}>Reset Password!</Text>
            <View style={styles.inputView}>
                <Input
                    placeholder='Your Email'
                    leftIcon={
                        <Icon
                            name='mail'
                            size={24}
                        />
                    }
                    value={email}
                    onChangeText={setEmail}
                />
            </View>


            <View style={styles.inputView}>
                <Button
                    buttonStyle={{ backgroundColor: "#DA428B" }}
                    icon={
                        <Icon
                            style={{ padding: 5 }}
                            name="refresh"
                            size={15}
                            color="white"
                        />
                    }
                    title="Reset"
                    onPress={() => reset()} />
            </View>

            <View style={styles.inputView}>
                <Button
                    buttonStyle={{ backgroundColor: "#DA428B" }}
                    icon={
                        <Icon
                            style={{ padding: 5 }}
                            name="check-circle"
                            size={15}
                            color="white"
                        />
                    }
                    title="Back to Login"
                    onPress={() => {
                        navigation.navigate('Login');
                    }} />
            </View>

            {showLoading &&
                <View style={styles.activity}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            }

        </View>
    );
}

Reset.navigationOptions = ({ navigation }) => ({
    title: 'Reset',
    headerShown: false,
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    txtLogin: {
        fontSize: hp('4%')

    },
    inputView: {
        width: wp('90%'),
        marginTop: hp('2%')
    },

    activity: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
})