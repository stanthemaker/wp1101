import * as React from 'react'
import Box from '@mui/material/Box'
import Input from '@mui/material/Input'
import Stack from '@mui/material/Stack'
import styled from 'styled-components'
import { useState } from 'react'

const SmallCaption_up = styled.section`
  font-size: 1em;
  font-family: 'Times New Roman';
  color: black;
  opacity: 0.8;
`
const example = '*if your model is PE+RoE>5,please enter P+R>5 instead'

export default function ModelList() {
  const [funct, setFunct] = useState('')
  const addFunct = (e) => {
    if (e.key === 'Enter') {
      setFunct(e.target.value)
      // e.target.value = ''
    }
  }
  return (
    <Box component="form" noValidate sx={{ mt: 1 }}>
      <Stack spacing={2} direction="column">
        <SmallCaption_up>{example}</SmallCaption_up>
        <Stack spacing={3} direction="row">
          <Input
            required
            fullWidth
            id="function"
            label="My function"
            placeholder="enter your model"
            autoComplete="function"
            autoFocus
            onKeyPress={addFunct}
          />
          {/* <Button variant="contained" disableElevation>
            Submit
          </Button> */}
        </Stack>
        <SmallCaption_up>your model :</SmallCaption_up>
        <SmallCaption_up>{funct}</SmallCaption_up>
      </Stack>
    </Box>
  )
}
