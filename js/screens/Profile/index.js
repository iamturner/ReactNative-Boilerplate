import React, { Component } from 'react';
import { StyleSheet, ActivityIndicator } from 'react-native';
import { View, List, Text, Colors, Container, Button, Image } from './../../theme';
import { connect } from 'react-redux';

class Profile extends Component {
    
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: 'Profile',
            headerRight: (
                <Button onPress={() => navigation.navigate('EditProfile', {  onUpdatedProfile: navigation.getParam('updateProfile') })}>
                    <Button.Text>Edit</Button.Text>
                </Button>
            )
        };
    };
    
    constructor(props, context) {
        super(props, context);
        this.state = {
            userProfile: null
        }
    }

    componentWillMount() {
        this.setState({
            userProfile: {...this.props.profile}
        });
    }

    componentDidMount() {
        this.props.navigation.setParams({ updateProfile: this.updateProfile });
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.profile !== this.props.profile) {
            this.setState({
                userProfile: {...this.props.profile}
            });
        }
    }

    updateProfile = (data) => {
        this.setState({
            userProfile: data
        });
    }

    render() {
        
        return (
            
            <Container>
            
                { !this.state.userProfile && <View style={{marginTop: 24}}>
                    <ActivityIndicator />
                </View> }
            
                { this.state.userProfile && <View>
            
                    { this.state.userProfile.photo && <View padding style={styles.photoContainer}>
                        <View style={styles.photoBackground}></View>
                        <View style={styles.photo}>
                            <Image style={styles.photoImage} 
                                source={{uri: this.state.userProfile.photo}}
                                placeholder={require('./../../../assets/img/user.png')} />
                        </View>
                    </View> }
            
                    <View style={{ marginTop: 20, paddingHorizontal: 16 }}>
                        <Text style={{ fontSize: 14 }}>Personal Information</Text>
                    </View>
            
                    <List style={{ marginTop: 10 }}>
                        <List.Item>
                            <View style={{ paddingVertical: 11, flexDirection: 'row' }}>
                                <Text style={{ flex: 1 }}>Name</Text>
                                <Text style={{ color: Colors.secondary }}>{ this.state.userProfile.name }</Text>
                            </View>
                        </List.Item>
                        <List.Item style={{ borderBottomWidth: 0 }}>
                            <View style={{ paddingVertical: 11, flexDirection: 'row' }}>
                                <Text style={{ flex: 1 }}>Location</Text>
                                <Text style={{ color: Colors.secondary }}>{ this.state.userProfile.location }</Text>
                            </View>
                        </List.Item>
                    </List>
            
                </View> }
            
            </Container>
            
        );
        
    }
    
}

const styles = StyleSheet.create({
    photoContainer: {
        paddingBottom: 0
    }, 
    photoBackground: {
        backgroundColor: 'rgba(81, 101, 120, 0.15)', 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: 16
    }, 
    photo: {
        backgroundColor: '#516578', 
        height: 80, 
        width: 80, 
        borderRadius: 40, 
        marginTop: 16
    }, 
    photoImage: {
        height: 80, 
        width: 80, 
        borderRadius: 40
    }
});

const mapStateToProps = ({ profile }) => {

    return profile;
};

export default connect(
    mapStateToProps
)(Profile);