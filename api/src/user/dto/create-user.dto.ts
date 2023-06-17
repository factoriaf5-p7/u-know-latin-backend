export class CreateUserDto {
  id: number;
  name: string;
  user_name: string;
  password: string;
  email: string;
  wallet_balance: number;
  chat: string;
  id_published_content: number[];
  id_bought_content: number[];
  created_at: Date;
  created_update: Date;
}
