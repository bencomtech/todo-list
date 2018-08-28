import React, { Component } from 'react'
import { withFirebase } from 'react-redux-firebase'
import { Form, Input, Icon } from 'antd'

class NewTodo extends Component {
  handleSubmit = (event) => {
    event.preventDefault()

    const { firebase, form } = this.props

    form.validateFields((err, values) => {
      if (!err) {
        firebase.push('/todos', {
          content: values.content,
          done: false,
          timestamp: firebase.database.ServerValue.TIMESTAMP
        }).then(() => {
          alert("เพิ่มรายการงานเรียบร้อย")
          this.setState({ content: '' })
        }).catch(error => {
          alert(`ไม่สามารถเพิ่มรายการงาน (${error.message})`)
        })
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form

    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item>
          {getFieldDecorator('content', {
            rules: [{ required: true, message: 'กรุณากรอกชื่อรายการงาน!' }],
          })(
            <Input
              prefix={<Icon type="plus" />}
              placeholder="เพิ่มรายการงาน"
            />
          )}
        </Form.Item>
      </Form>
    )
  }
}

export default Form.create()(withFirebase(NewTodo))
