import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import { Notification } from '../models';
import { NotificationRepository } from '../repositories';
var nodemailer = require('nodemailer');
var loopback = require("loopback");
var path = require('path');

export class NotificationController {
  constructor(
    @repository(NotificationRepository)
    public notificationRepository: NotificationRepository,
  ) { }

  // Simple healthcheck function for the HTTP GET on /email-service.  The ALB is expecting a 200 for this
  @get('/acc-api/notification/health', {
    responses: {
      '204': {
        description: 'Healthcheck status ok',
      },
    },
  })
  async healthCheck(): Promise<String> {
    return "status: ok";
  }

  @post('/acc-api/notification', {
    responses: {
      '200': {
        description: 'Notification model instance',
        content: { 'application/json': { schema: getModelSchemaRef(Notification) } },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Notification, { exclude: ['id'] }),
        },
      },
    })
    notification: Omit<Notification, ' id'>,
  ): Promise<Notification> {
    return this.notificationRepository.create(notification);
  }


  @get('/acc-api/notification', {
    responses: {
      '200': {
        description: 'Array of Notification model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(Notification) },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Notification)) filter?: Filter<Notification>,
  ): Promise<Notification[]> {
    return this.notificationRepository.find(filter);
  }


  @get('/acc-api/notification/{id}', {
    responses: {
      '200': {
        description: 'Notification model instance',
        content: { 'application/json': { schema: getModelSchemaRef(Notification) } },
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<Notification> {
    return this.notificationRepository.findById(id);
  }

  @patch('/acc-api/notification/{id}', {
    responses: {
      '204': {
        description: 'Notification PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Notification, { partial: true }),
        },
      },
    })
    notification: Notification,
  ): Promise<void> {
    await this.notificationRepository.updateById(id, notification);
  }


  @post('/acc-api/notification/sendNotificationEmail', {
    responses: {
      '200': {
        description: 'Notification instance',
        content: { 'application/json': { schema: { 'x-ts-type': Notification } } },
      },
    },
  })
  async sendNotification(@requestBody() notification: Notification): Promise<Notification> {
    console.log("model values " + notification);
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
    // var renderer = loopback.template(path.join(__dirname, '../views/' + notification.templateName + '.ejs'));
    // var html_body = renderer(notification);

    const mailOptions = {
      from: process.env.SMTP_USERNAME,
      to: notification.to,
      subject: notification.subject,
      html: notification.body
    }

    //console.log("Transporter" +transporter + "mailoptions"+ mailOptions)

    try {

      await transporter.sendMail(mailOptions);
    } catch (err) {
      console.error("Error occured:" + err)
    }
    return notification;
  }

}




