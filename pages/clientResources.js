import React, { Component } from 'react';

import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  View
} from 'react-native';
import HeaderWithIconComponent from './components/HeaderWithIconComponent.js';
import ResourcesList from './components/ResourcesList.js';
import FooterComponent from './components/FooterComponent.js';
import SegmentTab from './components/segmentTabBar.js';

class ClientResources extends Component {
  constructor(props) {
    super(props);
    this.navBack = this.navBack.bind(this);
    this.navHome = this.navBack.bind(this);
  }

  navBack() {
    console.log('navback');
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

  // navHome
  render() {
    const { route } = this.props;
    return (
      <>
        <StatusBar barStyle="light-content" />
        <SafeAreaView style={styles.container}>
          <HeaderWithIconComponent
          navigation={this.props.navigation}
          back={this.navBack()}
          home={this.navHome()}/>
          <SegmentTab
            categoryName={route.params.categoryName}
            />
          <View style={styles.middle}>
            <ResourcesList
            categoryName={route.params.categoryName}
            navigation={this.props.navigation}
            name="ClientServices"
            isAdmin={route.params.isAdmin}/>
          </View>
          <FooterComponent 
          navigation={this.props.navigation}
          feedback="Feedback"/>
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

export default ClientResources;
