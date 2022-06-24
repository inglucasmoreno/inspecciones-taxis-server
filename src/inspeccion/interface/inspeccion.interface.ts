import { Document } from 'mongoose';

export interface IInspeccion extends Document {
    readonly nro_licencia: string;
    readonly inspeccion: string;
    readonly creatorUser: string;
    readonly updatorUser: string;
    readonly activo: string;
}