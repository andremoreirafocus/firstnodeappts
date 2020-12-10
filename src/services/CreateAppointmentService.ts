import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface Request {
  provider_id: string;
  date: Date;
}

class CreateAppointmentService {
  // private appointmentsRepository: AppointmentsRepository;

  // constructor(appointmentsRepository: AppointmentsRepository) {
  //   this.appointmentsRepository = appointmentsRepository;
  // }

  public async execute({ provider_id, date }: Request): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository)
    const appointmentDate = startOfHour(date);

    const foundAppointmentAtSameDate = await appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (foundAppointmentAtSameDate)
      throw Error('The requestd time/date is already booked!');

    const appointment = appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;
