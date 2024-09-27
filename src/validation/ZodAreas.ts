import {z} from 'zod'

export const ZodAreasObj = z.object({
    nombre : z.string()
})

export const ZodAreaIdObj = z.object({
    id : z.number().positive().min(1),
    nombre : z.string().min(1).max(30)
})

export const ZodAreaId = z.object({
    id : z.number().positive().min(1)
})
