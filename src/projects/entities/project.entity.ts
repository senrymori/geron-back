import { AbstractEntity } from 'src/abstractions/abstract.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, ManyToMany, Entity, OneToMany, JoinTable } from 'typeorm';
import { Task } from './task.entity';

@Entity()
export class Project extends AbstractEntity<Project> {
  @Column()
  name: string;

  @ManyToMany(() => User, (users) => users.projects, { cascade: true })
  users: User[];

  @OneToMany(() => Task, (tasks) => tasks.project)
  @JoinTable()
  tasks: Task[];
}
