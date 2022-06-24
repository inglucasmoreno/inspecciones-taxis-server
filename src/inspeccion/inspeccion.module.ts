import { Module } from '@nestjs/common';
import { InspeccionController } from './inspeccion.controller';
import { InspeccionService } from './inspeccion.service';
import { MongooseModule } from '@nestjs/mongoose';
import { inspeccionSchema } from './schema/inspeccion.schema';

@Module({
  imports: [MongooseModule.forFeature([{name:'Inspecciones', schema: inspeccionSchema}])],
  controllers: [InspeccionController],
  providers: [InspeccionService]
})
export class InspeccionModule {}

