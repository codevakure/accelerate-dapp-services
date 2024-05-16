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
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import { Compatibility } from '../models';
import { CompatibilityRepository } from '../repositories';

export class CompatibilityController {
  constructor(
    @repository(CompatibilityRepository)
    public compatibilityRepository: CompatibilityRepository,
  ) { }


  // Simple healthcheck function for the HTTP GET on /email-service.  The ALB is expecting a 200 for this
  @get('/acc-api/compatibilities/health', {
    responses: {
      '204': {
        description: 'Healthcheck status ok',
      },
    },
  })
  async healthCheck(): Promise<String> {
    return "status: ok";
  }
  @post('/acc-api/compatibilities', {
    responses: {
      '200': {
        description: 'Compatibility model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Compatibility } } },
      },
    },
  })
  async create(@requestBody() compatibility: Compatibility): Promise<Compatibility> {
    return await this.compatibilityRepository.create(compatibility);
  }

  // @get('/acc-api/compatibilities/count', {
  //   responses: {
  //     '200': {
  //       description: 'Compatibility model count',
  //       content: { 'application/json': { schema: CountSchema } },
  //     },
  //   },
  // })
  // async count(
  //   @param.query.object('where', getWhereSchemaFor(Compatibility)) where?: Where<Compatibility>,
  // ): Promise<Count> {
  //   return await this.compatibilityRepository.count(where);
  // }

  @get('/acc-api/compatibilities', {
    responses: {
      '200': {
        description: 'Array of Compatibility model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': Compatibility } },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Compatibility)) filter?: Filter<Compatibility>,
  ): Promise<Compatibility[]> {
    return await this.compatibilityRepository.find(filter);
  }

  // @patch('/acc-api/compatibilities', {
  //   responses: {
  //     '200': {
  //       description: 'Compatibility PATCH success count',
  //       content: { 'application/json': { schema: CountSchema } },
  //     },
  //   },
  // })
  // async updateAll(
  //   @requestBody() compatibility: Compatibility,
  //   @param.query.object('where', getWhereSchemaFor(Compatibility)) where?: Where<Compatibility>,
  // ): Promise<Count> {
  //   return await this.compatibilityRepository.updateAll(compatibility, where);
  // }

  @get('/acc-api/compatibilities/{id}', {
    responses: {
      '200': {
        description: 'Compatibility model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Compatibility } } },
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<Compatibility> {
    return await this.compatibilityRepository.findById(id);
  }

  @patch('/acc-api/compatibilities/{id}', {
    responses: {
      '204': {
        description: 'Compatibility PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody() compatibility: Compatibility,
  ): Promise<void> {
    await this.compatibilityRepository.updateById(id, compatibility);
  }

  // @put('/acc-api/compatibilities/{id}', {
  //   responses: {
  //     '204': {
  //       description: 'Compatibility PUT success',
  //     },
  //   },
  // })
  // async replaceById(
  //   @param.path.string('id') id: string,
  //   @requestBody() compatibility: Compatibility,
  // ): Promise<void> {
  //   await this.compatibilityRepository.replaceById(id, compatibility);
  // }

  // @del('/acc-api/compatibilities/{id}', {
  //   responses: {
  //     '204': {
  //       description: 'Compatibility DELETE success',
  //     },
  //   },
  // })
  // async deleteById(@param.path.string('id') id: string): Promise<void> {
  //   await this.compatibilityRepository.deleteById(id);
  // }
}
