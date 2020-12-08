import { isEqual } from 'date-fns';
import Appointment from '../models/Appointment';

import { EntityRepository, Repository } from 'typeorm';

// interface CreateAppointmentDTO {
//   provider: string;
//   date: Date;
// }

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment>{
  // private appointments: Appointment[];

  // constructor() {
  //   this.appointments = [];
  // }

  // public all(): Appointment[] {
  //   return this.appointments;
  // }

  // public create({ provider, date }: CreateAppointmentDTO): Appointment {
  //   const appointment = new Appointment({ provider, date });

  //   this.appointments.push(appointment);

  //   return appointment;
  // }

  public async findByDate(date: Date): Promise<Appointment | null> {
    // const foundAppointment = this.appointments.find(appointment =>
    //   isEqual(date, appointment.date),
    // );

    const foundAppointment = await this.findOne({
      where: { date: date }
    })

    return foundAppointment || null;
  }
}

export default AppointmentsRepository;
