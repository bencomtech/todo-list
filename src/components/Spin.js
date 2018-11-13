import React from 'react'
import styled from 'styled-components'
import { Spin as BaseSpin } from 'antd'

const SpinContainer = styled.div`
  text-align: center;
`

const Spin = () => (
  <SpinContainer>
    <BaseSpin />
  </SpinContainer>
)

export default Spin
