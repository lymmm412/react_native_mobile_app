import React, { Component } from 'react';

import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from 'react-native';
import HeaderWithIconComponent from './components/HeaderWithIconComponent.js';

import AddFormComponent from './components/AddFormComponent.js';
export default class AdminAddForm extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { route } = this.props;
    console.log('catagory list params is', route.params.categoryList);
    return (
      <>
        <SafeAreaView style={styles.container}>
          <HeaderWithIconComponent 
          navigation={this.props.navigation} 
          back="AdminHome"
          home="AdminHome"/>
          <ScrollView>
              <AddFormComponent 
              navigation={this.props.navigation} 
              username={route.params.username}
              password={route.params.password}
              name="AdminHome"
              categoryList={route.params.categoryList}
              action={route.params.action}/>
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#1565C0',
  },
});


