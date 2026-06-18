import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { WorkflowEntity } from './workflows.schema';
import { CreateWorkflowDto } from './dto/create-workflow.dto';

@Injectable()
export class WorkflowsService {
  constructor(
    @InjectModel(WorkflowEntity.name)
    private readonly workflowModel: Model<WorkflowEntity>,
  ) {}

  async create(createWorkflowDto: CreateWorkflowDto): Promise<WorkflowEntity> {
    const existingWorkflow = await this.workflowModel.findOne({
      name: createWorkflowDto.name,
    });

    if (existingWorkflow) {
      throw new ConflictException(
        `گردش کار با نام ${createWorkflowDto.name} از قبل وجود دارد.`,
      );
    }

    const newWorkflow = new this.workflowModel(createWorkflowDto);
    return newWorkflow.save();
  }

  async findAll(): Promise<WorkflowEntity[]> {
    return this.workflowModel.find().exec();
  }

  async findByName(name: string): Promise<WorkflowEntity> {
    const workflow = await this.workflowModel.findOne({ name }).exec();

    if (!workflow) {
      throw new NotFoundException(`گردش کاری با نام ${name} یافت نشد.`);
    }

    return workflow;
  }

  async update(
    id: string,
    updateData: Partial<CreateWorkflowDto>,
  ): Promise<WorkflowEntity> {
    const updated = await this.workflowModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();

    if (!updated) {
      throw new NotFoundException('گردش کار یافت نشد.');
    }

    return updated;
  }

  async remove(id: string): Promise<void> {
    const result = await this.workflowModel.findByIdAndDelete(id).exec();

    if (!result) {
      throw new NotFoundException('گردش کار یافت نشد.');
    }
  }
}
