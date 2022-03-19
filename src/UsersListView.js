import {useNavigation} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  FlatList,
  Button,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import database from '@react-native-firebase/database';

const UsersListView = props => {
  const [deRef, setDbRef] = useState();
  const [dbUserList, setDbUsesList] = useState();
  const navigator = useNavigation();
  useEffect(() => {
    if (!deRef) {
      setDbRef(() => {
        return database().ref('/users');
      });
    }
  });

  useEffect(() => {
    if (deRef) {
      deRef.on('value', getCollection);
    }
  }, [deRef]);

  const getCollection = querySnapshot => {
    const userArr = [];
    querySnapshot.length !== 0 &&
      querySnapshot?.forEach((res, idx) => {
        const {name, password} = res?._snapshot?.value;
        userArr.push({
          id: res.key,
          name,
          password,
        });
      });
    setDbUsesList(() => {
      return userArr;
    });
  };

  const deleteAd = key => {
    return database()
      .ref('/users/' + key)
      .remove();
  };
  const renderItem = ({item, index}) => {
    return (
      <View style={styles.itemStyle}>
        <TouchableOpacity
          onPress={() => props.navigateToDetailsProp(item)}
          style={{flex: 1}}>
          <Text numberOfLines={1}>{item?.name}</Text>
        </TouchableOpacity>
        <Button
          title={'DELETE'}
          onPress={() => {
            deleteAd(item?.id);
          }}
        />
      </View>
    );
  };

  const listEmptyComponent = () => {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>No users found</Text>
      </View>
    );
  };

  const listHeaderComponent = () => {
    return <Text style={{fontSize: 12}}>Tap name to edit</Text>;
  };

  return (
    <FlatList
      data={dbUserList}
      contentContainerStyle={{flex: 1, padding: '5%'}}
      renderItem={item => {
        return renderItem(item);
      }}
      ListHeaderComponent={listHeaderComponent}
      ListEmptyComponent={listEmptyComponent}
    />
  );
};

export default UsersListView;

const styles = StyleSheet.create({
  itemStyle: {
    flexDirection: 'row',
    width: '100%',
    height: 60,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
});
