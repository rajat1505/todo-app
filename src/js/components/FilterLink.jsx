import React, { Component } from 'react';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as TodoActions from '../actions/TodoActions';
import { getSelectedVisibilityFilter } from '../selectors/todo-selector';

class FilterLink extends Component {
  constructor( props ) {
    super( props );
    this.handleLinkClick = this.handleLinkClick.bind( this );
  }
  render() {
    const isSelected = this.props.filter === this.props.visibilityFilter;
    const selectedClass = isSelected ? 'todo__filter__link--selected' : '';
    return (
      <a
        className={ `todo__filter__link ${selectedClass}` }
        href='javascript:void(0)'
        onClick={ this.handleLinkClick }
      >
        {this.props.children}
      </a>
    );
  }

  handleLinkClick() {
    if ( this.props.visibilityFilter !== this.props.filter ) {
      this.props.onFilterChange( this.props.filter );
    }
  }
}

FilterLink.Proptypes = {
  children: Proptypes.string.isRequired
};

function mapStateToProps( state ) {
  return {
    visibilityFilter: getSelectedVisibilityFilter( state )
  };
}

function mapDispatchToProps( dispatch ) {
  return {
    onFilterChange: bindActionCreators( TodoActions.onFilterChange, dispatch )
  };
}

export default connect( mapStateToProps, mapDispatchToProps )( FilterLink );
