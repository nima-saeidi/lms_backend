export class WorkflowStepDto {
  stepName: string;
  requiredRole: string;
  onApprove: string;
  onReject: string;
}

export class CreateWorkflowDto {
  type: string;
  initialStep: string;
  steps: WorkflowStepDto[];
}
