import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createProjectDto: CreateProjectDto) {
    const project = new Project(createProjectDto);

    await this.projectRepository.save(project);

    return 'Проект добавлен';
  }

  async findAll(tokenData: TokenData) {
    return this.projectRepository.find({
      where: { users: { id: tokenData.id } },
    });
  }

  async findOne(id: string) {
    return this.projectRepository.findOne({
      where: { id },
      relations: {
        users: true,
      },
    });
  }

  async update(id: string, updateProjectDto: UpdateProjectDto) {
    const project = new Project(updateProjectDto);

    if (updateProjectDto?.userId) {
      const user = await this.userRepository.findOneBy({
        id: updateProjectDto.userId,
      });

      project.users = [...(project.users ?? []), user];
    }

    await this.projectRepository.save({ id, ...project });

    return `Проект обновлен`;
  }

  async remove(id: string) {
    await this.projectRepository.delete({ id });

    return `Проект удален`;
  }
}
