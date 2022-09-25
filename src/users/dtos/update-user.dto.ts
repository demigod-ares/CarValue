import { IsEmail, IsString, IsOptional, IsBoolean } from 'class-validator';

export class UpdateUserDto {
  @IsEmail()
  @IsOptional()
  email: string | undefined;

  @IsString()
  @IsOptional()
  password: string | undefined;

  @IsString()
  @IsOptional()
  username: string | undefined;

  @IsBoolean()
  @IsOptional()
  admin: boolean | undefined;
}
