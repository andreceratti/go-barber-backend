import AppError from '@shared/errors/AppError';

import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

import UpdateAvatarService from './UpdateUserAvatarService';

let fakeUsersRepository: FakeUsersRepository;
let fakeStorageProvider: FakeStorageProvider;
let updateUserAvatar: UpdateAvatarService;

describe('UpdateUserAvatar', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeStorageProvider = new FakeStorageProvider();

    updateUserAvatar = new UpdateAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );
  });
  it('should be able to update a avatar', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Minalva Cruz',
      email: 'mimi@bol.com',
      password: '123456',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'meu_avatar_maneiro.bmp',
    });

    expect(user.avatar).toBe('meu_avatar_maneiro.bmp');
  });
  it('should not be able to update a avatar without a user', async () => {
    await expect(
      updateUserAvatar.execute({
        user_id: 'user.id',
        avatarFilename: 'meu_avatar_maneiro.bmp',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should delete old avatar when updating a new one', async () => {
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const user = await fakeUsersRepository.create({
      name: 'Minalva Cruz',
      email: 'mimi@bol.com',
      password: '123456',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'meu_avatar_maneiro.bmp',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'novo_avatar_maneiro.bmp',
    });

    expect(deleteFile).toHaveBeenCalledWith('meu_avatar_maneiro.bmp');
    expect(user.avatar).toBe('novo_avatar_maneiro.bmp');
  });
});
