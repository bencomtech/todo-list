import React from 'react'
import styled from 'styled-components'
import { Layout } from 'antd'

import NewTodo from '../containers/newTodo'
import Todos from '../containers/todos'

const MyContent = styled(Layout.Content)`
  background-color: #fff;
  padding: 24px;
  margin: 0;
  & > * {
    margin-bottom: 12px;
  }
`

const App = () => (
  <Layout>
    <MyContent>
      <NewTodo />
      <Todos />
    </MyContent>
  </Layout>
)

export default App
