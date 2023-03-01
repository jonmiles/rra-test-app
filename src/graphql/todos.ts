import gql from 'graphql-tag';

export const GET_TODOS = gql`
  query getTodos {
    todos {
      id
      label
      complete
    }
  }
`;

export const ADD_TODO = gql`
  mutation addTodo($label: String) {
    createTodo(label: $label) {
      id
      label
      complete
    }
  }
`;

export const UPDATE_TODO = gql`
  mutation updateTodo($id: Int!, $label: String, $complete: Boolean) {
    updateTodo(id: $id, label: $label, complete: $complete) {
      id
      label
      complete
    }
  }
`;

export const DELETE_TODO = gql`
  mutation deleteTodo($id: Int!) {
    deleteTodo(id: $id) {
      id
    }
  }
`;
