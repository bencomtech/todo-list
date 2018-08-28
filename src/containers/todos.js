import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import { Spin, List, Switch, Button, Icon, Modal, message } from 'antd'
import styled from 'styled-components'

const { confirm } = Modal;

const SpinContainer = styled.div`
  text-align: center;
`

class Todos extends Component {
  handleRemoveButtonClick = (key) => {
    const { firebase } = this.props

    confirm({
      title: 'ยืนยันการลบรายการงาน',
      content: `คุณต้องการลบรายการงานใช่หรือไม่ ?`,
      okText: 'ลบ',
      cancelText: 'ยกเลิก',
      onOk() {
        return firebase.remove(`/todos/${key}`).then(() => {
          message.success("ลบรายการงานเรียบร้อย")
        }).catch(error => {
          message.error(`ไม่สามารถลบรายการงาน (${error.message})`)
        })
      }
    })
  }

  handleSwitchChange = (key, checked) => {
    const { firebase } = this.props

    firebase.update(`/todos/${key}`, { done: checked }).then(() => {
      message.success("อัพเดทรายการงานเรียบร้อย")
    }).catch(error => {
      message.error(`ไม่สามารถอัพเดทรายการงาน (${error.message})`)
    })
  }

  renderList(todos) {
    return todos.map(({ key, value }) => {
      return (
        <List.Item
          key={key}
          actions={[
            <Switch checked={value.done} onChange={checked => this.handleSwitchChange(key, checked)} />,
            <Button onClick={() => this.handleRemoveButtonClick(key)} type="danger" shape="circle" icon="delete" />
          ]}
        >
          <List.Item.Meta
            title={(
              value.done ? <del>{value.content}</del> : value.content
            )}
            description={(
              <small><Icon type="clock-circle-o" /> {new Date(value.timestamp).toUTCString()}</small>
            )}
          />
        </List.Item>
      )
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

    return (
      <List
        size='small'
        bordered
      >
        {!isEmpty(todos) ? this.renderList(todos) : null}
      </List>
    )
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

export default enhance(Todos)
