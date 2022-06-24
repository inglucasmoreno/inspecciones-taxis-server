import { Schema } from 'mongoose';

export const inspeccionSchema = new Schema({

    nro_licencia: {
        type: String,
        required: true,
        trim: true
    },

    inspeccion: {
        type: String,
        required: true,
        trim: true,
        uppercase: true
    },

    creatorUser: {
        type: Schema.Types.ObjectId,
        ref: 'usuario',
        required: true
    },

    updatorUser: {
        type: Schema.Types.ObjectId,
        ref: 'usuario',
        required: true
    },

    activo: {
        type: Boolean,
        default: true
    }

},{ timestamps: true, collection: 'inspecciones' })