import _ from 'lodash';

import { constants } from './modules/index';

const actions = constants.actions;

const initialState = {
  visibilityFilter: constants.SHOW_ALL,
  todos: []
};

function onToggleTodo( state = {}, action ) {
  if ( state.id !== action.id ) {
    return state;
  }

  return Object.assign( {}, state, {
    completed: !state.completed
  } );
}

function onEditTodo( state = {}, action ) {
  if ( state.id !== action.id ) {
    return state;
  }

  return Object.assign( {}, state, {
    text: action.text
  } );
}

export default function toDoReducer( state = initialState, action ) {
  const newState = _.assign( {}, state );
  switch ( action.type ) {
    case actions.ADD_TODO:
      newState.todos = [
        ...newState.todos,
        {
          id: action.id,
          text: action.text,
          completed: false
        }
      ];
      return newState;
    case actions.TOGGLE_TODO:
      newState.todos = _.map( newState.todos, t => onToggleTodo( t, action ) );
      return newState;
    case actions.SET_INITIAL_TODO:
      newState.todos = action.todos;
      return newState;
    case actions.CHANGE_VISIBILITY_FILTER:
      newState.visibilityFilter = action.visibilityFilter;
      return newState;
    case actions.DELETE_TODO:
      newState.todos = _.filter( newState.todos, todo => todo.id !== action.id );
      return newState;
    case actions.EDIT_TODO:
      newState.todos = _.map( newState.todos, t => onEditTodo( t, action ) );
      return newState;
    default:
      return newState;
  }
}
