import React from 'react';
import {
  View, Image, StyleSheet, Text, TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Favoritos} from '../../scripts';

const Details = ({user: {chosen, users}, dispatch}) => (
  <View style={styles.container}>
    <View>
      <Image
        source={{
          uri: users[chosen].picture,
        }}
        style={styles.image}
      />
    </View>
    <View
      style={styles.detailsContainer}
    >
      <Text>Nome: {users[chosen].name}</Text>
      <Text>E-mail: {users[chosen].email}</Text>
      <Text>Idade: {users[chosen].age}</Text>
      <Text>Salário: {users[chosen].balance}</Text>
      <Text>Latitude: {users[chosen].latitude}</Text>
      <Text>Longitude: {users[chosen].longitude}</Text>
    </View>
    <TouchableOpacity
      style={styles.button}
      onPress={()=>{Favoritos(!users[chosen].favorite, users[chosen]._id, dispatch); console.log("miau")}}
    >
      <Text>
      {users[chosen].favorite == 1?"Remover dos ":"Adicionar aos "} favoritos
      </Text>
    </TouchableOpacity>
  </View>
);

Details.propTypes = {
  user: PropTypes.object.isRequired,
  choosen: PropTypes.number,
  users: PropTypes.array,
  dispatch: PropTypes.func.isRequired
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f3f3f3',
  },
  detailsContainer: {
    width: '100%',
    borderRadius: 5,
    padding: 10,
    marginTop: 15,
    backgroundColor: '#e5e5e5',
  },
  image: {
    width: 200,
    height: 200,
  },
  button: {
    borderRadius: 5,
    padding: 10,
    marginTop: 15,
    borderWidth: 1,
    borderColor: '#b1b1b1',
    backgroundColor: '#e5e5e5',
  },
});
export default connect(state =>{
  console.log(state.user.chosen);
  return state;
}
)(Details);
