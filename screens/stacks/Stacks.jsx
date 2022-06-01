import React from 'react';

import { createStackNavigator } from '@react-navigation/stack'

import Home from '../Home'
import BuildDetails from '../BuildDetails'
import EditBuildDetails from '../EditBuildDetails'
import ExpensesDetails from '../ExpenseDetails';
import EditExpense from '../ExpenseEditar';
import AddExpense from '../ExpenseAdd'

import AddBuild from '../AddBuild'

const Stack = createStackNavigator()

const MainStackNavigator = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen name="Home Screen" component={Home} options={{headerShown:false}}/>
            <Stack.Screen name="Build Details" component={BuildDetails} options={{headerShown:false}}/>
            <Stack.Screen name="Edit Build" component={EditBuildDetails} options={{headerShown:false}}/>
            <Stack.Screen name="Expenses Details" component={ExpensesDetails} options={{headerShown:false}}/>
            <Stack.Screen name="Expenses Edit" component={EditExpense} options={{headerShown:false}}/>
            <Stack.Screen name="Expenses Add" component={AddExpense} options={{headerShown:false}}/> 
        </Stack.Navigator>
    )
}

const AddStackNavigator = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen name="Add Build" component={AddBuild} options={{headerShown:false}}/>
        </Stack.Navigator>
    )
}

export { MainStackNavigator , AddStackNavigator }