import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
  });
  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      email: 'va.dias@gmail.com',
      name: 'Vagner Dias',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not create a user with a email already registered', async () => {
    await createUser.execute({
      email: 'teste@teste.com',
      name: 'Joselito Sem Noção',
      password: '123456',
    });

    await expect(
      createUser.execute({
        email: 'teste@teste.com',
        name: 'Joselito Sem Noção',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
