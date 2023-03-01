import React, {useEffect} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {AppBar} from '@react-native-material/core';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import FAB from '../components/Fab';
import {FlatList} from 'react-native-gesture-handler';
import {TodoItem} from '../components/TodoItem';
import {getTodos} from '../redux/todos/selectors';
import {
  addTodo,
  deleteTodo,
  fetchTodos,
  updateTodo,
} from '../redux/todos/actions';
import {useAppDispatch, useAppSelector} from '../redux/store';
import {Todo} from '../types';

export function Todos(): JSX.Element {
  const insets = useSafeAreaInsets();

  const todos = useAppSelector(getTodos);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleAdd = () => {
    dispatch(addTodo({label: ''}));
  };

  const handleUpdate = (todo: Todo) => {
    dispatch(updateTodo(todo));
  };

  const handleDelete = (id: number) => {
    dispatch(deleteTodo({id}));
  };

  return (
    <View style={{...styles.container, paddingTop: insets.top}}>
      <AppBar title="Todos">
        <FAB
          icon={props => <Icon name="add" selectable={false} {...props} />}
          style={styles.button}
          onPress={handleAdd}
        />
      </AppBar>
      <FlatList
        style={styles.list}
        data={todos}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TodoItem
            item={item}
            onChange={handleUpdate}
            onDelete={handleDelete}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height,
  },
  button: {
    position: 'absolute',
    top: 20,
    right: 40,
  },
  list: {
    paddingVertical: 40,
  },
});
