import * as React from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import styled from 'styled-components'
import MoneyIcon from '@mui/icons-material/AttachMoney'
import PeopleIcon from '@mui/icons-material/People'
import AddchartIcon from '@mui/icons-material/Addchart'
import PieChartIcon from '@mui/icons-material/PieChart'

const Space_horizontal = styled.section`
  width: 10px;
`

const Wrapper_horizontal = styled.section`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`

export default function ModelList() {
  return (
    <List sx={{ width: '100%', maxWidth: 200, bgcolor: '#d9e6f2' }}>
      <Wrapper_horizontal>
        <Space_horizontal />
        <Typography component="p" variant="h6" color="primary">
          Input Reference
        </Typography>
      </Wrapper_horizontal>

      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <MoneyIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="P" secondary="PE" />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <PeopleIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="R" secondary="RoET4Q" />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <AddchartIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="G" secondary="Gross Margin" />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <PieChartIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="C" secondary="Current ratio" />
      </ListItem>
    </List>
  )
}
