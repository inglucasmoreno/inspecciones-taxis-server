import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({ imports: [MongooseModule.forRoot('mongodb://localhost/inspeccion-taxis')] })
export class MongoModule {}
