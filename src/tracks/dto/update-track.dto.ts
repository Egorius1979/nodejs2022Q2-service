import { IsNumber, IsOptional, IsString, ValidateIf } from 'class-validator';

export class UpdateTrackDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  @ValidateIf((_, value) => value !== null)
  artistId: string | null;

  @IsString()
  @IsOptional()
  @ValidateIf((_, value) => value !== null)
  albumId: string | null;

  @IsNumber()
  @IsOptional()
  duration: number;
}
