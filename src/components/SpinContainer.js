import React from 'react'
import styled from 'styled-components'

const Root = styled.div`
  text-align: center;
`

const SpinContainer = ({ children }) => (
  <Root>{ children }</Root>
)

export default SpinContainer
