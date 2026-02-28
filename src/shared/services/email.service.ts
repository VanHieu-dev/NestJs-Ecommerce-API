import { Injectable } from '@nestjs/common'
import { Resend } from 'resend'

@Injectable()
export class EmailService {
  private resend: Resend
  constructor() {
    this.resend = new Resend(process.env.API_KEY_RESEND)
  }
  sendOTP(payload: { email: string; code: string }) {
    return this.resend.emails.send({
      from: 'Nestjs Ecommerce <no-replay@vanhieule.id.vn>',
      to: `${payload.email}`,
      subject: 'Backend send Email',
      html: `<p><h3>OTP Login Facebook</h3> ${payload.code}</p>`,
    })
  }
}
