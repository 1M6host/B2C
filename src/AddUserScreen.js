import React, {useEffect, useState} from 'react';
import {Button, View, Text} from 'react-native';
import AddUserView from './AddUserView';
import database from '@react-native-firebase/database';
import {useNavigation} from '@react-navigation/native';

const AddUserScreen = () => {
  const [deRef, setDbRef] = useState();
  const navigator = useNavigation();
  useEffect(() => {
    if (!deRef) {
      setDbRef(() => {
        return database().ref('/users');
      });
    }
  });

  const AddUser = async val => {
    console.log(val);
    if (val.name == '') {
      alert('Enter a name');
    } else if (val.password == '') {
      alert('Enter a password');
    } else {
      deRef &&
        deRef.push({
          name: val.name,
          password: val.password,
        });
    }
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: '5%',
      }}>
      <AddUserView storeUser={val => AddUser(val)} />
      <Button
        title="Go to user list"
        onPress={() => navigator.navigate('UserScreen')}
        color="#19AC52"
      />
    </View>
  );
};
export default AddUserScreen;
