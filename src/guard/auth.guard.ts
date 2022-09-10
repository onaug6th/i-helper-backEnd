import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserService } from '../modules/user/user.service';

/**
 * 认证守卫
 */
@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly userService:UserService
    ){}
  async canActivate(
    context: ExecutionContext
  ): Promise<boolean>  {
    const request = context.switchToHttp().getRequest();
    const token = request.headers['token']
    var user = await this.userService.getUserByToken(token)

    return user!=null;
  }
}
