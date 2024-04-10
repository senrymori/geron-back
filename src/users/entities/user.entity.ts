import { AbstractEntity } from 'src/abstractions/abstract.entity';
import { Project } from 'src/projects/entities/project.entity';
import { Task } from 'src/projects/entities/task.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Address } from './address.entity';

@Entity()
export class User extends AbstractEntity<User> {
  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column()
  age: number;

  @Column()
  email: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @OneToOne(() => Address, { cascade: true, nullable: true })
  @JoinColumn()
  address: Address | null;

  @ManyToMany(() => Project, (projects) => projects.users)
  @JoinTable()
  projects: Project[];

  @OneToMany(() => Task, (tasks) => tasks.user)
  @JoinTable()
  tasks: Task[];
}
