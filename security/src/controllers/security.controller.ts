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
import { Security } from '../models';
import { SecurityRepository } from '../repositories';

export class SecurityController {
  constructor(
    @repository(SecurityRepository)
    public securityRepository: SecurityRepository,
  ) { }


  // Simple healthcheck function for the HTTP GET on /email-service.  The ALB is expecting a 200 for this
  @get('/acc-api/security/health', {
    responses: {
      '204': {
        description: 'Healthcheck status ok',
      },
    },
  })
  async healthCheck(): Promise<String> {
    return "status: ok";
  }


  @post('/acc-api/security', {
    responses: {
      '200': {
        description: 'Security model instance',
        content: { 'application/json': { schema: getModelSchemaRef(Security) } },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Security, { exclude: ['id'] }),
        },
      },
    })
    security: Omit<Security, 'id'>,
  ): Promise<Security> {
    return this.securityRepository.create(security);
  }



  @get('/acc-api/security', {
    responses: {
      '200': {
        description: 'Array of Security model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(Security) },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Security)) filter?: Filter<Security>,
  ): Promise<Security[]> {
    return this.securityRepository.find(filter);
  }

  // @patch('/acc-api/security', {
  //   responses: {
  //     '200': {
  //       description: 'Security PATCH success count',
  //       content: {'application/json': {schema: CountSchema}},
  //     },
  //   },
  // })
  // async updateAll(
  //   @requestBody({
  //     content: {
  //       'application/json': {
  //         schema: getModelSchemaRef(Security, {partial: true}),
  //       },
  //     },
  //   })
  //   security: Security,
  //   @param.query.object('where', getWhereSchemaFor(Security)) where?: Where<Security>,
  // ): Promise<Count> {
  //   return this.securityRepository.updateAll(security, where);
  // }

  @get('/acc-api/security/{id}', {
    responses: {
      '200': {
        description: 'Security model instance',
        content: { 'application/json': { schema: getModelSchemaRef(Security) } },
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<Security> {
    return this.securityRepository.findById(id);
  }

  @patch('/acc-api/security/{id}', {
    responses: {
      '204': {
        description: 'Security PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Security, { partial: true }),
        },
      },
    })
    security: Security,
  ): Promise<void> {
    await this.securityRepository.updateById(id, security);
  }

  // @put('/acc-api/security/{id}', {
  //   responses: {
  //     '204': {
  //       description: 'Security PUT success',
  //     },
  //   },
  // })
  // async replaceById(
  //   @param.path.string('id') id: string,
  //   @requestBody() security: Security,
  // ): Promise<void> {
  //   await this.securityRepository.replaceById(id, security);
  // }

  // @del('/acc-api/security/{id}', {
  //   responses: {
  //     '204': {
  //       description: 'Security DELETE success',
  //     },
  //   },
  // })
  // async deleteById(@param.path.string('id') id: string): Promise<void> {
  //   await this.securityRepository.deleteById(id);
  // }
}
