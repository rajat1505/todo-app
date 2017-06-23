import { constants } from '../modules/index';

function addToDo( textValue ) {
  return {
    type: constants.actions.ADD_TODO_NEW,
    text: textValue
  };
}

function todoClick( todoId ) {
  return {
    type: constants.actions.TOGGLE_TODO,
    id: todoId
  };
}

function setInitialData() {
  return {
    type: constants.actions.SET_INITIAL_TODOS
  };
}

function onFilterChange( filter ) {
  return {
    type: constants.actions.CHANGE_VISIBILITY_FILTER,
    visibilityFilter: filter
  };
}

function todoDelete( id ) {
  return {
    type: constants.actions.DELETE_TODO,
    id
  };
}

function todoEdit( id, text ) {
  return {
    type: constants.actions.EDIT_TODO,
    id,
    text
  };
}

export { addToDo, todoClick, setInitialData, onFilterChange, todoDelete, todoEdit };
