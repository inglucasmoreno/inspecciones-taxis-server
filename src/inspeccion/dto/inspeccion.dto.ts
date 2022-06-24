import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class InspeccionDTO {
    
    @IsNotEmpty()
    @ApiProperty({ type: String, required: true, description: 'Numero de licencia' })
    readonly nro_licencia: string;

    @IsNotEmpty()
    @ApiProperty({ type: String, required: true, description: 'Descripcion de la inspeccion' })
    readonly inspeccion: string;

    @IsNotEmpty()
    @ApiProperty({ type: String, description: 'Usuario creador' })
    readonly creatorUser: string;

    @IsNotEmpty()
    @ApiProperty({ type: String, description: 'Usuario actualizador' })
    readonly updatorUser: string;

    @ApiProperty({ type: Boolean, default: true, description: 'Inspeccion activa o inactiva' })
    readonly activo: boolean;

}