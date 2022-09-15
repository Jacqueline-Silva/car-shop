import { z } from 'zod';
import { vehicleZodSchema } from './IVehicle';

const categories = ['Street', 'Custom', 'Trail'] as const;

export const motorcycleZodSchema = vehicleZodSchema.extend({
  category: z.enum(categories),
  engineCapacity: z.number().int().positive().lte(2500),
});

export type IMotorcycle = z.infer<typeof motorcycleZodSchema>;

/**
 * REF: https://www.npmjs.com/package/zod#strings
 */