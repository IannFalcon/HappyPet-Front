import React, { useEffect, useState } from 'react'
import Contenedor from '../../../components/admin-components/Contenedor';
import ContenedorBotones from '../../../components/admin-components/ContenedorBotones';
import { TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import ContenedorTabla from '../../../components/admin-components/ContenedorTabla';
import { BotonAgregar, BotonesAccion, BotonExportar } from '../../../components/admin-components/Botones';
import AgregarVendedor from './AgregarEmpleado';
import { Vendedor } from '../../../interfaces/Vendedor';
import { eliminarVendedor, exportarListadoVendedores, obtenerVendedores } from '../../../services/vendedor-service';

interface Columna {
  id: keyof Vendedor | "acciones";
  label: string;
  width: number | "auto";
  align: "left" | "center";
}

const columnas: Columna[] = [
  { id: "nombre", label: "Nombre", width: "auto", align: "left" },
  { id: "apellidoPaterno", label: "Apellido Paterno", width: "auto", align: "left" },
  { id: "apellidoMaterno", label: "Apellido Materno", width: "auto", align: "left" },
  { id: "usuTipoDoc", label: "Tipo Doc.", width: "auto", align: "center" },
  { id: "nroDocumento", label: "Nro. Doc.", width: "auto", align: "center" },
  { id: "telefono", label: "Teléfono", width: "auto", align: "center" },
  { id: "direccion", label: "Dirección", width: "auto", align: "left" },
  { id: "correo", label: "Correo", width: "auto", align: "left" },
  { id: "fecRegistro", label: "Fecha Registro", width: "auto", align: "center" },
  { id: "acciones", label: "Acciones", width: 300, align: "center" },
]

const Vendedores: React.FC = () => {

  const [vendedores, setVendedores] = useState<Vendedor[]>([]);
  const [editarVendedor, setEditarVendedor] = useState<Vendedor | null>(null);

  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = (vendedor?: Vendedor) => {
    setEditarVendedor(vendedor || null);
    setOpenModal(true);
  }

  const handleCloseModal = () => {
    setEditarVendedor(null);
    listarVendedores();
    setOpenModal(false);
  }

  const listarVendedores = async () => {
    try {
      const data = await obtenerVendedores();
      setVendedores(data);
    } catch (error) {
      console.error(error);
    }
  }

  const handleEliminarVendedor = async (idUsuario: number) => {
    try {
      await eliminarVendedor(idUsuario);
      handleCloseModal();
    } catch (error) {
      console.error("Error: ", error);
      alert("Ocurrió un error durante la eliminación del vendedor");
    }
  }

  const handleExportar = async () => {
    try {
      await exportarListadoVendedores();
    } catch (error) {
      console.error("Error: ", error);
      alert("Ocurrió un error durante la exportación del listado de vendedores");
    }
  }

  useEffect(() => {
    listarVendedores();
  }, []);

  return (
    <Contenedor>
      <ContenedorBotones>

        <BotonAgregar
          onClick={() => handleOpenModal()}
          text="Agregar vendedor"
        />

        <AgregarVendedor
          open={openModal}
          onClose={handleCloseModal}
          vendedor={editarVendedor}
        />

        <BotonExportar
          onClick={() => handleExportar()}
          text="Exportar"
        />

      </ContenedorBotones>
      <ContenedorTabla>
        <TableHead>
          {columnas.map((columna) => (
            <TableCell
              key={columna.id}
              align={columna.align}
              style={{ width: columna.width }}
            >
              {columna.label}
            </TableCell>
          ))}
        </TableHead>
        <TableBody>
          {vendedores.map((vendedor) => (
            <TableRow>
              {columnas.map((columna) => {
                const value = columna.id === "acciones" ? "" : (vendedor as any)[columna.id];
                return (
                  <TableCell key={columna.id} align={columna.align}>
                    {columna.id === "usuTipoDoc" ?
                      vendedor.usuTipoDoc.descripcion
                    : columna.id === "acciones" ? (
                      <BotonesAccion 
                        editar={() => handleOpenModal(vendedor)}
                        eliminar={() => handleEliminarVendedor(vendedor.idUsuario)}
                      />
                    ) : value}
                  </TableCell>
                )
              })}
            </TableRow>
          ))}
        </TableBody>
      </ContenedorTabla>
    </Contenedor>
  )
}

export default Vendedores;