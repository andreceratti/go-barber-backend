import AppError from '@shared/errors/AppError';

import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakehashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakehashProvider = new FakeHashProvider();

    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakehashProvider,
    );
  });

  it('should be able to update the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Minalva Cruz',
      email: 'mimi@bol.com',
      password: '123456',
    });

    const updateUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Mina Santa Cruz',
      email: 'mimimi@gmail.com',
    });

    expect(updateUser.name).toBe('Mina Santa Cruz');
    expect(updateUser.email).toBe('mimimi@gmail.com');
  });

  it('should not be able to change to a email already in use', async () => {
    await fakeUsersRepository.create({
      name: 'Carlos Alberto',
      email: 'carlao_fake@terra.com',
      password: '123456',
    });

    const user = await fakeUsersRepository.create({
      name: 'Minalva Cruz',
      email: 'mimi@bol.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Mina Santa Cruz',
        email: 'carlao_fake@terra.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Minalva Cruz',
      email: 'mimi@bol.com',
      password: '123456',
    });

    const updateUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Mina Santa Cruz',
      email: 'mimimi@gmail.com',
      old_password: '123456',
      password: '123123',
    });

    expect(updateUser.password).toBe('123123');
  });

  it('should not be able update password without old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Minalva Cruz',
      email: 'mimi@bol.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Mina Santa Cruz',
        email: 'mimimi@gmail.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able update password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Minalva Cruz',
      email: 'mimi@bol.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Mina Santa Cruz',
        email: 'mimimi@gmail.com',
        password: '123123',
        old_password: 'wrong',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be not able to update a non existent profile', async () => {
    await expect(
      updateProfile.execute({
        user_id: 'non-existing-user-id',
        email: 'Junior Junior',
        name: 'juniorjr@terravista',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
