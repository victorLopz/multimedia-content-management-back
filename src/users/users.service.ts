import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async findAll() {
    const users = [
      {
        id: 1,
        name: 'John',
        email: 'john@example.com',
      },
      {
        id: 2,
        name: 'Doe',
        email: 'doe@example.com',
      },
    ];
    return users;
  }

  findOne(id: number) {
    return {
      id: 1,
      name: 'John',
      email: 'john@example.com',
    };
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
