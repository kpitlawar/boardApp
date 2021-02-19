import React, { useState, useEffect } from 'react';
import { View, Text, StatusBar } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export default function Home({ navigation }) {

    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();

    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    if (initializing) return null;

    if (!user) {
        return navigation.navigate('Login');
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <StatusBar barStyle="light-content" hidden={false} backgroundColor="#DA428B" translucent={true} />
            <Text>Welcome {user.email}</Text>
        </View>
    );



}

Home.navigationOptions = ({ navigation }) => ({
    title: 'Home',
    headerLeft: () => <Button
        buttonStyle={{ padding: 0, marginRight: 20, backgroundColor: 'transparent' }}
        icon={
            <Icon
                style={{ marginStart: 5 }}
                name="add-circle"
                size={28}
                color="white"
            />
        }
        onPress={() => { navigation.navigate('AddBoard') }}
    />,

});