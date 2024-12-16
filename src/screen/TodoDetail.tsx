import CreateOrUpdateTodoDetail from '@/components/CreateTodoDetail';
import {RouteNames, StackParamList} from '@/const/routesNames';
import {
  useGetTodoDetails,
  usePutTodoDetail,
} from '@/hooks/queries/todoDetailsQuery';
import {useNavigation} from '@/hooks/useNavigation';
import {
  PutTodoDetailParams,
  TodoDetailDto,
} from '@/model/services/todoDetails.ts/type';
import {useRoute} from '@react-navigation/native';
import {Button, Icon, Text} from '@rneui/themed';
import React, {useEffect} from 'react';
import {View, StyleSheet, FlatList, TouchableOpacity} from 'react-native';

const TodoDetailScreen = () => {
  const route = useRoute();

  const [isShowAddModal, setIsShowAddModal] = React.useState(false);

  const navigation = useNavigation();
  const {title, id} = route.params as StackParamList[RouteNames.TodoListDetial];

  useEffect(() => {
    navigation.setOptions({title: 'Todo Detail 1'});
  }, [navigation]);

  const {data, refetch} = useGetTodoDetails({
    params: {id},
  });

  const {mutate: putTodoDetail} = usePutTodoDetail({
    onSuccess: () => {
      refetch();
    },
  });

  const renderTodoDetail = ({item}: {item: TodoDetailDto}) => {
    return (
      <TouchableOpacity
        onLongPress={() => {
          putTodoDetail({
            isCompleted: !item.isCompleted,
            todoDetail: {
              id: item.id,
            },
          } as PutTodoDetailParams);
        }}
        style={[
          styles.card,
          {borderColor: item.isCompleted ? '#439946' : '#439ce0'},
        ]}>
        <Text
          style={[
            styles.cardText,
            {color: item.isCompleted ? '#439946' : '#439ce0'},
          ]}>
          {item.detail}
        </Text>
      </TouchableOpacity>
    );
  };

  const handleToggleAddModal = () => {
    setIsShowAddModal(!isShowAddModal);
  };

  return (
    <View style={styles.container}>
      <CreateOrUpdateTodoDetail
        initialValues={null}
        refetch={refetch}
        showAddModal={isShowAddModal}
        todo={{
          id,
        }}
        setShowAddModal={handleToggleAddModal}
      />
      <View style={styles.addContainer}>
        <Text h1>{title}</Text>
        <Button radius={'sm'} type="outline" onPress={handleToggleAddModal}>
          <Icon name="add" color="#2089dc" />
        </Button>
      </View>

      <FlatList
        data={data || []}
        keyExtractor={item => item.id.toString()}
        renderItem={renderTodoDetail}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
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
  addContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  listContainer: {
    paddingHorizontal: 10,
  },
  card: {
    width: 120,
    height: 100,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    padding: 10,
    borderWidth: 2,
  },
  cardText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default TodoDetailScreen;
