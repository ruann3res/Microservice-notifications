import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications.repository';
import { CountRecipientNotification } from '@application/use-cases/count-recipient-notification';

describe('Count recipients notifications', () => {
  it('should be able to count recipient notification', async () => {
    const notificationRepository = new InMemoryNotificationsRepository();
    const countRecipientNotification = new CountRecipientNotification(
      notificationRepository,
    );

    await notificationRepository.create(
      makeNotification({ recipientId: 'any-recipient-id-1' }),
    );
    await notificationRepository.create(
      makeNotification({ recipientId: 'any-recipient-id-1' }),
    );
    await notificationRepository.create(
      makeNotification({ recipientId: 'any-recipient-id-2' }),
    );

    const { count } = await countRecipientNotification.execute({
      recipientId: 'any-recipient-id-1',
    });

    expect(count).toEqual(2);
  });
});
