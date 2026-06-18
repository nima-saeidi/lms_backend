import { Module } from '@nestjs/common';
import { WorkflowsService } from './workflows.service';
import { WorkflowsController } from './workflows.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { WorkflowEntity, WorkflowSchema } from './workflows.schema'; 

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: WorkflowEntity.name, schema: WorkflowSchema }, 
    ]),
  ],
  controllers: [WorkflowsController],
  providers: [WorkflowsService],
  exports: [WorkflowsService],
})
export class WorkflowsModule {}
