import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    let token = req.headers['authorization'];
    if (token) {
      token = token.split(' ')[1];
    }
    try {
      if (token) {
        const decoded = await this.jwtService.verifyAsync(token, {
          secret: process.env.JWT_SECRET,
        });
        req['role'] = decoded.role;
      }
    } catch (error) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    next();
  }
}
