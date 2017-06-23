import { put, takeEvery } from 'redux-saga/effects';

import { constants, Utilities } from './modules/index';
import * as TodoActions from './actions/TodoActions';

const actions = constants.actions;
const utilities = new Utilities();
const request = utilities.request;
let todoId = 0;

function* addTodo( action ) {
  yield put( { type: actions.ADD_TODO, text: action.text, id: todoId++ } );
}

export function* watchAddTodo() {
  yield takeEvery( actions.ADD_TODO_NEW, addTodo );
}

export function* getInitialData( action ) {
  let initialJson = {},
    todos = [];
  yield request( { url: 'src/services/todo-list.json' } )
    .then( ( response ) => {
      initialJson = response;
    } )
    .catch( error => console.log( error ) );

  todos = JSON.parse( initialJson ).todos;

  todoId = todos.length + 1;

  yield put( {
    type: actions.SET_INITIAL_TODO,
    todos,
    visibilityFilter: initialJson.visibilityFilter
  } );
}

export function* setInitialData() {
  yield takeEvery( actions.SET_INITIAL_TODOS, getInitialData );
}

// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield [ watchAddTodo(), setInitialData() ];
}
