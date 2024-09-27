import { Router } from 'express';
import type { Request, Response } from 'express';
import { prisma } from '../db'
import type { APIResponse } from '../lib/types';
import type { Catalogo_personal } from '@prisma/client';
import {ZodPersonalObj,ZodPersonalIdObj} from '@/validation/ZodPersonal'
import { z, type ZodIssue } from 'zod';

export const router = Router();

router.get('/', async (_: Request, res: Response) => {
    let personal = await prisma.catalogo_personal.findMany();

    let responseOk: APIResponse<Catalogo_personal[]> = {
        status: 'success',
        data: personal
    }

    return res.status(200).json(responseOk);
})

router.post('/', async (req: Request, res: Response) => {
    try{
        const camposValidados = ZodPersonalObj.parse(req.body)

        let personalFind = await prisma.catalogo_personal.findUnique({
            where:{
                curp: camposValidados.curp
            }
        });
        if(personalFind){
            let responseError:APIResponse<String>={
                status:'error',
                data:"Curp ya en uso"
            }
            return res.status(400).json(responseError)
        }
        // Verificar si el área existe
        let areaFind = await prisma.areas.findUnique({
            where: {
                id: camposValidados.areaId
            }
        });
        // Si el área no existe, retornar un error
        if (!areaFind) {
            let responseError: APIResponse<String> = {
                status: 'error',
                data: "Área no encontrada"
            };
            return res.status(400).json(responseError);
        }
        //Creación de nuevo personal/empleado
        let newPersonal = await prisma.catalogo_personal.create({
            data: {
                nombre: camposValidados.nombre,
                correo: camposValidados.correo,
                telefono: camposValidados.telefono,
                curp: camposValidados.curp,
                numero_empleado: camposValidados.numero_empleado,
                tipo_contrato: camposValidados.tipo_contrato,
                fecha_ingreso: camposValidados.fecha_ingreso,
                grupo: camposValidados.grupo,
                estatus: camposValidados.estatus,
            area:{
                connect:{
                    id: camposValidados.areaId
                }
            }
            }
        });
        
        let responseOk: APIResponse<Catalogo_personal> = {
            status: 'success',
            data: newPersonal
        }
        return res.status(200).json(responseOk)
    } catch (error) {
        let responseError: APIResponse<Error> = {
            status: "error",
            error: "Error en el servidor"
        }
        if (error instanceof z.ZodError) {
            let responseErrorZod:APIResponse<ZodIssue[]> = {
                status: "error",
                error: "Datos invalidos",
                data: error.errors
            }
            return res.status(400).json(responseErrorZod)
        }
        return res.status(500).json(responseError)
    }
});