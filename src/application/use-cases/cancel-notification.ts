import { Injectable } from '@nestjs/common';
import { NotificationNotFound } from '../../utils/errors/notification-not-found-error';
import { NotificationsRepository } from '../repositories/notification-repository';

interface CancelNotificationRequest {
  notificationId: string;
}

type CancelNotificationResponse = void;

@Injectable()
export class CancelNotification {
  constructor(
    private readonly notificationsRepository: NotificationsRepository,
  ) {}

  async execute(
    request: CancelNotificationRequest,
  ): Promise<CancelNotificationResponse> {
    const { notificationId } = request;

    const notification = await this.notificationsRepository.findById(
      notificationId,
    );
    if (!notification) {
      throw new NotificationNotFound();
    }
    notification.cancel();

    await this.notificationsRepository.save(notification);
  }
}
