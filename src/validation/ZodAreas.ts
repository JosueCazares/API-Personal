import {z} from 'zod'

export const ZodAreasObj = z.object({
    id : z.number(),
    nombre : z.string()
})