import { ConflictException, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserRepositoryInterface } from './repository/user.repository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  /**
   * Here, we have used data mapper approch for this tutorial that is why we
   * injecting repository here. Another approch can be Active records.
   */
  constructor(
    @InjectRepository(User)
    private readonly userRepository: UserRepositoryInterface,
  ) {}

  /**
   * this is function is used to create User in User Entity.
   * @param createUserDto this will type of createUserDto in which
   * we have defined what are the keys we are expecting from body
   * @returns promise of user
   */
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    createUserDto.password = await this.hashPassword(createUserDto.password);
    const user = new User();
    user.username = createUserDto.username;
    user.password = createUserDto.password;
    const isExist = await this.userRepository.findOneBy({
      username: user.username,
    });
    if (isExist)
      throw new ConflictException(
        `User ${createUserDto.username} already exists`,
      );

    const result = await this.userRepository.save(user);
    return result ?? undefined;
  }

  /**
   * this function is used to get all the user's list
   * @returns promise of array of users
   */
  findAllUser(): Promise<User[]> {
    return this.userRepository.find();
  }

  /**
   * this function used to get data of use whose id is passed in parameter
   * @param id is type of number, which represent the id of user.
   * @returns promise of user
   */
  viewUser(id: string): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  /**
   * this function is used to updated specific user whose id is passed in
   * parameter along with passed updated data
   * @param id is type of number, which represent the id of user.
   * @param updateUserDto this is partial type of createUserDto.
   * @returns promise of udpate user
   */
  updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user: User = new User();
    user.username = updateUserDto.username;
    user.password = updateUserDto.password;
    user.id = id;
    return this.userRepository.save(user);
  }

  /**
   * this function is used to remove or delete user from database.
   * @param id is the type of number, which represent id of user
   * @returns nuber of rows deleted or affected
   */
  removeUser(id: string): Promise<{ affected?: number }> {
    return this.userRepository.delete(id);
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
  }
}
