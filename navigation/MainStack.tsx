import 'react-native-gesture-handler';
import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createDrawerNavigator } from '@react-navigation/drawer';
// Components
import { Dashboard } from "../screens/Dashboard.screen";
import { FAQ } from "../screens/FAQ.screen";
import { Historic } from "../screens/Historic.screen";
import { Home } from "../screens/Home.screen";
import { MyPerformance } from "../screens/MyPerformance.screen";
import { Requests } from "../screens/Requests.screen";
import { Settings } from "../screens/Settings.screen";

import { CustomDrawer } from '../components/CustomDrawer'

import { Ionicons } from "@expo/vector-icons";
import { colors } from '../assets/colors'

import { AuthStack, AuthStackParams } from './AuthStack';

export type MainStackParams = {
  Home: {_id: string};
  Dashboard: undefined;
  FAQ: undefined;
  Historic: undefined;
  MyPerformance: undefined;
  Requests: undefined;
  Settings: undefined;
  Auth: AuthStackParams
};

const Drawer = createDrawerNavigator<MainStackParams>();

export const MainStack = () => {
  return (
    <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />} 
    screenOptions={{
      drawerLabelStyle: {marginLeft: -10, fontSize: 14},
      drawerActiveBackgroundColor: colors.white,
      drawerActiveTintColor: colors.red, 
      
    }} 
    
    initialRouteName="Auth">
      <Drawer.Screen name="Dashboard" component={Dashboard} options={{
        drawerIcon: ({color}) => (
          <Ionicons name="home-sharp" size={22} color={color}/> )
      }} />
      <Drawer.Screen name="FAQ" component={FAQ} options={{
        drawerIcon: ({color}) => (
          <Ionicons name="barcode-sharp" size={22} color={color}/> )
      }} /> 
      <Drawer.Screen name="Historic" component={Historic} options={{
        drawerIcon: ({color}) => (
          <Ionicons name="person-circle-sharp" size={22} color={color}/> )
      }} />
       
      <Drawer.Screen name="MyPerformance" component={MyPerformance} options={{
        drawerIcon: ({color}) => (
          <Ionicons name="person-circle-sharp" size={22} color={color}/> )
      }} />
      <Drawer.Screen name="Requests" component={Requests} options={{
        drawerIcon: ({color}) => (
          <Ionicons name="person-circle-sharp" size={22} color={color}/> )
      }} /> 
      <Drawer.Screen name="Settings" component={Settings} options={{
        drawerIcon: ({color}) => (
          <Ionicons name="settings-sharp" size={22} color={color}/> )
      }} /> 
      <Drawer.Screen name="Home" component={Home} options={{
        drawerIcon: ({color}) => (
          <Ionicons name="settings-sharp" size={22} color={color}/> )
      }} /> 
      <Drawer.Screen name="Auth" component={AuthStack} options={{
        drawerIcon: ({color}) => (
          <Ionicons name="settings-sharp" size={22} color={color}/> ), 
          headerShown: false
          
      }} /> 
    </Drawer.Navigator>
  );
};
