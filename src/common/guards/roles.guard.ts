import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

import { Roles } from '../decorators/roles.decorator';
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly JwtService: JwtService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get(Roles, context.getHandler());

    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    if (!request.headers.authorization) {
      return false;
    }

    let decoded;
    try {
      decoded = this.JwtService.verify(request.headers.authorization);
    } catch (error) {
      return false;
    }

    const UserRole = decoded.role;

    const hasRole = () => UserRole === roles[0];

    return hasRole();
  }
}
