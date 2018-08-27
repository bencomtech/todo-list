import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'

class Todos extends Component {
  handleRemoveItem = (key) => {
    const { firebase } = this.props

    firebase.remove(`/todos/${key}`).then(() => {
      alert("ลบรายการงานเรียบร้อย")
    }).catch(error => {
      alert(`ไม่สามารถลบรายการงาน (${error.message})`)
    })
  }

  handleItemClick = (key, value) => {
    const { firebase } = this.props

    firebase.update(`/todos/${key}`, { done: !value.done }).then(() => {
      alert("อัพเดทรายการงานเรียบร้อย")
    }).catch(error => {
      alert(`ไม่สามารถอัพเดทรายการงาน (${error.message})`)
    })
  }

  renderList(todos) {
    return todos.map(({ key, value }) => {
      return (
        <li key={key}>
          <button onClick={() => this.handleRemoveItem(key)}>ลบ</button> | <span onClick={() => this.handleItemClick(key, value)}>{value.done ? (<del>{value.content}</del>) : value.content}</span>
        </li>
      )
    })
  }

  render() {
    const { todos } = this.props

    if (!isLoaded(todos)) {
      return 'กำลังโหลด...'
    }

    if (isEmpty(todos)) {
      return 'รายการงานว่าง'
    }

    return (
      <ul>
        {this.renderList(todos)}
      </ul>
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
