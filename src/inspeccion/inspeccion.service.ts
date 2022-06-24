import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import * as mongoose  from 'mongoose';
import { InspeccionDTO } from './dto/inspeccion.dto';
import { IInspeccion } from './interface/inspeccion.interface';

@Injectable()
export class InspeccionService {

    constructor(@InjectModel('Inspecciones') private readonly inspeccionesModel: mongoose.Model<IInspeccion>){}
  
    // Inspeccion por ID
    async getInspeccion(id: string): Promise<IInspeccion> {
  
        const inspeccionDB = await this.inspeccionesModel.findById(id);
        if(!inspeccionDB) throw new NotFoundException('La inspeccion no existe');
  
        const pipeline = [];
  
        // Inspeccion por ID
        const idInspeccion = new mongoose.Types.ObjectId(id);
        pipeline.push({ $match:{ _id: idInspeccion} }) 
  
        // Informacion de usuario creador
        pipeline.push({
          $lookup: { // Lookup
              from: 'usuarios',
              localField: 'creatorUser',
              foreignField: '_id',
              as: 'creatorUser'
          }}
        );
  
        pipeline.push({ $unwind: '$creatorUser' });
  
        // Informacion de usuario actualizador
        pipeline.push({
          $lookup: { // Lookup
              from: 'usuarios',
              localField: 'updatorUser',
              foreignField: '_id',
              as: 'updatorUser'
          }}
        );
  
        pipeline.push({ $unwind: '$updatorUser' });
  
        const inspeccion = await this.inspeccionesModel.aggregate(pipeline);
        
        return inspeccion[0];
  
    } 
  
    
    // Listar inspecciones
    async listarInspecciones(querys: any): Promise<IInspeccion[]> {
            
      const {columna, direccion} = querys;
  
      const pipeline = [];
      pipeline.push({$match:{}});
    
      // Informacion de usuario creador
      pipeline.push({
        $lookup: { // Lookup
            from: 'usuarios',
            localField: 'creatorUser',
            foreignField: '_id',
            as: 'creatorUser'
        }}
      );
  
      pipeline.push({ $unwind: '$creatorUser' });
  
      // Informacion de usuario actualizador
      pipeline.push({
        $lookup: { // Lookup
          from: 'usuarios',
          localField: 'updatorUser',
          foreignField: '_id',
          as: 'updatorUser'
        }}
      );
  
      pipeline.push({ $unwind: '$updatorUser' });
  
      // Ordenando datos
      const ordenar: any = {};
      if(columna){
          ordenar[String(columna)] = Number(direccion);
          pipeline.push({$sort: ordenar});
      }      
  
      const inspecciones = await this.inspeccionesModel.aggregate(pipeline);
      
      return inspecciones;
  
    }  
  
    // Crear inspeccion
    async crearInspeccion(inspeccionDTO: InspeccionDTO): Promise<IInspeccion> {
        const nuevaInspeccion = new this.inspeccionesModel(inspeccionDTO);
        return await nuevaInspeccion.save();
    }
  
    // Actualizar inspeccion
    async actualizarInspeccion(id: string, inspeccionUpdateDTO: any): Promise<IInspeccion> {
        const inspeccion = await this.inspeccionesModel.findByIdAndUpdate(id, inspeccionUpdateDTO, {new: true});
        return inspeccion;
    }
  

}
