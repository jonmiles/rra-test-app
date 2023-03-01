import 'react-native';
import React from 'react';

// Note: test renderer must be required after react-native.
import renderer, {act} from 'react-test-renderer';

import {TodoItem, TodoItemProps} from '../TodoItem';
import {Checkbox} from '../Checkbox';
import {TextInput} from 'react-native';
import {IconButton} from '@react-native-material/core';

jest.mock('react-native-vector-icons/MaterialIcons', () => 'Icon');

describe('TodoItem', () => {
  const mockOnChangeHandler = jest.fn();
  const mockOnDeleteHandler = jest.fn();

  let testRenderer: renderer.ReactTestRenderer;
  let testInstance: renderer.ReactTestInstance;

  const TodoItemTestWrapper = (props: Partial<TodoItemProps>) => {
    return (
      <TodoItem
        item={{id: 1, label: 'a task', complete: false}}
        onChange={mockOnChangeHandler}
        onDelete={mockOnDeleteHandler}
        {...props}
      />
    );
  };

  beforeEach(() => {
    testRenderer = renderer.create(<TodoItemTestWrapper />);
    testInstance = testRenderer.root;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    expect(testInstance.findByType(Checkbox).props.value).toEqual(false);
    expect(testInstance.findByType(TextInput).props.value).toEqual('a task');
    expect(testInstance.findByType(TextInput).props.autoFocus).toEqual(false);
    expect(testInstance.findByType(IconButton)).toBeDefined();
  });

  it('renders with autofocus on text input when task label empty', () => {
    act(() => {
      testRenderer.update(
        <TodoItemTestWrapper item={{id: 1, label: '', complete: true}} />,
      );
    });

    expect(testInstance.findByType(TextInput).props.autoFocus).toEqual(true);
  });

  it('handles check / uncheck task complete event', () => {
    act(() => {
      testInstance.findByType(Checkbox).props.onChange(true);
    });

    expect(mockOnChangeHandler).toHaveBeenNthCalledWith(1, {
      id: 1,
      label: 'a task',
      complete: true,
    });

    act(() => {
      testRenderer.update(
        <TodoItemTestWrapper item={{id: 1, label: 'a task', complete: true}} />,
      );
      testInstance.findByType(Checkbox).props.onChange(false);
    });

    expect(mockOnChangeHandler).toHaveBeenNthCalledWith(2, {
      id: 1,
      label: 'a task',
      complete: false,
    });
  });

  it('handles text input changes correctly', () => {
    act(() => {
      testInstance.findByType(TextInput).props.onChangeText('test');
      testInstance
        .findByType(TextInput)
        .props.onEndEditing({nativeEvent: {text: 'test'}});
    });

    expect(testInstance.findByType(TextInput).props.value).toEqual('test');
    expect(mockOnChangeHandler).toHaveBeenNthCalledWith(1, {
      id: 1,
      label: 'test',
      complete: false,
    });
  });

  it('handles delete button press event correctly', () => {
    act(() => {
      testInstance.findByType(IconButton).props.onPress();
    });

    expect(mockOnDeleteHandler).toHaveBeenNthCalledWith(1, 1);
  });
});
