// import AppError from '@shared/errors/AppError';

import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let listProviders: ListProvidersService;
let fakeCacheProvider: FakeCacheProvider;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeCacheProvider = new FakeCacheProvider();

    listProviders = new ListProvidersService(
      fakeUsersRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to list the providers', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'Arlindo Cruz',
      email: 'arliondo@bol.com',
      password: '123456',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'Detonator',
      email: 'filhododeusmetal@metal.com',
      password: '123456',
    });

    const user3 = await fakeUsersRepository.create({
      name: 'Joselito de Cascatinha',
      email: 'semnocao@bol.com',
      password: '123456',
    });

    const loggedUser = await fakeUsersRepository.create({
      name: 'Hermes',
      email: 'hermes@metal.com',
      password: '123456',
    });

    const providers = await listProviders.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual([user1, user2, user3]);
  });
});
