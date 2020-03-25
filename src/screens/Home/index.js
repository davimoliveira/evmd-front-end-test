import React from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import { UserCard } from '../../components';

import {LoadUsers} from '../../scripts';

var loading = false;

const Home = ({ navigation, user, dispatch}) => {
  
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      LoadUsers(user.id, dispatch, true);
    });

    return unsubscribe;
  }, [navigation]);

  nextPage = async () =>{
    loading = true;
    await LoadUsers(user.id, dispatch, false);
    loading = true;
  }

  footer = () => {
    if (!loading) return null;
    return(
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#59ECB9"/>
      </View>
    );
  }

 return(
  <View
    style={styles.container}
  >
    <FlatList
        data={user.users}
        renderItem={({ item, index }) => 
          <UserCard
            name= {item.name}
            age= {item.age}
            email= {item.email}
            picture= {item.picture}
            onPress={() => {
              dispatch({
                type: 'ChooseUser',
                index: index
              }); 
              navigation.navigate('Details');
            }}
          />
        }
        onEndReached={nextPage}
        onEndReachedThreshold={0.7}
        ListFooterComponent={footer}
        keyExtractor={item => item._id}
      />
  </View>
);
}
Home.propTypes = {
  navigation: PropTypes.oneOfType([PropTypes.object]).isRequired,
  user: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: '#f3f3f3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loading:{
    justifyContent: 'center',
    height: 100,  
  }
});

export default connect(state =>{
  return state;
}
)(Home);
