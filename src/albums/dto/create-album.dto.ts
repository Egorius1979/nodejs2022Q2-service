import { IsNumber, IsString, IsUUID, ValidateIf } from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  name: string;

  @IsNumber()
  year: number;

  @IsUUID()
  @ValidateIf((_, value) => value !== null)
  artistId: string | null;
}
