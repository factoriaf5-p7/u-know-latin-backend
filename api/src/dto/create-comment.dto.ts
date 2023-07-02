import { IsNotEmpty, IsString} from "class-validator";
import { User } from '../schemas/users.schema';

export class CreateCommentDto {
@IsNotEmpty()   
@IsString()
readonly title:string;

@IsNotEmpty()
@IsString()
readonly comment:string;

@IsNotEmpty()
@IsString()
readonly username: User;
}