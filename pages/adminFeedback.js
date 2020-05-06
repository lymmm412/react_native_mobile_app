import React, { Component } from 'react';

import {SafeAreaView, View, StyleSheet} from 'react-native';
import HeaderWithIconComponent from './components/HeaderWithIconComponent.js';
import FeedbackList from './components/FeedbackListComponent.js';

class ClientServices extends Component {
  constructor(props) {
    super(props);
  }


  navHome() {
    console.log('navhome');
    const isAdmin = this.props.route.params.isAdmin;
    console.log(isAdmin);
    if (isAdmin) {
      console.log('admin home');
      return 'AdminHome';
    } else {
      console.log('client home');
      return 'ClientHome';
    }
  }

  render() {
    return (
      <>
        <SafeAreaView style={styles.container}>
          <HeaderWithIconComponent
          navigation={this.props.navigation}
          back="AdminHome"
          home="AdminHome"/>
          <View style={styles.middle}>
            <FeedbackList/>
          </View>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1565C0',
    alignItems: 'center',
    justifyContent: 'center',
  },

  middle: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    width: '100%',
  },

});


export default ClientServices;
