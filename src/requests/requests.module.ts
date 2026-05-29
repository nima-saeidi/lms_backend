import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RequestsController } from './requests.controller';
import { RequestsService } from './requests.service';
import { RequestEntity, RequestSchema } from './requests.schema';
import { WorkflowEntity, WorkflowSchema } from '../workflows/workflows.schema'; 

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: RequestEntity.name, schema: RequestSchema },
      { name: WorkflowEntity.name, schema: WorkflowSchema }, 
    ]),
  ],
  controllers: [RequestsController],
  providers: [RequestsService],
})
export class RequestsModule {}
