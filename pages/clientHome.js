import React from 'react';
// import {SafeAreaView, StatusBar,StyleSheet} from 'react-native';
import {
  StyleSheet,
  Alert,
  SafeAreaView,
  StatusBar,
} from 'react-native';

import { ScrollView } from 'react-native-gesture-handler';
import HeaderComponent from './components/HeaderComponent.js';
import ButtonGridComponent from './components/ButtonGridComponent.js';
import FooterComponent from './components/FooterComponent.js';
import { Stitch, AnonymousCredential, RemoteMongoClient } from 'mongodb-stitch-react-native-sdk';

 class ClientHome extends React.Component {
   constructor(props) {
     super(props);
     this.state = {
      currentUserId: undefined,
      client: undefined,
      data: [],
      isAdmin: false,
     };
     this._loadClient = this._loadClient.bind(this);
     this._getCategories = this._getCategories.bind(this);
   }

   async componentDidMount() {
    await this._loadClient();
    this._getCategories();
  }

  async _loadClient() {
    console.log('here in app.js');
    await Stitch.initializeDefaultAppClient(
      'wcpg-bxtzi'
    ).then(client => {
      this.setState({ client });
      if (client.auth.isLoggedIn) {
        this.setState({
          currentUserId: client.auth.user.id,
        });
      }
    });
  }

  _getCategories= () => {
    console.log('here in client');
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
            if (typeof res === undefined) {
              Alert.alert('no content for your selection');
              return;
            }
            const arr = new Array();
            // const obj = new Object();
            for (let i = 0; i < res.length; i++) {
              const obj = new Object();
              obj['name'] = res[i]._id;
              arr.push(obj);
            }
            this.setState({data: arr}, function() {
                // console.log(this.state.data);
              });
          }).catch(() => Alert.alert('no content for your selection'));

        }).catch(console.error);

  }

   render() {
    const items = this.state.data;

    return (
      <>
        <StatusBar barStyle="light-content" />
        <SafeAreaView style={styles.container}>
          <HeaderComponent />
          <ScrollView style={styles.scrolling}>
            <ButtonGridComponent
              text="What resources are you looking for today?"
              hint="(Select One)"
              buttons={items}
              navigation={this.props.navigation}
              name="ClientResources"
              isAdmin={this.state.isAdmin}
            />
          </ScrollView>
          <FooterComponent
              navigation={this.props.navigation}
              buttons={items}
              name="Login"
              feedback="Feedback"
              portal="Admin portal"
            />
        </SafeAreaView>
      </>
    );
   }

}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#1565C0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrolling: {
    marginBottom: 60,
  },
});

export default ClientHome;
