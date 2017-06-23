import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

import TodoItem from './TodoItem';
import * as TodoActions from '../actions/TodoActions';
import { getVisibleTodos } from '../selectors/todo-selector';

class ToDoList extends Component {
  constructor( props ) {
    super( props );
    this.onTodoClick = this.onTodoClick.bind( this );
    this.onTodoDelete = this.onTodoDelete.bind( this );
  }
  render() {
    return (
      <ul className='todo__list'>
        {this.renderListItems()}
      </ul>
    );
  }

  renderListItems() {
    if ( undefined !== this.props.todos && this.props.todos.length !== 0 ) {
      return _.map( this.props.todos, ( todo, index ) =>
        ( <TodoItem
          completed={ todo.completed }
          text={ todo.text }
          key={ index }
          todoId={ todo.id }
          onTodoClick={ () => this.onTodoClick( todo.id ) }
          onTodoEdit={ this.props.onTodoEdit }
          onTodoDelete={ () => this.onTodoDelete( todo.id ) }
        /> )
      );
    }
  }

  onTodoClick( id ) {
    this.props.onTodoClick( id );
  }

  onTodoDelete( id ) {
    this.props.onTodoDelete( id );
  }

  shouldComponentUpdate() {
    return true;
  }
}

function mapStateToProps( state ) {
  return {
    todos: getVisibleTodos( state )
  };
}

function mapDispatchToProps( dispatch ) {
  return {
    onTodoClick: bindActionCreators( TodoActions.todoClick, dispatch ),
    onTodoDelete: bindActionCreators( TodoActions.todoDelete, dispatch ),
    onTodoEdit: bindActionCreators( TodoActions.todoEdit, dispatch )
  };
}

ToDoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape( {
      id: PropTypes.number.isRequired,
      completed: PropTypes.bool.isRequired,
      text: PropTypes.string.isRequired
    } ).isRequired
  ).isRequired,
  onTodoClick: PropTypes.func.isRequired
};

export default connect( mapStateToProps, mapDispatchToProps )( ToDoList );
