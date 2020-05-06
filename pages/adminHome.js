import React from 'react';
import {
  StyleSheet, 
  SafeAreaView, 
  StatusBar,
  Alert,
} from 'react-native';

import HeaderComponent from './components/HeaderComponent.js';
import ButtonGridComponent from './components/ButtonGridComponent.js';
import CreateButtonComponent from './components/CreateButtonComponent.js';
import FooterComponent from './components/FooterComponent.js';
import { ScrollView } from 'react-native-gesture-handler';
import { Stitch, AnonymousCredential, RemoteMongoClient } from 'mongodb-stitch-react-native-sdk';

class AdminHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isAdmin: true,
    };
    this.getCount = this.getCount.bind(this);
    this.handler = this.handler.bind(this);
  }

componentDidMount() {
  const categories = this.props.route.params.buttons;
  this.getCount(categories);
}

handler(arr) {
    this.getCount(arr);
}


  getCount = (categories) => {

    // const categories = this.props.route.params.buttons;
    const stitchAppClient = Stitch.defaultAppClient;
    const mongoClient = Stitch.defaultAppClient.getServiceClient(RemoteMongoClient.factory, 'mongodb-atlas');
    stitchAppClient.auth
        .loginWithCredential(new AnonymousCredential())
        .then( () => {
          const conn = mongoClient.db('test');
          const db = conn.collection('providers');
          const arr = new Array();
          for (let i = 0; i < categories.length; i++) {

            const category = categories[i].name;
            // console.log(`category: ${category}, i: ${i}`)
            db.aggregate([
              {'$match': {'type': `${category}`}},
              {'$group': { '_id': null, 'totalCount': {'$sum': '$count'} }}
            ]).toArray()
            .then(res => {
                const obj = new Object();
                if (res.length === 0) {
                  Alert.alert('no content for your selection');
                  return;
                }
                obj['name'] = category;
                obj['count'] = res[0].totalCount;
                arr.push(obj);
                if (arr.length === categories.length) {
                  this.setState({data: arr}, function() {
                  });
                }
            }).catch(
              // err => console.error(`Failed to group aggregation: ${err}`)
              () => Alert.alert('no content for your selection')
              );

          }


        }).catch(console.error);
  }


  render() {
    const { route } = this.props;
    // console.log('data IN ADMIN HOME is :');
    // console.log(route.params.buttons);
    // console.log('is admin');
    // console.log(this.state.isAdmin);
    return (
      <>
        <StatusBar barStyle="light-content" />
        <SafeAreaView style={styles.container}>
          <HeaderComponent />
          <ScrollView style={styles.scrolling}>
            <ButtonGridComponent
            text='Welcome Administrator'
            // buttons={route.params.buttons}
            buttons={this.state.data}
             navigation={this.props.navigation} 
              name="ClientResources" 
              isAdmin={this.state.isAdmin}/>
            <CreateButtonComponent 
            navigation={this.props.navigation} 
            name="AdminAddForm"
            category={route.params.buttons}
            username={route.params.username}
            password={route.params.password}
            action={this.handler}
            />
          </ScrollView>
          <FooterComponent navigation={this.props.navigation}
            buttons={route.params.buttons}
            name="ClientHome"
            portal="Client portal"
            feedback="AdminFeedback"
            />
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
  scrolling: {
    marginBottom: 60,
  },
});
export default AdminHome;
