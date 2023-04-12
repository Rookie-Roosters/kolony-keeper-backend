import { Module, NestModule, RequestMethod, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './modules/users/users.module';
import { DevicesModule } from './modules/devices/devices.module';
import { InterestGroupsModule } from './modules/interest-groups/interest-groups.module';
import { BusinessServicesModule } from './modules/business-services/business-services.module';
import { IncidentsModule } from './modules/incidents/incidents.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { BusinessGroupsModule } from './modules/business-groups/business-groups.module';
import { AuthModule } from './integrations/auth/auth.module';
import { AlertsModule } from './modules/alerts/alerts.module';
import { AuthMiddleware } from './integrations/auth/auth.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(
      process.env.MONGODB_CONNECTION_STRING,
    ),
    AuthModule,
    UsersModule,
    DevicesModule,
    NotificationsModule,
    InterestGroupsModule,
    BusinessGroupsModule,
    BusinessServicesModule,
    IncidentsModule,
    AlertsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
