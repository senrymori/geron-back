import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { Profile } from './models/profile.model';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getProfile(tokenData: TokenData) {
    const user: User = await this.userRepository.findOne({
      where: {
        id: tokenData.id,
      },
    });

    return new Profile(user);
  }
}
