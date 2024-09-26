import {z} from 'zod'
import { Estatus } from '@prisma/client'
import { Contrato } from '@prisma/client'
import { Grupo } from '@prisma/client'

export const ZodPersonalObj = z.object({
    nombre : z.string(),
    correo : z.string(),
    telefono : z.string(),
    curp : z.string(),
    numero_empleado : z.string(),
    tipo_contrato : z.enum([Contrato.BASE, Contrato.POR_HONORARIOS]),
    fecha_ingreso : z.string(),
    grupo : z.enum([Grupo.INFORMATICA, Grupo.PROFESORES, Grupo.RECURSOS_HUMANOS, Grupo.SERVICIOS_ESCOLARES]),
    estatus : z.enum([Estatus.ACTIVO, Estatus.INACTIVO]),
    area : z.string()
})