import { AbstractEntity } from 'src/abstractions/abstract.entity';
import { Column, Entity, OneToMany, JoinTable } from 'typeorm';
import { Role } from './role.entity';
import { Task } from './task.entity';

@Entity()
export class Project extends AbstractEntity<Project> {
  @Column()
  name: string;

  @OneToMany(() => Task, (tasks) => tasks.project)
  @JoinTable()
  tasks: Task[];

  @OneToMany(() => Role, (role) => role.project)
  @JoinTable()
  roles: Role[];
}
