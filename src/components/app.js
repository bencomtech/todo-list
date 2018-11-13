import React from 'react'
import Layout from './Layout'
import NewTodoContainer from '../containers/NewTodoContainer'
import TodosContainer from '../containers/TodosContainer'

const App = () => (
  <Layout>
    <NewTodoContainer />
    <TodosContainer />
  </Layout>
)

export default App
