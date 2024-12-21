import React, { useEffect, useState } from 'react'
import Contenedor from '../../../components/admin-components/Contenedor';
import ContenedorBotones from '../../../components/admin-components/ContenedorBotones';
import { TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import ContenedorTabla from '../../../components/admin-components/ContenedorTabla';
import { BotonAgregar, BotonesAccion, BotonExportar } from '../../../components/admin-components/Botones';
import AgregarVendedor from './AgregarEmpleado';
import { Empleado } from '../../../interfaces/Empleado';
import { eliminarEmpleado, exportarListadoEmpleados, obtenerEmpleados } from '../../../services/empleado-service';

interface Columna {
  id: keyof Empleado | "nombreCompleto" | "acciones";
  label: string;
  width: number | "auto";
  align: "center";
}

const columnas: Columna[] = [
  { id: "cargo", label: "Cargo", width: "auto", align: "center" },
  { id: "nombreCompleto", label: "Nombre del empleado", width: "auto", align: "center" },
  { id: "tipoDocumento", label: "Tipo Doc.", width: "auto", align: "center" },
  { id: "nroDocumento", label: "Nro. Doc.", width: "auto", align: "center" },
  { id: "telefono", label: "Teléfono", width: "auto", align: "center" },
  { id: "correo", label: "Correo", width: "auto", align: "center" },
  { id: "direccion", label: "Dirección", width: "auto", align: "center" },
  { id: "fecRegistro", label: "Fecha Registro", width: "auto", align: "center" },
  { id: "acciones", label: "Acciones", width: 300, align: "center" },
]

const Empleados: React.FC = () => {

  const [empleados, setEmpleados] = useState<Empleado[]>([]);
  const [editarEmpleado, setEditarEmpleado] = useState<Empleado | null>(null);

  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = (empleado?: Empleado) => {
    setEditarEmpleado(empleado || null);
    setOpenModal(true);
  }

  const handleCloseModal = () => {
    setEditarEmpleado(null);
    listarEmpleados();
    setOpenModal(false);
  }

  const listarEmpleados = async () => {
    try {
      const data = await obtenerEmpleados();
      setEmpleados(data);
    } catch (error) {
      console.error(error);
    }
  }

  const handleEliminarEmpleado = async (idEmpleado: number) => {
    try {
      await eliminarEmpleado(idEmpleado);
      listarEmpleados();
    } catch (error) {
      console.error("Error: ", error);
      alert("Ocurrió un error durante la eliminación del empleado");
    }
  }

  const handleExportar = async () => {
    try {
      await exportarListadoEmpleados();
    } catch (error) {
      console.error("Error: ", error);
      alert("Ocurrió un error durante la exportación del listado de empleados");
    }
  }

  useEffect(() => {
    listarEmpleados();
  }, []);

  return (
    <Contenedor>
      <ContenedorBotones>

        <BotonAgregar
          onClick={() => handleOpenModal()}
          text="Agregar empleado"
        />

        <AgregarVendedor
          open={openModal}
          onClose={handleCloseModal}
          empleado={editarEmpleado}
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
          {empleados.map((empleado) => (
            <TableRow>
              {columnas.map((columna) => {
                const value = columna.id === "acciones" ? "" : (empleado as any)[columna.id];
                return (
                  <TableCell key={columna.id} align={columna.align}>
                    {columna.id === "cargo" ?
                      empleado.cargo?.nombreCargo
                    : columna.id === "nombreCompleto" ?
                      `${empleado.nombres} ${empleado.apellidoPaterno} ${empleado.apellidoMaterno}`
                    : columna.id === "tipoDocumento" ?
                      empleado.tipoDocumento?.nombreTipoDoc
                    : columna.id === "acciones" ? (
                      <BotonesAccion 
                        editar={() => handleOpenModal(empleado)}
                        eliminar={() => handleEliminarEmpleado(empleado.idEmpleado)}
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

export default Empleados;