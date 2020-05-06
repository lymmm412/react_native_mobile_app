import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Alert,
  } from 'react-native';
  import Icon from 'react-native-vector-icons/FontAwesome';
//   <Icon name="rocket" size={30} color="#900" />;

// function CreateButtonComponent() 
class CreateButtonComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.container}>
            <View style={styles.itemContainer}>
              <Icon name="plus-square-o" size={120}  color='#9DC8EC'
              onPress={() => this.props.navigation.navigate(this.props.name, 
              {categoryList: this.props.category, username: this.props.username, password: this.props.password, action: this.props.action})}/>
            </View>
            <Text style={styles.itemName}>Create A Category</Text>
      </View>
  );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    itemContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      height: 100,
      marginBottom: '5%',
      },
    
      mainBtn: {
        height: 110,
        width: 110,
        borderRadius: 15,
        backgroundColor: '#e1ebf0',
      },
      itemName: {
        textAlign: 'center',
        color: '#B2DFDB',
      },
});

export default CreateButtonComponent;