import React from 'react'
import { List, Switch, Button, Icon } from 'antd'

const TodoListItem = ({ todo, handleSwitchChange, handleRemoveButtonClick }) => {
  const { key, value } = todo
  
  return (
    <List.Item
      key={key}
      actions={[
        <Switch checked={value.done} onChange={checked => handleSwitchChange(key, checked)} />,
        <Button onClick={() => handleRemoveButtonClick(key)} type="danger" shape="circle" icon="delete" />
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
}

export default TodoListItem
