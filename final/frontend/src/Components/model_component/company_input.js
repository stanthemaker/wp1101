import * as React from 'react'
import Box from '@mui/material/Box'
import Input from '@mui/material/Input'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import styled from 'styled-components'
import { useState } from 'react'

const SmallCaption_up = styled.section`
  font-size: 1em;
  font-family: 'Times New Roman';
  color: black;
  opacity: 0.8;
`
let last = 0

const example = '*please seperate each company name with space key'
let submit = false
export default function Analysis() {
  const [company, setCompany] = useState([])

  const addCompany = (e) => {
    if (e.key === 'Enter') {
      setCompany([...company, { id: last, content: e.target.value }])
      // e.target.value = ''
      submit = true
      e.preventDefault()
    }
  }
  return (
    <Box component="form" noValidate sx={{ mt: 1 }}>
      <Stack spacing={2} direction="column">
        <Stack spacing={3} direction="row">
          <Input
            required
            fullWidth
            id="function"
            label="My function"
            placeholder="enter company abbreviation"
            autoComplete="function"
            autoFocus
            onKeyPress={addCompany}
          />
          {/* <Button variant="contained" disableElevation>
            Submit
          </Button> */}
        </Stack>
        <SmallCaption_up>company to be analysized :</SmallCaption_up>
        <Stack spacing={1}>
          {company.map((c) => (
            <SmallCaption_up id={c.id}>{c.content}</SmallCaption_up>
          ))}
        </Stack>
        <>
          {submit ? (
            <>
              <SmallCaption_up>company to be analysized :</SmallCaption_up>
              <Stack spacing={1}>
                {company.map((c) => (
                  <SmallCaption_up id={c.id}>{c.content}</SmallCaption_up>
                ))}
              </Stack>
              <Button variant="contained" disableElevation>
                Start
              </Button>
            </>
          ) : (
            <></>
          )}
        </>
      </Stack>
    </Box>
  )
}
