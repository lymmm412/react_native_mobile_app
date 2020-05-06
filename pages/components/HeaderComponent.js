import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

// function HeaderComponent() 
class HeaderComponent extends React.Component {
  render() {
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>White Coat Pocket Guide</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    // backgroundColor: '#356859',
    // width: '10',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },

  headerText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default HeaderComponent;
