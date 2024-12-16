/**
 * @format
 */

import {AppRegistry, LogBox, Platform} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import 'reflect-metadata';

LogBox.ignoreAllLogs(true);

AppRegistry.registerComponent(appName, () => App);
