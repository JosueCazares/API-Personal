import { Router } from 'express';
import type { Request, Response } from 'express';
import { prisma } from '../db'
import type { APIResponse } from '../lib/types';
import type { Areas } from '@prisma/client';
import {ZodAreasObj,ZodAreaIdObj,ZodAreaId} from '@/validation/ZodAreas'
import { z, type ZodIssue } from 'zod';


export const router = Router();

router.get('/', async (_: Request, res: Response) => {
    let examples = await prisma.areas.findMany();

    let responseOk: APIResponse<Areas[]> = {
        status: 'success',
        data: examples
    }

    return res.status(200).json(responseOk);
})

router.post('/', async (req: Request, res: Response) => {
    try{
        const camposValidados = ZodAreasObj.parse(req.body)
        
        //Creación de Áreas
        let newArea = await prisma.areas.create({
            data : camposValidados
        
        let responseOk: APIResponse<Areas> = {
            status: 'success',
            data: newArea
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