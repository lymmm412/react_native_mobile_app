import React, { Component } from 'react';

import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from 'react-native';
import HeaderWithIconComponent from './components/HeaderWithIconComponent.js';

import FeedbackComponent from './components/FeedbackComponent.js';
export default class FeedbackPage extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <>
        <SafeAreaView style={styles.container}>
          <HeaderWithIconComponent
          navigation={this.props.navigation}
          back="ClientHome"
          home="ClientHome"/>
          <ScrollView style={styles.scrolling}>
              <FeedbackComponent
              navigation={this.props.navigation}
              success="ClientHome"
              fail="Feedback"/>
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
  scrolling: {
    marginBottom: 60,
  },
});


