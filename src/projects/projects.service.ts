import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { Project } from './entities/project.entity';
import { Role, RolesProject } from './entities/role.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly rolesProjectRepository: Repository<Role>,
  ) {}

  async create(tokenData: TokenData, createProjectDto: CreateProjectDto) {
    const user = await this.userRepository.findOne({
      where: { id: tokenData.id },
    });

    const project = new Project(createProjectDto);

    await this.projectRepository.save(project);
    await this.rolesProjectRepository.save({
      user: { id: user.id },
      project: { id: project.id },
      role: RolesProject.admin,
    });

    return JSON.stringify('Проект создан');
  }

  async findAll(tokenData: TokenData) {
    return this.projectRepository.find({
      where: {
        roles: {
          user: {
            id: tokenData.id,
          },
        },
      },
    });
  }

  async findParticipants(projectId: string) {
    return this.rolesProjectRepository.find({
      where: {
        project: {
          id: projectId,
        },
      },
      relations: {
        user: true,
      },
      select: {
        role: true,
        user: {
          firstName: true,
          username: true,
          lastName: true,
        },
      },
    });
  }
}
