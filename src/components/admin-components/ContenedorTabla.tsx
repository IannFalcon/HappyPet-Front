import { Paper, Table, TableContainer } from '@mui/material'
import React from 'react'

interface ContenedorTablaProps {
  children: React.ReactNode;
}

const ContenedorTabla: React.FC<ContenedorTablaProps> = ({ children }) => {
  return (
    <Paper sx={{ width: "100%" }}>
      <TableContainer sx={{ width: "100%" }}>
        <Table sx={{ width: "100%" }}>
          { children }
        </Table>
      </TableContainer>
    </Paper>
  )
}

export default ContenedorTabla;