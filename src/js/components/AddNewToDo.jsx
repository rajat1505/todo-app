import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as TodoActions from '../actions/TodoActions';

class AddNewToDo extends Component {
  constructor( props ) {
    super( props );
    this.input = '';

    // This binding is necessary to make `this` work in the callback
    this.handleAddNewTodo = this.handleAddNewTodo.bind( this );
    this.getInput = this.getInput.bind( this );
  }

  handleAddNewTodo( event ) {
    event.preventDefault();
    const value = this.input.value;
    if ( value !== '' ) {
      this.props.onAddNewTodo( value );
      this.input.value = '';
    }
  }

  render() {
    return (
      <form action='#' className='todo__add-new' onSubmit={ this.handleAddNewTodo }>
        <input
          className='todo__add-new__input'
          ref={ this.getInput }
          placeholder='Enter the task...'
        />
        <input type='submit' value='Add To-Do' className='button todo__add-new__button' />
      </form>
    );
  }

  getInput( ref ) {
    this.input = ref;
  }
}

function mapStateToProps( state ) {
  return {};
}

function mapDispatchToProps( dispatch ) {
  return {
    onAddNewTodo: bindActionCreators( TodoActions.addToDo, dispatch )
  };
}

export default connect( mapStateToProps, mapDispatchToProps )( AddNewToDo );
