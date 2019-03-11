/* eslint-disable max-len */

import React from 'react'
import { Container } from 'semantic-ui-react'

const ContainerExampleContainer = (props) => (
  <Container text fluid>
      {props.children}
  </Container>
)

export default ContainerExampleContainer