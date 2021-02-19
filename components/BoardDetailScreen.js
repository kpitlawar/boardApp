import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View, StatusBar } from 'react-native';
import { List, ListItem, Text, Card, Button, Icon } from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';

class BoardDetailScreen extends Component {
    static navigationOptions = {
        title: 'Board Details',
    };

    constructor() {
        super();
        this.state = {
            isLoading: true,
            board: {},
            key: ''
        };
    }

    componentDidMount() {
        const { navigation } = this.props;
        const ref = firestore().collection('boards').doc(JSON.parse(navigation.getParam('boardkey')));
        ref.get().then((doc) => {
            if (doc.exists) {
                this.setState({
                    board: doc.data(),
                    key: doc.id,
                    isLoading: false
                });
            } else {
                console.log("No such document!");
            }
        });
    }

    deleteBoard(key) {
        const { navigation } = this.props;
        this.setState({
            isLoading: true
        });
        firestore().collection('boards').doc(key).delete().then(() => {
            console.log("Document successfully deleted!");
            alert("Record deleted successfully!!!")
            this.setState({
                isLoading: false
            });
            navigation.navigate('Board');
        }).catch((error) => {
            console.error("Error removing document: ", error);
            this.setState({
                isLoading: false
            });
        });
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
            <ScrollView>
                <StatusBar barStyle="light-content" hidden={false} backgroundColor="#DA428B" translucent={true} />

                <Card style={styles.container}>
                    <View style={styles.subContainer}>
                        <View>
                            <Text h3>{this.state.board.title}</Text>
                        </View>
                        <View>
                            <Text h5>{this.state.board.description}</Text>
                        </View>
                        <View>
                            <Text h4>{this.state.board.author}</Text>
                        </View>
                    </View>
                    <View style={styles.detailButton}>
                        <Button
                            buttonStyle={{ backgroundColor: '#CCCCCC' }}
                            icon={
                                <Icon
                                    name='edit'
                                    type='font-awesome'
                                    size={20}
                                    color="white"
                                    style={{ padding: 5 }}
                                />
                            }
                            title='Edit'
                            onPress={() => {
                                this.props.navigation.navigate('EditBoard', {
                                    boardkey: `${JSON.stringify(this.state.key)}`,
                                });
                            }} />
                    </View>
                    <View style={styles.detailButton}>
                        <Button
                            buttonStyle={{ backgroundColor: '#999999', color: '#FFFFFF' }}
                            icon={
                                <Icon
                                    name='remove'
                                    type='font-awesome'
                                    size={20}
                                    color="white"
                                    style={{ padding: 5 }}
                                />
                            }
                            title='Delete'
                            onPress={() => this.deleteBoard(this.state.key)} />
                    </View>
                </Card>
            </ScrollView>
        );
    }
}

export default BoardDetailScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    subContainer: {
        flex: 1,
        paddingBottom: 20,
        borderBottomWidth: 2,
        borderBottomColor: '#CCCCCC',
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
    detailButton: {
        marginTop: 10
    }
})