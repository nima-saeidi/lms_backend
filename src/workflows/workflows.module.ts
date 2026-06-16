import { Module } from '@nestjs/common';
import { WorkflowsService } from './workflows.service';
import { WorkflowsController } from './workflows.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { WorkflowEntity, WorkflowSchema } from './workflows.schema'; // نام‌ها اصلاح شد

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: WorkflowEntity.name, schema: WorkflowSchema }, // Workflow.name به WorkflowEntity.name تغییر یافت
    ]),
  ],
  controllers: [WorkflowsController],
  providers: [WorkflowsService],
  exports: [WorkflowsService],
})
export class WorkflowsModule {}
