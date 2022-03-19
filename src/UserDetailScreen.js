import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { Button, View, Text } from "react-native";
import AddUserView from "./AddUserView";
import database from "@react-native-firebase/database";

const UserDetailScreen = () => {
  const route = useRoute();
  const navigator = useNavigation();

  const data = route.params.details;
  const [deRef, setDbRef] = useState();
  useEffect(() => {
    if (!deRef) {
      setDbRef(() => {
        return database().ref("/users/" + data.id);
      });
    }
  });

  const updateUser = async (val) => {
    console.log(val);
    if (val.name == "") {
      alert("Enter at name");
    } else if (val.password == "") {
      alert("Enter at password");
    } else {
      deRef &&
        deRef.update({
          name: val.name,
          password: val.password,
        });
      navigator.goBack();
    }
  };
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: "5%",
      }}
    >
      <AddUserView editValues={data} storeUser={(val) => updateUser(val)} />
    </View>
  );
};
export default UserDetailScreen;
