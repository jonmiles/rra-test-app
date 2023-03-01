import React, {useEffect} from 'react';
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import {AppBar, IconButton} from '@react-native-material/core';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {FlatList} from 'react-native-gesture-handler';
import {useAuth0} from 'react-native-auth0';
import {NavigationProp, useNavigation} from '@react-navigation/native';

import FAB from '../components/Fab';
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
  const navigation = useNavigation<NavigationProp<any>>();
  const insets = useSafeAreaInsets();

  const {clearCredentials, clearSession} = useAuth0();

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
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <View style={{...styles.inner, paddingTop: insets.top}}>
        <AppBar
          title="Todos"
          trailing={() => (
            <IconButton
              color="background"
              icon={props => <Icon name="logout" {...props} />}
              onPress={async () => {
                await clearCredentials;
                await clearSession();
                navigation.navigate('Login');
              }}
            />
          )}
        />
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
        <View style={styles.buttons}>
          <FAB
            icon={props => <Icon name="add" selectable={false} {...props} />}
            style={styles.addButton}
            onPress={handleAdd}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  inner: {
    flex: 1,
  },
  buttons: {
    position: 'absolute',
    bottom: 20,
    width: Dimensions.get('screen').width,
    alignItems: 'center',
    zIndex: 1,
  },
  addButton: {
    width: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    paddingBottom: 40,
    zIndex: 0,
  },
});
