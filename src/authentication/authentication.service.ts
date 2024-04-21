import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { SignInDTO } from './dto/sign-in.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signIn(signInDTO: SignInDTO) {
    const user = await this.userRepository.findOne({
      where: {
        username: signInDTO.username,
      },
    });

    if (!user) {
      throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
    }

    const isMatch = await bcrypt.compare(signInDTO.password, user.password);

    if (!isMatch) {
      throw new HttpException('Некорректный пароль', HttpStatus.UNAUTHORIZED);
    }

    const payload: TokenData = { id: user.id };

    const token = await this.jwtService.signAsync(payload);

    return JSON.stringify(token);
  }

  async signUp(createUserDto: CreateUserDto) {
    const userExist = await this.userRepository.count({
      where: {
        username: createUserDto.username,
      },
    });

    if (userExist) {
      throw new HttpException(
        'Пользователь с таким именем уже существует',
        HttpStatus.CONFLICT,
      );
    }

    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(createUserDto.password, salt);

    const user = new User({ ...createUserDto, password: hash });
    await this.userRepository.save(user);

    return JSON.stringify('Пользователь зарегистрирован');
  }
}
