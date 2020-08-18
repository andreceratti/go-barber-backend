import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentsRepository();
    createAppointment = new CreateAppointmentService(fakeAppointmentRepository);
  });
  it('should be able to create a new appointment', async () => {
    const appointment = await createAppointment.execute({
      date: new Date(),
      user_id: '123123',
      provider_id: '69420',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('69420');
  });

  it('should not be able to create two appointments on the same time', async () => {
    const appintmentDate = new Date(2020, 4, 10, 11);

    await createAppointment.execute({
      date: appintmentDate,
      user_id: '123123',
      provider_id: '69420',
    });

    await expect(
      createAppointment.execute({
        date: appintmentDate,
        user_id: '123123',
        provider_id: '69420',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
