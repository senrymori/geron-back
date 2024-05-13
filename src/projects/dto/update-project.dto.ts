import { IsArray, IsString, IsOptional } from 'class-validator';

export class UpdateProjectDto {
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  users?: string[];

  @IsOptional()
  @IsString()
  name?: string;
}
