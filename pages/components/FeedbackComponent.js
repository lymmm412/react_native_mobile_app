import React, {Component} from 'react';
import {Text, Platform, StyleSheet, View, TextInput, TouchableHighlight} from 'react-native';


import { Stitch, AnonymousCredential, RemoteMongoClient } from 'mongodb-stitch-react-native-sdk';

const initialState = {
    contact: '',
    content: '',
};
class FeedbackComponent extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }
    reset() {
      this.setState(initialState);
    }

    _updateFeedback () {
      // Retrieve the collection in the database
      console.log('contact: ', this.state.contact);
      console.log('context: ', this.state.contact);
      const newItem = {
        'contact': this.state.contact,
        'content': this.state.content,
      };
      const stitchAppClient = Stitch.defaultAppClient;
      const mongoClient = stitchAppClient.getServiceClient(RemoteMongoClient.factory, 'mongodb-atlas');
    stitchAppClient.auth
        .loginWithCredential(new AnonymousCredential())
        .then((user) => {
          console.log(`Logged in as user with id: ${user.id}`);
          // Retrieve a database object
          const conn = mongoClient.db('test');

          // Retrieve the collection in the database
          const db = conn.collection('feedbacks');

          db.insertOne(newItem)
          .then(result => {
            console.log('Successfully inserted item with _id', result.insertedId);
            alert('Successfully send a feedback');
            this.reset();
            this.props.navigation.navigate(this.props.success);
          })
          .catch(err => {
            console.error(err);
            alert('Failed to send a feedback');
            this.reset();
            this.props.navigation.navigate(this.props.fail);
          });
        }).catch(console.error);
      
    }
  render() {
      const numberOfLines = 6;
    return (
        <View style={styles.container}>
          <Text style={styles.formLabel}> Submit a Feedback </Text>
          <View style={styles.main}>
            <Text style={styles.title}> Your Email Address</Text>
            <TextInput placeholder="Email Address" style={styles.inputStyle} 
            value={this.state.contact}
            onChangeText={(input) => this.setState({ contact: input })}
            autoCapitalize = 'none'/>
            <Text style={styles.title}>Your Feedback</Text>
            <TextInput
              placeholder="Feedback"
              style={styles.inputStyle}
              value={this.state.content}
              onChangeText={(input) => this.setState({ content: input })}
              multiline={true}
              textAlignVertical='top'
              numberOfLines={Platform.OS === 'ios' ? null : numberOfLines}
              minHeight={(Platform.OS === 'ios' && numberOfLines) ? (20 * numberOfLines) : null}
            />
            <View style={styles.button}>
            <TouchableHighlight
                  activeOpacity={1}
                  style={styles.btn}
                  underlayColor="#fff"
                  onPress={() => this._updateFeedback()}>
                  <View style={styles.textContainer}>
                    <Text style={styles.itemName}>Submit</Text>
                  </View>
                </TouchableHighlight>
            </View>
          </View>
        </View>
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
  inputCombination: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    alignContent: 'center',
  },

  title: {
    color: '#E3F2FD',
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 15,
  },
  formLabel: {
    padding: 20,
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  
  btn: {
    height: 30,
    width: 100,
    borderRadius: 20,
    backgroundColor: '#1E88E5',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#1976D2', 
    borderWidth: 5, 
  },

  itemName: {
    textAlign: 'center',
    color: '#E3F2FD',
    fontWeight: 'bold',
    fontSize: 15,
    maxWidth: 100,
  },

  inputStyle: {
    marginTop: 10,
    width: 250,
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: '#E3F2FD',
  },
  formText: {
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    fontSize: 20,
  },
  text: {
    color: '#fff',
    fontSize: 20,
  },
  main: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  button: {
    marginTop: 50,
    alignItems: 'center',
  }
});

export default FeedbackComponent;