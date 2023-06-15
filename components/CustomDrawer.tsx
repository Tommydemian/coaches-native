import React, { FC } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { DrawerContentComponentProps } from "@react-navigation/drawer";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";

type CustomDrawerProps = DrawerContentComponentProps;

export const CustomDrawer: FC<CustomDrawerProps> = (props) => {
  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props}>
        <View style={{ alignItems: 'center'}}>
        <Image
          source={require("../assets/randomUser.jpg")}
          style={styles.userAvatar}
        />
        </View>
        <View style={styles.drawerList}>
        <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userAvatar: {
    height: 100,
    width: 100,
    borderRadius: 100,
    marginTop: '40%',
    resizeMode: 'cover'
  },
  drawerList: {
    flex: 1, 
    paddingTop: 10,
  }
});
