import React, { useEffect, useState } from 'react'
import { Box, Container, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import api from './services/api'

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'first_name',
    headerName: 'Nome',
    width: 150,
    editable: true
  },
  {
    field: 'last_name',
    headerName: 'Sobrenome',
    width: 150,
    editable: true
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 200,
    editable: true
  }
]

export default function DataGridDemo() {
  const [clients, getClients] = useState({ isLoading: true, data: null })

  useEffect(() => {
    api
      .get('/clients')
      .then((response) => getClients({ isLoading: false, data: response.data }))
      .catch((err) => {
        console.error('Ocorreu um erro' + err)
      })
  }, [])

  const rows = clients?.data?.clients

  if (clients.isLoading) {
    return <p>Carregando...</p>
  }

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}
    >
      <Typography variant="h5" sx={{ mt: 6, mb: 2 }}>
        Lista de Clientes
      </Typography>
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          experimentalFeatures={{ newEditingApi: false }}
        />
      </Box>
    </Container>
  )
}
