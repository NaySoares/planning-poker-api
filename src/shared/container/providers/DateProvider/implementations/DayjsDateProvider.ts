import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

import { IDateProvider } from '../IDateProvider'

dayjs.extend(utc)

class DayjsDateProvider implements IDateProvider {
  compareHours(startDate: Date, endDate: Date): number {
    const endDateUtc = this.convertToUTC(endDate)
    const startDateUtc = this.convertToUTC(startDate)

    return dayjs(endDateUtc).diff(startDateUtc, 'hours')
  }

  convertToUTC(date: Date): string {
    return dayjs(date).utc().local().format()
  }

  dateNow(): Date {
    return dayjs().toDate()
  }

  addDays(days: number): Date {
    return dayjs().add(days, 'day').toDate()
  }
}

export { DayjsDateProvider }
