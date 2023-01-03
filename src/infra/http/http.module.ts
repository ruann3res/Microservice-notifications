import {
  SendNotification,
  CancelNotification,
  ReadNotification,
  CountRecipientNotification,
  UnreadNotification,
  GetRecipientNotifications,
} from '@application/use-cases';
import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { NotificationsController } from './controllers/notifications.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [
    SendNotification,
    CancelNotification,
    ReadNotification,
    CountRecipientNotification,
    UnreadNotification,
    GetRecipientNotifications,
  ],
})
export class HttpModule {}
