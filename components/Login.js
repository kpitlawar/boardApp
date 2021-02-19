import React, { useState } from 'react';
import { StyleSheet, ActivityIndicator, View, Text, Alert, LogBox, StatusBar } from 'react-native';
import { Button, Input, Icon } from 'react-native-elements';
import auth from '@react-native-firebase/auth';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';




export default function Login({ navigation }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showLoading, setShowLoading] = useState(false);
    LogBox.ignoreAllLogs();

    const login = async () => {

        if (email.length == 0 || password.length == 0) {
            alert("Email or Password fields cannot be empty");
            setShowLoading(false);


        } else {
            try {
                const doLogin = await auth().signInWithEmailAndPassword(email, password);
                setShowLoading(false);
                if (doLogin.user) {
                    navigation.navigate('Board');
                }
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
            <Text style={styles.txtLogin}>Please Login</Text>
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
                <Input
                    placeholder='Your Password'
                    leftIcon={
                        <Icon
                            name='lock'
                            size={24}
                        />
                    }
                    secureTextEntry={true}
                    value={password}
                    onChangeText={setPassword}
                />
            </View>
            <View style={styles.inputView}>
                <Button
                    buttonStyle={{ backgroundColor: "#DA428B" }}
                    icon={
                        <Icon
                            style={{ padding: 5 }}
                            name="input"
                            size={15}
                            color="white"

                        />
                    }
                    title="Login"
                    onPress={() => login()} />
            </View>
            <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: hp('2%') }}>
                <Text>OR</Text>
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
                    title="Reset Password"
                    onPress={() => {
                        navigation.navigate('Reset');
                    }} />
            </View>
            <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: hp('2%') }}>
                <Text>OR</Text>
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
                    title="Register"
                    onPress={() => {
                        navigation.navigate('Register');
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

Login.navigationOptions = ({ navigation }) => ({
    title: 'Login',
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