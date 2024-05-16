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
import { Feedback } from '../models';
import { FeedbackRepository } from '../repositories';

export class FeedbackController {
  constructor(
    @repository(FeedbackRepository)
    public feedbackRepository: FeedbackRepository,
  ) { }


  // Simple healthcheck function for the HTTP GET on /feedback-service.  The ALB is expecting a 200 for this
  @get('/acc-api/feedback/health', {
    responses: {
      '204': {
        description: 'Healthcheck status ok',
      },
    },
  })
  async healthCheck(): Promise<String> {
    return "status: ok";
  }

  @post('/acc-api/feedback', {
    responses: {
      '200': {
        description: 'Feedback model instance',
        content: { 'application/json': { schema: getModelSchemaRef(Feedback) } },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Feedback, { exclude: ['id'] }),
        },
      },
    })
    feedback: Omit<Feedback, 'id'>,
  ): Promise<Feedback> {
    return this.feedbackRepository.create(feedback);
  }

  // @get('/acc-api/feedback/count', {
  //   responses: {
  //     '200': {
  //       description: 'Feedback model count',
  //       content: { 'application/json': { schema: CountSchema } },
  //     },
  //   },
  // })
  // async count(
  //   @param.query.object('where', getWhereSchemaFor(Feedback)) where?: Where<Feedback>,
  // ): Promise<Count> {
  //   return this.feedbackRepository.count(where);
  // }

  @get('/acc-api/feedback', {
    responses: {
      '200': {
        description: 'Array of Feedback model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(Feedback) },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Feedback)) filter?: Filter<Feedback>,
  ): Promise<Feedback[]> {
    return this.feedbackRepository.find(filter);
  }

  // @patch('/acc-api/feedback', {
  //   responses: {
  //     '200': {
  //       description: 'Feedback PATCH success count',
  //       content: { 'application/json': { schema: CountSchema } },
  //     },
  //   },
  // })
  // async updateAll(
  //   @requestBody({
  //     content: {
  //       'application/json': {
  //         schema: getModelSchemaRef(Feedback, { partial: true }),
  //       },
  //     },
  //   })
  //   feedback: Feedback,
  //   @param.query.object('where', getWhereSchemaFor(Feedback)) where?: Where<Feedback>,
  // ): Promise<Count> {
  //   return this.feedbackRepository.updateAll(feedback, where);
  // }

  @get('/acc-api/feedback/{id}', {
    responses: {
      '200': {
        description: 'Feedback model instance',
        content: { 'application/json': { schema: getModelSchemaRef(Feedback) } },
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<Feedback> {
    return this.feedbackRepository.findById(id);
  }

  @patch('/acc-api/feedback/{id}', {
    responses: {
      '204': {
        description: 'Feedback PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Feedback, { partial: true }),
        },
      },
    })
    feedback: Feedback,
  ): Promise<void> {
    await this.feedbackRepository.updateById(id, feedback);
  }

  // @put('/acc-api/feedback/{id}', {
  //   responses: {
  //     '204': {
  //       description: 'Feedback PUT success',
  //     },
  //   },
  // })
  // async replaceById(
  //   @param.path.string('id') id: string,
  //   @requestBody() feedback: Feedback,
  // ): Promise<void> {
  //   await this.feedbackRepository.replaceById(id, feedback);
  // }

  @del('/acc-api/feedback/{id}', {
    responses: {
      '204': {
        description: 'Feedback DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.feedbackRepository.deleteById(id);
  }
}
