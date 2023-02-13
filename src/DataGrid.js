import React, { useEffect, useState } from 'react'
import { Box, Container, Typography, Snackbar } from '@mui/material'
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid'
import MuiAlert from '@mui/material/Alert'
import { Edit } from '@mui/icons-material'
import api from './services/api'

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

export default function DataGridDemo() {
  const [openSuccess, setOpenSuccess] = React.useState(false)

  const handleClickSuccess = () => {
    setOpenSuccess(true)
  }

  const handleCloseSuccess = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpenSuccess(false)
  }

  const [openError, setOpenError] = React.useState(false)

  const handleClickError = () => {
    setOpenError(true)
  }

  const handleCloseError = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpenError(false)
  }

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'first_name',
      headerName: 'Nome',
      width: 200,
      editable: true
    },
    {
      field: 'last_name',
      headerName: 'Sobrenome',
      width: 200,
      editable: true
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 300,
      editable: true
    },
    {
      field: 'actions',
      headerName: 'Ações',
      type: 'actions',
      width: 80,
      getActions: (params) => [
        <>
          <GridActionsCellItem
            icon={<Edit />}
            label="Edit"
            onClick={editUser(params)}
          />
        </>
      ]
    }
  ]

  const editUser = React.useCallback(
    (params) => () => {
      const data = {
        first_name: params.row.first_name,
        last_name: params.row.last_name,
        email: params.row.email
      }

      api
        .put(`/client/${params.row.id}`, data)
        .then(() => handleClickSuccess())
        .catch(() => {
          handleClickError()
        })
    },
    []
  )

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
          experimentalFeatures={{ newEditingApi: true }}
        />
      </Box>

      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={openSuccess}
        autoHideDuration={1000}
        onClose={handleCloseSuccess}
      >
        <Alert
          onClose={handleCloseSuccess}
          severity="success"
          sx={{ width: '100%' }}
        >
          Editado com sucesso!
        </Alert>
      </Snackbar>

      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={openError}
        autoHideDuration={1000}
        onClose={handleCloseError}
      >
        <Alert
          onClose={handleCloseError}
          severity="error"
          sx={{ width: '100%' }}
        >
          Aconteceu algum erro!
        </Alert>
      </Snackbar>
    </Container>
  )
}
