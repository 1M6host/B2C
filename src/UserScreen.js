import {useNavigation} from '@react-navigation/native';
import React, {Component} from 'react';
import {Button, View, Text} from 'react-native';
import UsersListView from './UsersListView';
const UserScreen = () => {
  const navigation = useNavigation();
  const navigateToDetails = data => {
    navigation.navigate('UserDetailScreen', {"details": data});
  };
  return <UsersListView navigateToDetailsProp={(data) => navigateToDetails(data)} />;
};
export default UserScreen;
