import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TodoItem extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      isEditing: false
    };
    this.handleItemEdit = this.handleItemEdit.bind( this );
    this.setListRef = this.setListRef.bind( this );
    this.getInput = this.getInput.bind( this );
    this.handleSubmitEditTodo = this.handleSubmitEditTodo.bind( this );
  }
  render() {
    const view = this.state.isEditing ? this.getEditingView() : this.getListItemView();
    return view;
  }

  getEditingView() {
    return (
      <li className='todo__item' ref={ this.setListRef }>
        <form action='#' className='todo__item__add-form' onSubmit={ this.handleSubmitEditTodo }>
          <input
            type='text'
            defaultValue={ this.props.text }
            className='todo__item__add-input'
            ref={ this.getInput }
          />
        </form>
      </li>
    );
  }

  getListItemView() {
    const completedClass = this.props.completed ? 'todo__item__text--completed' : '';
    return (
      <li className='todo__item'>
        <p className={ `todo__item__text ${completedClass}` } onClick={ this.props.onTodoClick }>
          {this.props.text}
        </p>
        <div className='todo__item__actions'>
          <button className='button todo__item__actions--edit' onClick={ this.handleItemEdit }>
            edit
          </button>
          <button className='button todo__item__actions--delete' onClick={ this.props.onTodoDelete }>
            delete
          </button>
        </div>
      </li>
    );
  }

  handleSubmitEditTodo( event ) {
    event.preventDefault();
    this.props.onTodoEdit( this.props.todoId, this.input.value );
    this.setState( { isEditing: false } );
  }

  handleItemEdit() {
    this.setState( { isEditing: true } );
  }
  setListRef( ref ) {
    this.listRef = ref;
  }
  getInput( ref ) {
    this.input = ref;
  }

  componentDidUpdate() {
    if ( this.state.isEditing ) {
      this.input.focus();
    }
  }
}

TodoItem.PropTypes = {
  text: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  onTodoClick: PropTypes.func.isRequired,
  onTodoDelete: PropTypes.func.isRequired,
  onTodoEdit: PropTypes.func.isRequired
};

export default TodoItem;
