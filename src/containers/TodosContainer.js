import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firebaseConnect, isLoaded } from 'react-redux-firebase'
import { Spin, Modal, message } from 'antd'
import SpinContainer from '../components/SpinContainer'
import TodoList from '../components/TodoList'
import * as MESSAGE from '../constants/messages'

class TodosContainer extends Component {
  handleRemoveButtonClick = (key) => {
    Modal.confirm({
      title: MESSAGE.CONFIRM_TITLE,
      content: MESSAGE.CONFIRM_CONTENT,
      okText: MESSAGE.CONFIRM_OK,
      cancelText: MESSAGE.CONFIRM_CANCEL,
      onOk() {
        return this.props.firebase.remove(`/todos/${key}`).then(() => {
          message.success(MESSAGE.REMOVE_SUCCESS)
        }).catch(error => {
          message.error(`${MESSAGE.REMOVE_ERROR} (${error.message})`)
        })
      }
    })
  }

  handleSwitchChange = (key, checked) => {
    this.props.firebase.update(`/todos/${key}`, { done: checked }).then(() => {
      message.success(MESSAGE.UPDATE_SUCCESS)
    }).catch(error => {
      message.error(`${MESSAGE.UPDATE_ERROR} (${error.message})`)
    })
  }

  render() {
    const { todos } = this.props

    if (!isLoaded(todos)) {
      return (
        <SpinContainer>
          <Spin />
        </SpinContainer>
      )
    }

    return <TodoList
      todos={todos}
      handleSwitchChange={this.handleSwitchChange}
      handleRemoveButtonClick={this.handleRemoveButtonClick}
    />
  }
}

function mapStateToProps({ firebase }) {
  return {
    todos: firebase.ordered.todos
  }
}

const enhance = compose(firebaseConnect([
  { path: '/todos', queryParams: ['orderByChild=timestamp'] }
]), connect(mapStateToProps))

export default enhance(TodosContainer)
