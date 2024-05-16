import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
  model,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import { EmailModel } from '../models';
var nodemailer = require('nodemailer');
var loopback = require("loopback");
var path = require('path');

export class EmailController {
  constructor() { }
  // Simple healthcheck function for the HTTP GET on /email-service.  The ALB is expecting a 200 for this
  @get('/acc-api/email-service/health', {
    responses: {
      '204': {
        description: 'Healthcheck status ok',
      },
    },
  })
  async healthCheck(): Promise<String> {
    return "status: ok";
  }

  @post('/acc-api/email-service/sendEmail', {
    responses: {
      '200': {
        description: 'Email model instance',
        content: { 'application/json': { schema: { 'x-ts-type': EmailModel } } },
      },
    },
  })
  async sendEmail(@requestBody() emailModel: EmailModel): Promise<EmailModel> {
    console.log("model values " + emailModel);
    let transporter = await nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      "tls": {
        "rejectUnauthorized": false
      },
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD
      }
    });


    // prepare a loopback template renderer
    var renderer = loopback.template(path.join(__dirname, '../views/' + emailModel.templateName + '.ejs'));
    var html_body = renderer(emailModel);

    const mailOptions = {
      from: emailModel.from,
      to: emailModel.to,
      subject: emailModel.subject,
      html: html_body
    }

    //console.log("Transporter" +transporter + "mailoptions"+ mailOptions)

    try {

      await transporter.sendMail(mailOptions);
    } catch (err) {
      console.error("Error occured:" + err)
    }
    return emailModel;
  }

}
