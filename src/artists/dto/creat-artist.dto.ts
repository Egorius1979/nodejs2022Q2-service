import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class createArtistDto {
  // @IsString()
  // @IsOptional()
  // id: string;

  @IsString()
  name: string;

  @IsBoolean()
  grammy: boolean;
}
