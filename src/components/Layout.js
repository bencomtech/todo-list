import React from 'react'
import styled from 'styled-components'
import { Layout as BaseLayout } from 'antd'

const MyContent = styled(BaseLayout.Content)`
  background-color: #fff;
  padding: 24px;
  margin: 0;
  & > * {
    margin-bottom: 12px;
  }
`

const Layout = ({ children }) => (
  <BaseLayout>
    <MyContent>{children}</MyContent>
  </BaseLayout>
)

export default Layout
