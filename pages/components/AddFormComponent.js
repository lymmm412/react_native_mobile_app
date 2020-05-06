import React, {Component} from 'react';
import {Text, StyleSheet, View, TextInput, TouchableHighlight, Alert} from 'react-native';


import { Stitch, UserPasswordCredential, RemoteMongoClient, AnonymousCredential } from 'mongodb-stitch-react-native-sdk';


const initialState = {
  supportSpanish: false,
  name: '',
  description: '',
  contact: '',
  category: '',
  service: '',
};
class AddFormComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
          initialState,
          data: [],
        };
    }
    reset() {
      this.setState(initialState);
    }

    _updateNewInstance () {
      console.log('username is:', this.props.username);
      console.log('password is:', this.password);
      // Retrieve the collection in the database
      const newItem = {
        'name': this.state.name,
        'description': this.state.description,
        'phone': this.state.contact,
        'type': this.state.category,
        'subtype': this.state.service,
        'count': 0,
      };
      const stitchAppClient = Stitch.defaultAppClient;
      const mongoClient = stitchAppClient.getServiceClient(RemoteMongoClient.factory, 'mongodb-atlas');
      stitchAppClient.auth
        .loginWithCredential(new UserPasswordCredential(this.props.username, this.props.password))
        .then((user) => {
          console.log(`Logged in as user with id: ${user.id}`);
          // Retrieve a database object
          const conn = mongoClient.db('test');

          // Retrieve the collection in the database
          const db = conn.collection('providers');

          db.insertOne(newItem)
          .then(result => {
            console.log('Successfully inserted item with _id', result.insertedId);
            alert('Successfully inserted new service');
            this.reset();
            this.getCategories(); // navigation is inside
          })
          .catch(err => {
            console.error(err);
            alert('Failed to inserted new service');
            this.reset();
            this.props.navigation.navigate(this.props.name, 
              {categoryList: this.props.category, username: this.props.username, password: this.props.password});
          });
        }).catch(console.error);
        // this.getCategories(props);
      
    }
    getCategories () {
      console.log('get category');
      const stitchAppClient = Stitch.defaultAppClient;
      console.log('here');
      const mongoClient = stitchAppClient.getServiceClient(RemoteMongoClient.factory, 'mongodb-atlas');
    
      stitchAppClient.auth
          .loginWithCredential(new AnonymousCredential())
          .then(() => { 
            const conn = mongoClient.db('test');
            const db = conn.collection('providers');
            db.aggregate(
              [{'$group': { '_id': '$type' }}]
            )
            .toArray()
            .then( res => {
              const arr = new Array();
              for (let i = 0; i < res.length; i++) {
                const obj = new Object();
                obj['name'] = res[i]._id;
                arr.push(obj);
              }
              console.log(arr);
              this.setState({data: arr}, function() {
                console.log('get new list:');
                  console.log(this.state.data);
                });
                console.log('data after insert');
                this.props.action(this.state.data);
                this.props.navigation.navigate(this.props.name, 
                  {username: this.props.username, password: this.props.password});
            }).catch(() => Alert.alert('no content for your selection'));
    
          }).catch(console.error);
    
    }
  render() {
    return (
        <View style={styles.container}>
          <Text style={styles.formLabel}> Add New Medical Services </Text>
          <View style={styles.main}>
            <Text style={styles.title}>Service Name</Text>
            <TextInput placeholder="Service Name" style={styles.inputStyle} 
            value={this.state.name}
            onChangeText={(input) => this.setState({ name: input })}/>
            <Text style={styles.title}>Service Description</Text>
            <TextInput
            //   secureTextEntry={true}
              placeholder="Service description"
              style={styles.inputStyle}
              value={this.state.description}
              onChangeText={(input) => this.setState({ description: input })}
            />
            <Text style={styles.title}>Service Contact</Text>
            <TextInput
              placeholder="Service Contact"
              style={styles.inputStyle}
              value={this.state.contact}
              onChangeText={(input) => this.setState({ contact: input })}/>
            <Text style={styles.title}>Hospital Category</Text>
            <TextInput
            //   secureTextEntry={true}
              placeholder="Service Category"
              style={styles.inputStyle}
              value={this.state.category}
              onChangeText={(input) => this.setState({ category: input })}
            />
            <Text style={styles.title}>Service Type</Text>
            <TextInput
            //   secureTextEntry={true}
              placeholder="Service Type" 
              style={styles.inputStyle}
              value={this.state.service}
              onChangeText={(input) => this.setState({ service: input })}
            />
            <View style={{
              marginTop: 50,
              alignItems: 'center',
            }}>
            <TouchableHighlight
                  activeOpacity={1}
                  style={styles.btn}
                  underlayColor="#fff"
                  onPress={() => this._updateNewInstance(this.props)}>
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
    borderRadius: 50,
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
  }
});

export default AddFormComponent;