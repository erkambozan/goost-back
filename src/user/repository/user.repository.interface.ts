import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

export interface UserRepositoryInterface extends Repository<User> {}
