import { Resolver } from 'react-hook-form';
import { ZodSchema } from 'zod';

declare module '@hookform/resolvers/zod' {
  export function zodResolver<T>(schema: ZodSchema<any>): Resolver<T>;
}