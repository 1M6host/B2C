import React, {useState} from 'react';
import {Text, Button, StyleSheet, TextInput, View} from 'react-native';

const AddUserView = props => {
  const [name, setName] = useState(props.editValues?.name || '');
  const [password, setPassword] = useState(props.editValues?.password || '');

  return (
    <View style={{flex: 1, width: '90%'}}>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder={'Name'}
          value={name}
          maxLength={30}
          onChangeText={val => setName(val)}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          multiline={true}
          placeholder={'Password'}
          value={password}
          maxLength={30}
          onChangeText={val => setPassword(val)}
        />
      </View>
      <View style={styles.button}>
        <Button
          title={(props.editValues ? 'UPDATE' : 'ADD') + ' OPERATION'}
          onPress={() => {
            props.storeUser({name: name, password: password});
            setName('');
            setPassword('');
          }}
          color="#19AC52"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
  },
  inputGroup: {
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AddUserView;
