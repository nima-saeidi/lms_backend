import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User, UserSchema } from './schemas/user.schema';
import { RolesGuard } from '../auth/roles.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';


@Module({
imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
providers: [UsersService, RolesGuard, JwtAuthGuard],
controllers: [UsersController],
exports: [UsersService],
})
export class UsersModule {}