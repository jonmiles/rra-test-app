import React, {useState} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {IconButton} from '@react-native-material/core';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {Todo} from '../types';
import {Checkbox} from './Checkbox';

export interface TodoItemProps {
  item: Todo;
  onChange: (item: Todo) => void;
  onDelete: (id: number) => void;
}

export function TodoItem({
  item,
  onChange,
  onDelete,
}: TodoItemProps): JSX.Element {
  const [label, setLabel] = useState(item.label);
  const [complete, setComplete] = useState(item.complete);

  return (
    <View key={item.id} style={styles.container}>
      <View style={styles.item}>
        <Checkbox
          value={complete}
          onChange={(value: boolean) => {
            setComplete(value);
            if (value !== complete) {
              onChange({...item, complete: value});
            }
          }}
        />
        <TextInput
          autoFocus={!item.label}
          value={label}
          style={styles.input}
          onChangeText={text => {
            setLabel(text);
          }}
          onEndEditing={event => {
            if (event.nativeEvent.text !== item.label) {
              onChange({...item, label: event.nativeEvent.text});
            }
          }}
        />
      </View>
      <IconButton
        icon={props => <Icon name="delete" {...props} />}
        onPress={() => {
          onDelete(item.id);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  item: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 16,
    border: 'none',
  },
  input: {
    flex: 1,
  },
});
