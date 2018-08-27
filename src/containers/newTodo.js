import React, { Component } from 'react'
import { withFirebase } from 'react-redux-firebase'

class NewTodo extends Component {
  constructor(props) {
    super(props)

    this.state = { content: '' }
  }

  handleChange = (event) => {
    this.setState({ content: event.target.value })
  }

  handleKeyPress = (event) => {
    const { firebase } = this.props
    const { content } = this.state

    if (event.key === 'Enter') {
      firebase.push('/todos', {
        content: content,
        done: false,
        timestamp: firebase.database.ServerValue.TIMESTAMP
      }).then(() => {
        alert("เพิ่มรายการงานเรียบร้อย")
        this.setState({ content: '' })
      }).catch(error => {
        alert(`ไม่สามารถเพิ่มรายการงาน (${error.message})`)
      })
    }
  }

  render() {
    return (
      <div>
        <input
          type='text'
          onChange={this.handleChange}
          onKeyPress={this.handleKeyPress}
          value={this.state.content}
          autoFocus
        />
      </div>
    )
  }
}

export default withFirebase(NewTodo)
