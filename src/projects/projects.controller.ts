import { GetMembersResponse } from './response/get-members-response';
import { Controller, Get, Post, Body, Param, Request } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { GetProjectFindAllResponse } from './response/get-project-find-all.response';
import { GetParticipantsResponse } from './response/get-participants-response';
import { AddedUserToProjectDTO } from './dto/added-user-to-project.dto';

@ApiTags('Проекты')
@ApiBearerAuth()
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  create(
    @Request() req: AuthRequest,
    @Body() createProjectDto: CreateProjectDto,
  ) {
    return this.projectsService.create(req.user, createProjectDto);
  }

  @ApiOkResponse({ type: GetProjectFindAllResponse })
  @Get()
  findAll(@Request() req: AuthRequest) {
    return this.projectsService.findAll(req.user);
  }

  @ApiOkResponse({ type: GetParticipantsResponse })
  @Get(':id/participants')
  findParticipants(@Param('id') id: string) {
    return this.projectsService.findParticipants(id);
  }

  @ApiOkResponse({ type: GetMembersResponse })
  @Get(':id/members')
  findMembers(@Param('id') id: string) {
    return this.projectsService.findMembers(id);
  }

  @Post(':id/members')
  addedUserToProject(
    @Param('id') id: string,
    @Request() req: AuthRequest,
    @Body() dto: AddedUserToProjectDTO,
  ) {
    return this.projectsService.addedUserToProject(id, req.user, dto);
  }
}
