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
import { Consideration } from '../models';
import { ConsiderationRepository } from '../repositories';

export class ConsiderationController {
  constructor(
    @repository(ConsiderationRepository)
    public considerationRepository: ConsiderationRepository,
  ) { }


  // Simple healthcheck function for the HTTP GET on /email-service.  The ALB is expecting a 200 for this
  @get('/acc-api/consideration/health', {
    responses: {
      '204': {
        description: 'Healthcheck status ok',
      },
    },
  })
  async healthCheck(): Promise<String> {
    return "status: ok";
  }



  @post('/acc-api/consideration', {
    responses: {
      '200': {
        description: 'Consideration model instance',
        content: { 'application/json': { schema: getModelSchemaRef(Consideration) } },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Consideration, { exclude: ['id'] }),
        },
      },
    })
    consideration: Omit<Consideration, 'id'>,
  ): Promise<Consideration> {
    return this.considerationRepository.create(consideration);
  }

  // @get('/acc-api/consideration/count', {
  //   responses: {
  //     '200': {
  //       description: 'Consideration model count',
  //       content: { 'application/json': { schema: CountSchema } },
  //     },
  //   },
  // })
  // async count(
  //   @param.query.object('where', getWhereSchemaFor(Consideration)) where?: Where<Consideration>,
  // ): Promise<Count> {
  //   return this.considerationRepository.count(where);
  // }

  @get('/acc-api/consideration', {
    responses: {
      '200': {
        description: 'Array of Consideration model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(Consideration) },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Consideration)) filter?: Filter<Consideration>,
  ): Promise<Consideration[]> {
    return this.considerationRepository.find(filter);
  }

  @patch('/acc-api/consideration', {
    responses: {
      '200': {
        description: 'Consideration PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Consideration, { partial: true }),
        },
      },
    })
    consideration: Consideration,
    @param.query.object('where', getWhereSchemaFor(Consideration)) where?: Where<Consideration>,
  ): Promise<Count> {
    return this.considerationRepository.updateAll(consideration, where);
  }

  @get('/acc-api/consideration/{id}', {
    responses: {
      '200': {
        description: 'Consideration model instance',
        content: { 'application/json': { schema: getModelSchemaRef(Consideration) } },
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<Consideration> {
    return this.considerationRepository.findById(id);
  }

  @patch('/acc-api/consideration/{id}', {
    responses: {
      '204': {
        description: 'Consideration PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Consideration, { partial: true }),
        },
      },
    })
    consideration: Consideration,
  ): Promise<void> {
    await this.considerationRepository.updateById(id, consideration);
  }

  // @put('/acc-api/consideration/{id}', {
  //   responses: {
  //     '204': {
  //       description: 'Consideration PUT success',
  //     },
  //   },
  // })
  // async replaceById(
  //   @param.path.string('id') id: string,
  //   @requestBody() consideration: Consideration,
  // ): Promise<void> {
  //   await this.considerationRepository.replaceById(id, consideration);
  // }

  // @del('/acc-api/consideration/{id}', {
  //   responses: {
  //     '204': {
  //       description: 'Consideration DELETE success',
  //     },
  //   },
  // })
  // async deleteById(@param.path.string('id') id: string): Promise<void> {
  //   await this.considerationRepository.deleteById(id);
  // }
}
