import { ApiProperty } from "@nestjs/swagger";

export class InspeccionUpdateDTO {
    
    @ApiProperty({ type: String, required: true, description: 'Numero de licencia' })
    readonly nro_licencia: string;

    @ApiProperty({ type: String, required: true, description: 'Descripcion de la inspeccion' })
    readonly inspeccion: string;

    @ApiProperty({ type: String, description: 'Usuario creador' })
    readonly creatorUser: string;

    @ApiProperty({ type: String, description: 'Usuario actualizador' })
    readonly updatorUser: string;

    @ApiProperty({ type: Boolean, default: true, description: 'Inspeccion activa o inactiva' })
    readonly activo: boolean;

}