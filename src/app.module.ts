import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ArtistsModule } from './artists/artists.module';
import { UsersModule } from './users/users.module';
import { AlbumsModule } from './albums/albums.module';
import { TracksModule } from './tracks/tracks.module';
import { FavouritesModule } from './favourites/favourites.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import ormconfig from './ormconf';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LoggerMiddleware } from './logger.middleware';
import { LoggerModule } from './logger/logger.module';
import { AllExceptionsFilter } from './http-exception.filter';

@Module({
  imports: [
    ArtistsModule,
    UsersModule,
    AlbumsModule,
    TracksModule,
    FavouritesModule,
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '../.env' }),
    TypeOrmModule.forRoot(ormconfig),
    AuthModule,
    LoggerModule,
  ],
  controllers: [],
  providers: [
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
