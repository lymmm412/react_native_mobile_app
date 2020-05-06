import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import { Stitch, AnonymousCredential, RemoteMongoClient } from 'mongodb-stitch-react-native-sdk';


class FeedbackListComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        };
    }

    componentDidMount() {
        this._onFetch();
    }
    
    _onFetch = () => {
        const stitchAppClient = Stitch.defaultAppClient;
        // console.log('the category chosen is', this.props.categoryName);
        // console.log('the service chosen is', this.props.serviceName);
        const option = {'projection': {
          'contact': 1,
          'content': 1,
          '_id': 0,
        }, };
        const mongoClient = stitchAppClient.getServiceClient(RemoteMongoClient.factory, 'mongodb-atlas');
        stitchAppClient.auth
            .loginWithCredential(new AnonymousCredential())
            .then(() => {
              // Retrieve a database object
              const conn = mongoClient.db('test');
    
              // Retrieve the collection in the database
              const db = conn.collection('feedbacks');
    
              // Find 10 documents and log them to console.
              const hospitalList = new Array();
              db.find({}, option)
                  .toArray()
                  .then(res => {
                    // console.log('res is', res);
                    const FeedbackList = new Array();
                    res.forEach(function(item) {
                      const instance = new Object();
                      instance['contact'] = item.contact;
                      instance['content'] = item.content;
                      FeedbackList.push(instance);
                    });
                    console.log('here is the list of feedback', FeedbackList);
                    this.setState({data: FeedbackList});
                  })
                  .catch(console.error);
            })
            .catch(console.error);
      }
      render() {
          return (
              <FlatList 
                data={this.state.data}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) =>
                <View style={styles.container}>
                    <View style={styles.container_text}>
                        <Text style={styles.title}>
                            {item.content}
                        </Text>
                        <View style={{position: 'absolute', bottom: 0}}>
                            <Text style={{fontSize: 15}}>Email: {item.contact}</Text>
                        </View>
                    </View>
                </View>}
              />
          );
      }
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    flexDirection: 'row',
    // padding: 10,
    marginLeft: 16,
    marginRight: 16,
    marginTop: 20,
    marginBottom: 10,
    borderRadius: 25,
    height: 130,
    // backgroundColor: '#FFF',
    elevation: 2,
    padding: 20,
    backgroundColor: '#E0F2F1',
    // shadowColor: "#B2DFDB",
    // shadowOpacity: 0.8,
    // shadowRadius: 2,
    // shadowOffset: {
    //   height: 5,
    //   width: 5,
    // }
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  container_text: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 12,
    justifyContent: 'center',
  },
  container_detail: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 10,
  },

  Title: {
    marginTop: 20,
    fontSize: 30,
  },

  countContainer: {
    position: 'absolute',
    right: 0,
  },
});

export default FeedbackListComponent;