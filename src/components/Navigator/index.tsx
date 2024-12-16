import {RouteNames, StackParamList} from '../../const/routesNames';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import TodoScreen from '../../screen/Todo';
import TodoScreenDetail from '../../screen/TodoDetail';

const Stack = createNativeStackNavigator<StackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        key={RouteNames.TodoList}
        name={RouteNames.TodoList}
        component={TodoScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        key={RouteNames.TodoListDetial}
        name={RouteNames.TodoListDetial}
        component={TodoScreenDetail}
        options={{
          headerShown: false,
          title: 'Todo Detail 11',
        }}
      />
    </Stack.Navigator>
  );
}
