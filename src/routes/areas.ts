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

