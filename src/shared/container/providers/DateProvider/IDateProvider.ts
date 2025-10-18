interface IDateProvider {
  compareHours(start_date: Date, end_Date: Date): number
  convertToUTC(date: Date): string
  dateNow(): Date
  addDays(days: number): Date
}

export { IDateProvider }
