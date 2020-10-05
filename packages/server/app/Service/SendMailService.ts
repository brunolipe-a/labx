import Mail from '@ioc:Adonis/Addons/Mail'
import Env from '@ioc:Adonis/Core/Env'

interface SendMailServiceDTO {
  email: string
  name?: string
  data?: unknown
  html: string
  subject: string
}

export default class SendMailService {
  public static send({ email, html, subject, data, name }: SendMailServiceDTO) {
    Mail.send(message => {
      message
        .from(Env.get('MAIL_FROM') as string)
        .to(email, name)
        .subject(`Labx - ${subject}`)
        .htmlView(html, data)
    })
  }
}
