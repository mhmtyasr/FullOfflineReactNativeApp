import {DataSource} from 'typeorm';
import {Todo} from './entity/todo';
import {TodoDetail} from './entity/todoDetails';

const dataSource = new DataSource({
  database: 'tododb',
  type: 'react-native',
  name: new Date().valueOf().toString(),
  entities: [Todo, TodoDetail],
  synchronize: true,
  location: 'default',
  driver: require('react-native-sqlite-storage'),
  logging: ['error'],
});

export default dataSource;
