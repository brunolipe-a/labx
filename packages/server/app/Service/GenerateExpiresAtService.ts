import { addMinutes } from 'date-fns'
import { DateTime } from 'luxon'

export default class GenerateExpiresAtService {
  public static generate(minutes = 30) {
    return DateTime.fromJSDate(addMinutes(new Date(), minutes))
  }
}
