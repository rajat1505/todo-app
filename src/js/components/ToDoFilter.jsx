import React, { Component } from 'react';

import FilterLink from './FilterLink';

class ToDoFilter extends Component {
  constructor( props ) {
    super( props );
  }
  render() {
    return (
      <ul className='todo__filter'>
        <li className='todo__filter__list'>
          <FilterLink filter='SHOW_ALL'> View All </FilterLink>
        </li>
        <li className='todo__filter__list'>
          <FilterLink filter='SHOW_ACTIVE'> Active </FilterLink>
        </li>
        <li className='todo__filter__list'>
          <FilterLink filter='SHOW_COMPLETED'> Completed </FilterLink>
        </li>
      </ul>
    );
  }
}

export default ToDoFilter;
