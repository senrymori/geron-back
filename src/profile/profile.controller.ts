import { Controller, Get, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ProfileService } from './profile.service';
import { GetMyProfileResponse } from './response/get-my-profile-response';

@ApiTags('Профиль')
@ApiBearerAuth()
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @ApiOkResponse({ type: GetMyProfileResponse })
  @Get()
  getProfile(@Request() req: AuthRequest) {
    return this.profileService.getProfile(req.user);
  }
}
