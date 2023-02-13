import { Box, Chip, Container, Paper, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import api from './services/api'

export default function PaperClients() {
  const [clients, getClients] = useState()

  useEffect(() => {
    api
      .get('/clients')
      .then((response) => getClients(response.data))
      .catch((err) => {
        console.error('Ocorreu um erro' + err)
      })
  }, [])

  return (
    <Container sx={{ display: 'grid', justifyContent: 'center' }}>
      {clients?.clients.map((item) => (
        <Box sx={{ display: 'flex', justifyContent: 'center', width: 200 }}>
          <Paper elevation={3} sx={{ p: 1, m: 1 }}>
            <Typography>{item.first_name + ' ' + item.last_name}</Typography>
            <Chip label={item.email} />
          </Paper>
        </Box>
      ))}
    </Container>
  )
}
