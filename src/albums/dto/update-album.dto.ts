import {
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  ValidateIf,
} from 'class-validator';

export class UpdateAlbumDto {
  @IsString()
  // @IsOptional()
  name: string;

  @IsNumber()
  // @IsOptional()
  year: number;

  @IsUUID()
  // @IsOptional()
  @ValidateIf((_, value) => value !== null)
  artistId: string | null;
}
