import React, { Component } from 'react'
import { withFirebase } from 'react-redux-firebase'
import { Form, message } from 'antd'
import NewTodo from '../components/NewTodo'
import * as MESSAGE from '../constants/messages'

class NewTodoContainer extends Component {
  handleSubmit = (event) => {
    event.preventDefault()

    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.firebase.push('/todos', {
          content: values.content,
          done: false,
          timestamp: this.props.firebase.database.ServerValue.TIMESTAMP
        }).then(() => {
          message.success(MESSAGE.PUSH_SUCCESS)
          this.props.form.setFieldsValue({ content: '' })
        }).catch(error => {
          message.error(`${MESSAGE.PUSH_ERROR} (${error.message})`)
        })
      }
    })
  }

  render() {
    return <NewTodo form={this.props.form} onSubmit={this.handleSubmit} />
  }
}

export default Form.create()(withFirebase(NewTodoContainer))
