import React from 'react';
import {View, FlatList, StyleSheet, Text, Alert} from 'react-native';
import {Button, Icon, ListItem} from '@rneui/themed';
import {TodoDto} from '@/model/services/todo/type';

interface TodolistProps {
  data: TodoDto[];
  onEdit: (index: TodoDto) => void;
  onDelete: (index: TodoDto) => void;
  onClick: (index: TodoDto) => void;
}

const Todolist = ({data, onEdit, onDelete, onClick}: TodolistProps) => {
  const renderTodoItem = ({item}: {item: TodoDto; index: number}) => (
    <ListItem
      bottomDivider
      containerStyle={[
        styles.listItem,
        item.isCompleted && styles.completedItem,
      ]}
      onPress={() => {
        onClick(item);
      }}>
      <ListItem.Content>
        <ListItem.Title style={item.isCompleted && styles.completedText}>
          {item.title}
        </ListItem.Title>
        <ListItem.Title
          style={[
            styles.description,
            item.isCompleted && styles.completedDescription,
          ]}>
          {item.description}
        </ListItem.Title>
      </ListItem.Content>
      <View style={styles.actionButtons}>
        <Button
          type="clear"
          onPress={() => onEdit(item)}
          disabled={item.isCompleted} // Disable button if completed
          icon={
            <Icon name="edit" color={item.isCompleted ? '#ccc' : '#517fa4'} />
          }
        />
        <Button
          type="clear"
          onPress={() => {
            Alert.alert('Todoyu Sil', 'Emin misiniz?', [
              {
                text: 'Cancel',
                style: 'cancel',
              },
              {
                text: 'OK',
                onPress: () => onDelete(item),
              },
            ]);
          }}
          icon={<Icon name="delete" color={'red'} />}
        />
      </View>
    </ListItem>
  );

  return (
    <FlatList
      data={data}
      renderItem={renderTodoItem}
      keyExtractor={(_, index) => index.toString()}
    />
  );
};

const styles = StyleSheet.create({
  listItem: {
    borderWidth: 2,
    borderBottomWidth: 2,
    borderColor: '#ddd',
    borderRadius: 8,
    marginVertical: 8,
  },
  completedItem: {
    borderColor: '#52c41a',
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  completedDescription: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  description: {
    color: '#666',
    fontSize: 14,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});

export default Todolist;
