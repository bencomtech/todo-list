import React from 'react'
import { Form, Input, Icon } from 'antd'

const NewTodo = ({ form, onSubmit }) => (
  <Form onSubmit={onSubmit}>
    <Form.Item>
      {form.getFieldDecorator('content', {
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

export default NewTodo
