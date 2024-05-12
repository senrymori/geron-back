import { ArrayMinSize, IsArray, IsString, IsOptional } from 'class-validator';

export class UpdateProjectDto {
  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(0)
  users: string[];

  @IsOptional()
  @IsString()
  name?: string;
}
