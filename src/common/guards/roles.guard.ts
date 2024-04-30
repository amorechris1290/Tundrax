import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from '../decorators/roles.decorator';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly JwtService: JwtService
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get(Roles, context.getHandler());
    console.log(roles);

    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    if(!request.headers.authorization) {
      return false;
    }
    console.log('auth header', request.headers.authorization);
    let decoded;
    try {
       decoded = this.JwtService.verify(request.headers.authorization);
      
    } catch (error) {
      return false;
    }
   
    console.log('decoded', decoded)
    const UserRole = decoded.role;
    // const user = request.user;

    const hasRole = () => UserRole === roles[0];

    return hasRole();
  }
}
