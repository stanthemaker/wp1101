import * as React from 'react'
import Box from '@mui/material/Box'
import Model_List from './model_component/reference'
import Model_Function from './model_component/function'
import styled from 'styled-components'
import Card from './model_component/company_card'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Company from './model_component/company_input'
import { keyframes } from 'styled-components'

const Space = styled.section`
  height=20px;
  width=10px
`

const fly_in_down = keyframes`
 0% {transform: translateY(-10%); opacity:0;}
 100% {transform: translateY(0%); opacity:0.8;}

`

const SmallCaption_up = styled.section`
  font-size: 3em;
  font-family: 'Times New Roman';
  color: white;
  opacity: 0.8;
  animation-name: ${fly_in_down};
  animation-duration: 3s;
`

export default function Model() {
  return (
    <main>
      <Box
        sx={{
          width: `calc(98.7vw )`,
          bgcolor: 'background.paper',
          pt: 8,
          pb: 6,
          backgroundImage:
            'url(https://images.unsplash.com/photo-1639387438195-ca9325a04ba1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY0MTcyMjg3Nw&ixlib=rb-1.2.1&q=80&w=1080)',
        }}
      >
        <Container maxWidth="sm" align="center">
          <SmallCaption_up>Model Analysis</SmallCaption_up>
        </Container>
      </Box>
      <Box>
        <Stack spacing={5} direction="column" backgroundColor="#d9e6f2">
          <Space />
          <Stack spacing={10} direction="row" justifyContent="center">
            <Stack
              direction="row"
              justifyContent="center"
              spacing={3}
              backgroundColor="#d9e6f2"
            >
              <Space />
              <Model_List />
            </Stack>
            <Stack
              spacing={5}
              justifyContent="center"
              direction="row"
              backgroundColor="white"
            >
              <Space />
              <Stack direction="column" spacing={3}>
                <Space />
                <Model_Function />
                <Company />
              </Stack>
              <Space />
            </Stack>
            <Stack>
              <Space />
              <Card />
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </main>
  )
}
