import {RouteNames} from '@/const/routesNames';
import {useNavigation} from '../hooks/useNavigation';
import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Button, Icon, Text} from '@rneui/themed';
import {useDeleteTodo, useGetTodos} from '@/hooks/queries/todoQuery';
import {TodoDto} from '@/model/services/todo/type';
import Todolist from '@/components/TodoList';
import CreateOrUpdateTodo from '@/components/CreateOrUpdateTodo';
import {useIsFocused} from '@react-navigation/native';
const TodoScreen = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [isCreateOrUpdate, setIsCreateOrUpdate] = useState<TodoDto | null>(
    null,
  );

  const handleCloseModal = () => {
    setIsCreateOrUpdate(null);
  };

  const {data, refetch} = useGetTodos();

  useEffect(() => {
    if (isFocused) {
      refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

  const {mutate: deleteTodo} = useDeleteTodo({
    onSuccess: () => {
      refetch();
    },
  });

  return (
    <View style={styles.container}>
      <CreateOrUpdateTodo
        initialValues={isCreateOrUpdate}
        refetch={refetch}
        showAddModal={!!isCreateOrUpdate}
        setShowAddModal={handleCloseModal}
      />
      <View style={styles.addContainer}>
        <Text h1>Todos</Text>
        <Button
          radius={'sm'}
          type="outline"
          onPress={() => {
            setIsCreateOrUpdate({
              title: '',
              description: '',
              isCompleted: false,
              id: '',
            } as TodoDto);
          }}>
          <Icon name="add" color="#2089dc" />
        </Button>
      </View>

      <Todolist
        data={data || []}
        onClick={(e: TodoDto) => {
          navigation.navigate(RouteNames.TodoListDetial, e);
        }}
        onEdit={(e: TodoDto) => {
          setIsCreateOrUpdate(e);
        }}
        onDelete={(e: TodoDto) => {
          deleteTodo(e);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  task: {
    fontSize: 18,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  addContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
});

export default TodoScreen;
