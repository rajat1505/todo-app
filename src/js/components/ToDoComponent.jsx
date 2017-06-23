import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import AddNewToDo from './AddNewToDo';
import ToDoList from './ToDoList';
import ToDoFilter from './ToDoFilter';
import * as TodoActions from '../actions/TodoActions';

class ToDoComponent extends Component {
  render() {
    return (
      <div className='todo'>
        <AddNewToDo />
        <ToDoFilter />
        <ToDoList />
      </div>
    );
  }

  componentWillMount() {
    this.props.setInitialTodos();
  }
}

function mapStateToProps( state ) {
  return {};
}

function mapDispatchToProps( dispatch ) {
  return {
    setInitialTodos: bindActionCreators( TodoActions.setInitialData, dispatch )
  };
}

export default connect( mapStateToProps, mapDispatchToProps )( ToDoComponent );
