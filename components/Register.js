import React, { useState } from 'react';
import { StyleSheet, ActivityIndicator, View, Text, Alert, StatusBar } from 'react-native';
import { Button, Input, Icon } from 'react-native-elements';
import auth from '@react-native-firebase/auth';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


export default function Register({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showLoading, setShowLoading] = useState(false);


    const register = async () => {
        if (email.length == 0 || password.length == 0) {
            alert("Email or Password fields cannot be empty");
            setShowLoading(false);


        } else {
            setShowLoading(true);
            try {
                const doRegister = await auth().createUserWithEmailAndPassword(email, password);
                setShowLoading(false);
                if (doRegister.user) {
                    navigation.navigate('Home');
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

            <Text style={styles.txtLogin}>Register Here!</Text>
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
                    title="Register"
                    onPress={() => register()} />
            </View>
            <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: hp('2%') }}>
                <Text>Already a user?</Text>
            </View>
            <View style={styles.inputView}>
                <Button
                    buttonStyle={{ backgroundColor: "#DA428B" }}
                    icon={
                        <Icon
                            style={{ padding: 5 }}
                            name="login"
                            size={15}
                            color="white"
                        />
                    }
                    title="Login"
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

Register.navigationOptions = ({ navigation }) => ({
    title: 'Register',
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
