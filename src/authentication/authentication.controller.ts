import { CreateUserDto } from './../users/dto/create-user.dto';
import { Controller, Post, Body } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { SignInDTO } from './dto/sign-in.dto';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/constants';

@ApiTags('Авторизация / Регистрация')
@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Public()
  @Post('login')
  signIn(@Body() signInDTO: SignInDTO) {
    return this.authenticationService.signIn(signInDTO);
  }

  @Public()
  @Post('register')
  signUp(@Body() createUserDto: CreateUserDto) {
    return this.authenticationService.signUp(createUserDto);
  }
}
