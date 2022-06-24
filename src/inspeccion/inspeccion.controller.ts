import { Body, Controller, Get, HttpStatus, Param, Post, Put, Query, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { InspeccionUpdateDTO } from './dto/inspeccion-update.dto';
import { InspeccionDTO } from './dto/inspeccion.dto';
import { InspeccionService } from './inspeccion.service';

@ApiTags('Inspecciones')
@Controller('inspeccion')
export class InspeccionController {

    constructor( private inspeccionesService: InspeccionService ){}

    // Inspecciones por ID
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOkResponse({ description: 'Inspeccion obtenida correctamente' })
    @ApiUnauthorizedResponse({ description: 'El usuario no esta autorizado para realizar esta accion' })
    @ApiParam({name: 'id', required: true, description: 'Identificador de inspeccion', type: 'string'})
    @Get('/:id')
    async getInspeccion(@Res() res, @Param('id') inspeccionID) {
        const inspeccion = await this.inspeccionesService.getInspeccion(inspeccionID);
        res.status(HttpStatus.OK).json({
            message: 'Inspeccion obtenida correctamente',
            inspeccion
        });
    }

    // Listar inspecciones
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOkResponse({ description: 'Listado de inspecciones correcto' })
    @ApiUnauthorizedResponse({ description: 'El usuario no esta autorizado para realizar esta accion' })
    @Get('/')
    async listarInspecciones(@Res() res, @Query() querys) {
        const inspecciones = await this.inspeccionesService.listarInspecciones(querys);
        res.status(HttpStatus.OK).json({
            message: 'Listado de inspecciones correcto',
            inspecciones
        });
    }

    // Crear inspecciones
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiCreatedResponse({ description: 'Inspeccion creado correctamente' })
    @ApiUnauthorizedResponse({ description: 'El usuario no esta autorizado para realizar esta accion' })
    @ApiBody({ type: InspeccionDTO })
    @Post('/')
    async crearInspeccion(@Res() res, @Body() inspeccionDTO: InspeccionDTO ) {
        const inspeccion = await this.inspeccionesService.crearInspeccion(inspeccionDTO);        
        res.status(HttpStatus.CREATED).json({
            message: 'Inspeccion creado correctamente',
            inspeccion
        });
    }
        
    // Actualizar inspeccion
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOkResponse({ description: 'Inspeccion actualizada correctamente' })
    @ApiUnauthorizedResponse({ description: 'El usuario no esta autorizado para realizar esta accion' })
    @ApiParam({name: 'id', required: true, description: 'Identificador de inspeccion', type: 'string'})
    @Put('/:id')
    async actualizarInspeccion(@Res() res, @Body() inspeccionUpdateDTO: InspeccionUpdateDTO, @Param('id') inspeccionID ) {
        
        const inspeccion = await this.inspeccionesService.actualizarInspeccion(inspeccionID, inspeccionUpdateDTO);

        res.status(HttpStatus.OK).json({
            message: 'Inspeccion actualizada correctamente',
            inspeccion
        });

    }

}

