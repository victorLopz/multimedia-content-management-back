import { HttpException, Injectable } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { hash, compare } from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/users/schemas/user.schema';
import { JwtService } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async register(userObject: RegisterAuthDto) {
    const { fullName, email, username, roles } = userObject;

    const existingUser = await this.userModel.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      if (existingUser.email === email) {
        throw new HttpException('Correo ya existe', 400);
      } else {
        throw new HttpException('Usuario ya existe', 400);
      }
    }

    const user = {
      fullName,
      email,
      username,
      roles,
    };

    return this.userModel.create(user);
  }

  async login(userObject: LoginAuthDto) {
    const { email, username } = userObject;

    const user = await this.userModel.findOne({ email });

    if (!user) throw new HttpException('Credenciales incorrectas', 401);

    if (user.username !== username)
      throw new HttpException('Credenciales incorrectas', 401);

    const payload = {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      role: user.roles,
    };

    const token = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET,
    });

    const data = {
      user: user,
      token: token,
    };

    return data;
  }
}
