import React from 'react'
import { Form, Input, Icon } from 'antd'
import * as MESSAGE from '../constants/messages'

const NewTodo = ({ form, onSubmit }) => (
  <Form onSubmit={onSubmit}>
    <Form.Item>
      {form.getFieldDecorator('content', {
        rules: [{ required: true, message: MESSAGE.FORM_CONTENT_MESSAGE }],
      })(
        <Input
          prefix={<Icon type="plus" />}
          placeholder={MESSAGE.INPUT_CONTENT_PLACEHOLDER}
        />
      )}
    </Form.Item>
  </Form>
)

export default NewTodo
