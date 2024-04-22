import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [],
  providers: [],
})
export class UsersModule {}
