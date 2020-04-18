import { ArgumentMetadata, Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import { TaskStatus } from 'src/tasks/task.status.enum';

@Injectable()
export class TaskStatusValidationPipe implements PipeTransform {
  readonly allowedStatus = [
    TaskStatus.OPEN,
    TaskStatus.IN_PROGRESS,
    TaskStatus.DONE
  ]
  transform(value: any, metadata: ArgumentMetadata) {
    value = value.toUpperCase();
    
    if(!this.isStatusValid(value)){
      throw new BadRequestException(`status só pode ser: ${this.allowedStatus.join(', ')}`);
    }
    console.log("value: ", value);
    return value;

  }

  private isStatusValid(status: any) {
    const index = this.allowedStatus.indexOf(status);
    return index !== -1;
  }
}
