import SegmentedControlTab from 'react-native-segmented-control-tab';
import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';

class ServiceSegmentedControlTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 2,
    };
  }
  handleIndexChange = index => {
    this.setState({
      ...this.state,
      selectedIndex: index,
    });
  };
  render() {
    return (
      <View style={styles.container}>
        <SegmentedControlTab
          values={['Home', this.props.categoryName, this.props.serviceName]}
          selectedIndex={this.state.selectedIndex}
          onTabPress={this.handleIndexChange}
          activeTabStyle= {styles.tab}
          tabTextStyle={styles.text}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: '100%',
    paddingTop: 10,
  },
  tab: {
    backgroundColor: '#0D47A1',
  },
  text: {
    color: '#0D47A1',
  }
});

export default ServiceSegmentedControlTab;
