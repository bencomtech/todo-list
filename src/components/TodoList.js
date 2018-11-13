import React from 'react'
import { isEmpty } from 'react-redux-firebase'
import { List } from 'antd'
import TodoListItem from '../components/TodoListItem'

const TodoList = ({ todos, handleSwitchChange, handleRemoveButtonClick }) => {
  const renderList = (todos) => {
    return todos.map((todo) => (
      <TodoListItem 
        todo={todo} 
        handleSwitchChange={handleSwitchChange} 
        handleRemoveButtonClick={handleRemoveButtonClick} 
      />
      )
    )
  }

  return (
    <List size='small' bordered>
      {!isEmpty(todos) ? renderList(todos) : null}
    </List>
  )
}

export default TodoList
