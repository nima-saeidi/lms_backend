import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WorkflowEntity, WorkflowSchema } from './workflows.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: WorkflowEntity.name, schema: WorkflowSchema }])
  ],
  exports: [
    MongooseModule 
  ]
})
export class WorkflowsModule {}
