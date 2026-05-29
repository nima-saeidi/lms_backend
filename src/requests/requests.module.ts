// requests/requests.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RequestsController } from './requests.controller';
import { RequestsService } from './requests.service';
import { RequestEntity, RequestSchema } from './requests.schema';


@Module({
imports: [MongooseModule.forFeature([{ name: RequestEntity.name, schema: RequestSchema }])],
controllers: [RequestsController],
providers: [RequestsService],
})
export class RequestsModule {}