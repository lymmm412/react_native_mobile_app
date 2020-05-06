import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  TouchableHighlight,
  FlatList
} from 'react-native';

import { Stitch, AnonymousCredential, RemoteMongoClient } from 'mongodb-stitch-react-native-sdk';
import {FlatGrid} from 'react-native-super-grid';
// import { ScrollView } from 'react-native-gesture-handler';
import { Row } from 'native-base';

class ResourcesList extends Component {
  constructor(props) {
    super(props);
    this.onPress = this.onPress.bind(this);
    this.state = {
      showName: false,
      data: [],
      count: 0,
    };
  }

  renderCategory() {
    if (
      this.showName === false ||
      this.showName === undefined
    ) {
      this.showName = true;
      return (
        <Text style={styles.Title}>
          {this.props.categoryName}
        </Text>
      );
    }
    return null;
  }

  componentDidMount() {
    this._onFetch();
  }

  _onFetch = () => {
    const stitchAppClient = Stitch.defaultAppClient;
    // console.log('the category chosen is', this.props.categoryName);
    const query = {'type': this.props.categoryName};
    const option = {'projection': {
      'subtype': 1,
      '_id': 0,
    }, };
    const mongoClient = stitchAppClient.getServiceClient(RemoteMongoClient.factory, 'mongodb-atlas');
    stitchAppClient.auth
        .loginWithCredential(new AnonymousCredential())
        .then(() => {
          // Retrieve a database object
          const conn = mongoClient.db('test');

          // Retrieve the collection in the database
          const db = conn.collection('providers');

          // Find 10 documents and log them to console.
          db.find(query, option)
              .toArray()
              .then(res => {
                const listSet = new Set();
                res.forEach(function(item) {
                  listSet.add(item.subtype);
                });
                let ListArray = new Array();
                ListArray = Array.from(listSet);
                const arr = new Array();
                  for ( let i = 0; i < ListArray.length; i++) {
                    const subtype = ListArray[i];
                  //  console.log(subtype);
                   db.aggregate([
                    {'$match': {'subtype': `${subtype}`}},
                    {'$group': { '_id': null, 'totalCount': {'$sum': '$count'} }}
                  ]).toArray()
                  .then(subRes => {
                    // console.log(subRes);
                    if (subRes.length === 0) {
                      Alert.alert('no content for your selection');
                      return;
                    }
                      const obj = new Object();

                      obj['subtype'] = subtype;
                      obj['totalCount'] = subRes[0].totalCount;
                      arr.push(obj);
                      // console.log("arr-----------------");
                      // console.log(arr)

                      if (arr.length === ListArray.length) {
                        this.setState({data: arr}, function () {
                          // console.log('data is');
                          // console.log(this.state.data);
                        });
                      }

                  }).catch(err => console.error(`Failed to group aggregation: ${err}`));


                  }

              })
              .catch(console.error);
        })
        .catch(console.error);
  }


  onPress(props, item, isAdminPortal) {
    props.navigation.navigate(this.props.name, {serviceName: item, categoryName: this.props.categoryName, isAdmin: isAdminPortal});
  }




  render() {
    function Count(props) {
      if (props.isAdmin) {
        return <Text style={styles.itemCount}>{props.count}</Text>;
      }
      else {
        return <></>;
      }
    }

    return (
        // <FlatList
        //     data={this.state.data}
        //     keyExtractor={(item, index) => index.toString()}
        //     renderItem={({item}) =>
        //         <View>
        //           <View style={styles.container}>
        //           <TouchableOpacity style={styles.container_text} onPress={() => this.onPress(this.props,item.subtype,this.props.isAdmin)}>
        //             <View>
        //               <Text style={styles.title}>{item.subtype}</Text>
        //               {/* add a item.count; */}
        //               <Count isAdmin={this.props.isAdmin} count={item.totalCount}/>
        //             </View>

        //             </TouchableOpacity>
        //           </View>
        //           <View style={styles.line}></View>
        //           <View style={styles.lineBreak}></View>
        //         </View>}
        // />

        <ScrollView style={styles.scrolling}>
          <SafeAreaView>
          <FlatGrid
            itemDimension={120}
            items={this.state.data}
            style={styles.gridView}
            spacing={20}
            renderItem={({item}) => (
              <View>
                <View style={styles.itemContainer}>
                  <TouchableHighlight
                    activeOpacity={1}
                    style={styles.mainBtn}
                    underlayColor="#fff"
                    onPress={() => this.onPress(this.props, item.subtype, this.props.isAdmin)}>
                    <View style={styles.textContainer}>
                      <Text style={styles.itemName}>{item.subtype}</Text>
                      <View style={styles.countContainer}>
                        <Count isAdmin={this.props.isAdmin} count={item.totalCount}/>
                      </View>
                    </View>
                  </TouchableHighlight>
                  {/* <Text style={styles.itemName}>{item.name}</Text> */}
                  {/* <Count isAdmin={this.props.isAdmin} count={item.count}/> */}
                </View>
                {/* <Text style={styles.itemName}>{item.name}</Text> */}
              </View>
            )}
          />
        {/* </ScrollView> */}
        </SafeAreaView>
        </ScrollView>
    );
  }
}

const styles = StyleSheet.create({

  gridView: {
    flex: 1,
    marginLeft: '10%',
    marginRight: '10%',
  },

  itemContainer: {
    marginTop: '15%',
    justifyContent: 'center',
    alignItems: 'center',
    // padding: 10,
    height: 100,
  },

  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
  },

  mainBtn: {
    height: 130,
    width: 130,
    borderRadius: 20,
    backgroundColor: '#ffff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 6,
    borderColor: '#E3F2FD',
  },
  itemName: {
    textAlign: 'center',
    color: '#01579B',
    fontWeight: 'bold',
    fontSize: 15,
    maxWidth: 100,
  },

  countContainer: {
    position: 'absolute',
    bottom: 0,
  },

  itemCount: {
    textAlign: 'center',
    color: '#448AFF',
    fontWeight: 'bold',
    fontSize: 24,
    maxWidth: 100,
  },
  scrolling: {
    marginBottom: 60,
  },
  // container: {
  //   flex: 1,
  //   flexDirection: 'row',
  //   padding: 20,
  //   height: 100,
  //   borderWidth: 0.5,
  //   borderColor: "#e0e0e0",
  //   backgroundColor: '#fff',
  // },


  // title: {
  //   fontSize: 20,
  //   fontWeight: 'bold',
  //   color: '#000',
  // },
  // container_text: {
  //   flex: 1,
  //   flexDirection: 'column',
  //   marginLeft: 12,
  //   justifyContent: 'center',
  //   alignItems: "center",
  // },
  // photo: {
  //   height: 60,
  //   width: 60,
  // },
  // itemCount: {
  //   textAlign: 'center',
  //   color: '#fff',
  //   fontWeight: 'bold',
  //   fontSize: 16,
  //   maxWidth: 100,
  // },
  // itemContainer: {
  //   flex: 1,
  //   flexDirection: "row",
  //   justifyContent: 'center',
  //   // alignItems: "center",
  // },
  // countContainer: {
  //   position: "absolute",
  //   bottom: 0,
  // },
  // count: {
  //   color: "#fff",
  // },
  // line: {
  //   height: 0.5,
  //   color: '#e0e0e0',
  //   backgroundColor: '#e0e0e0',
  // },
  // lineBreak: {
  //   height: 5,
  //   color: '#e0e0e0',
  //   backgroundColor: '#e0e0e0',
  // }

});

export default ResourcesList;
