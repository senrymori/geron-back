import { IsAlpha, IsString } from 'class-validator';

export class GetTasksFilterDto {
  @IsAlpha()
  username?: string;

  @IsString()
  projectId?: string;
}
