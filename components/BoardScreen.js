import React, { Component } from 'react';
import { StyleSheet, ActivityIndicator, View, StatusBar } from 'react-native';
import { ListItem, Button, Icon } from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';


class BoardScreen extends Component {
    static navigationOptions = ({ navigation }) => {


        function logout() {
            auth().signOut()
            navigation.navigate('Login')

        }
        return {
            title: 'Board List',
            headerLeft: () => (
                <Button
                    buttonStyle={{ padding: 0, backgroundColor: 'transpernt' }}
                    icon={{ name: 'logout', color: 'white', style: { marginRight: 0, fontSize: 28 } }}
                    onPress={logout}
                />
            ),
            headerRight: () => (
                <Button
                    buttonStyle={{ padding: 0, backgroundColor: 'transpernt' }}
                    icon={{ name: 'add-circle', color: 'white', style: { marginRight: 0, fontSize: 28 } }}
                    onPress={() => { navigation.push('AddBoard') }}
                />
            ),

        };
    };



    constructor() {
        super();
        this.ref = firestore().collection('boards');
        this.unsubscribe = null;
        this.state = {
            isLoading: true,
            boards: [],
        };
    }



    onCollectionUpdate = (querySnapshot) => {
        const boards = [];
        querySnapshot.forEach((doc) => {
            const { title, description, author } = doc.data();
            boards.push({
                key: doc.id,
                doc, // DocumentSnapshot
                title,
                description,
                author,
            });
        });
        this.setState({
            boards,
            isLoading: false,
        });
    }


    componentDidMount() {
        this.ref = firestore().collection('boards');

        this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
    }

    render() {


        if (this.state.isLoading) {

            return (
                <View style={styles.activity}>
                    <StatusBar barStyle="light-content" hidden={false} backgroundColor="#DA428B" translucent={true} />

                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            )
        }
        return (

            <View>
                <StatusBar barStyle="light-content" hidden={false} backgroundColor="#DA428B" translucent={true} />

                {
                    this.state.boards.map((item, i) => (
                        <ListItem key={i} bottomDivider onPress={() => {
                            this.props.navigation.navigate('BoardDetails', {
                                boardkey: `${JSON.stringify(item.key)}`,
                            });
                        }}>
                            <Icon name="book" type='font-awesome' />
                            <ListItem.Content>
                                <ListItem.Title>{item.title}</ListItem.Title>
                            </ListItem.Content>
                            <ListItem.Chevron />
                        </ListItem>
                    ))
                }
            </View>

        );
    }
}

export default BoardScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 22
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
    activity: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
})