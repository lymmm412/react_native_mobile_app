import React from 'react';
import {StyleSheet, View, Text, Alert, TouchableOpacity} from 'react-native';
// import {NavigationContainer} from '@react-navigation/native';
// import {createStackNavigator} from '@react-navigation/stack';

// import ClientHome from '../clientHome.js';
// import AdminHome from '../adminHome.js';

// const Stack = createStackNavigator();

// function FooterComponent({navigation,name,portal}) 
class FooterComponent extends React.Component {
  render() {
    return (
      // <AppContainer>
        <View style={styles.footer}>
          <TouchableOpacity onPress={() => 
            this.props.navigation.navigate(this.props.name, {buttons: this.props.buttons})}>
            <Text style={styles.footerText}>{this.props.portal}</Text>
          </TouchableOpacity>
          
          <View style={styles.buttonsInLine}>
            <TouchableOpacity onPress={toContact}>
              <Text style={styles.footerText}>Contact us</Text>
            </TouchableOpacity>
            <Text> | </Text>
            <TouchableOpacity onPress={() =>
            this.props.navigation.navigate(this.props.feedback)}>
              <Text style={styles.footerText}>Feedback</Text>
            </TouchableOpacity>
          </View>
        </View>
      // </AppContainer>
      
    );
  }
  
}

function toContact() {
  Alert.alert('navigate to contact page');
}

const styles = StyleSheet.create({
  footer: {
    height: 50,
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
  },
  footerText: {
    color: '#fff',
  },
  buttonsInLine: {
    flexDirection: 'row',
  },
});

export default FooterComponent;
