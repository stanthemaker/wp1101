<<<<<<< HEAD
import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import Stack from "@mui/material/Stack";
import styled from "styled-components";
import { useStock } from "../../context/useStock";
=======
import * as React from 'react'
import { useState } from 'react'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Input from '@mui/material/Input'
import Stack from '@mui/material/Stack'
import styled from 'styled-components'
import { useStock } from '../../context/useStock'
>>>>>>> d7ed841b6cbdd413e0c6efe771493409da175cd8

const SmallCaption_up = styled.section`
	font-size: 1em;
	font-family: "Times New Roman";
	color: black;
	opacity: 0.8;
`;
const example = "*if your model is PE+RoE>5,please enter P+R>5 instead";
let submit = false;
let last = 0;

export default function InputForm() {
  const [funct, setFunct] = useState('')
  const [company, setCompany] = useState([])
  const { addModels, runModel } = useStock()

  const addFunct = (e) => {
    if (e.key === 'Enter') {
      setFunct(e.target.value)
      submit = true
      e.preventDefault()
      // e.target.value = ''
    }
  }
  const addCompany = (e) => {
    if (e.key === 'Enter') {
      setCompany([...company, e.target.value])
      // e.target.value = ''
      submit = true
      e.preventDefault()
    }
  }
  const handleModelSubmit = async (e) => {
    e.preventDefault()
    console.log(company)
    const message = await runModel(funct, company)

    if (message === 'success') {
      console.log('model addition successful.')
    } else {
      console.log(message)
    }
  }

  return (
    <>
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
          {submit ? <SmallCaption_up>your model :</SmallCaption_up> : <></>}
          <SmallCaption_up>{funct}</SmallCaption_up>
        </Stack>
      </Box>
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

          <>
            {submit ? (
              <>
                <SmallCaption_up>company to be analysized :</SmallCaption_up>
                <Stack spacing={1}>
                  {company.map((c) => (
                    <SmallCaption_up id={c.id}>{c.content}</SmallCaption_up>
                  ))}
                </Stack>
                <Button
                  variant="contained"
                  disableElevation
                  onClick={handleModelSubmit}
                >
                  Start
                </Button>
              </>
            ) : (
              <></>
            )}
          </>
        </Stack>
      </Box>
    </>
  )
}
