import React from 'react';

import { createDrawerNavigator } from "@react-navigation/drawer";

import CustomDrawer from '../CustomDrawer'

import NavTab from '../stacks/Tabs'
import { ProfileNavigator } from './Stacks';
import Profile from '../Profile'

const Drawer = createDrawerNavigator();

export default function DrawerNavigator(){
    return(
        
        <Drawer.Navigator
            drawerContent={props => <CustomDrawer {...props}/>}
            screenOptions={{
                headerShown: false,
                drawerActiveBackgroundColor: "#490061",
                drawerActiveTintColor: "#fff",
                drawerInactivateTintColor: "#333",
                drawerLabelStyle:{
                    fontSize: 15,
                }
            }}
        >
            <Drawer.Screen
                name="Expenses management"
                component={NavTab}
            />

            <Drawer.Screen
                name="Profile"
                component={ProfileNavigator}
            />
        </Drawer.Navigator>
        
    )
}