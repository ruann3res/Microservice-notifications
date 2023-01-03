import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications.repository';
import { GetRecipientNotifications } from '@application/use-cases/get-recipient-notifications';

describe('Get recipients notifications', () => {
  it('should be able to get recipient notification', async () => {
    const notificationRepository = new InMemoryNotificationsRepository();
    const getRecipientNotifications = new GetRecipientNotifications(
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

    const { notifications } = await getRecipientNotifications.execute({
      recipientId: 'any-recipient-id-1',
    });

    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: 'any-recipient-id-1' }),
        expect.objectContaining({ recipientId: 'any-recipient-id-1' }),
      ]),
    );
  });
});
