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
import { Clauses } from '../models';
import { ClausesRepository } from '../repositories';

export class ClausesController {
  constructor(
    @repository(ClausesRepository)
    public clausesRepository: ClausesRepository,
  ) { }

  // Simple healthcheck function for the HTTP GET on /email-service.  The ALB is expecting a 200 for this
  @get('/acc-api/clauses/health', {
    responses: {
      '204': {
        description: 'Healthcheck status ok',
      },
    },
  })
  async healthCheck(): Promise<String> {
    return "status: ok";
  }

  @post('/acc-api/clauses', {
    responses: {
      '200': {
        description: 'Clauses model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Clauses } } },
      },
    },
  })
  async create(@requestBody() clauses: Clauses): Promise<Clauses> {
    return await this.clausesRepository.create(clauses);
  }

  // @get('/acc-api/clauses/count', {
  //   responses: {
  //     '200': {
  //       description: 'Clauses model count',
  //       content: { 'application/json': { schema: CountSchema } },
  //     },
  //   },
  // })
  // async count(
  //   @param.query.object('where', getWhereSchemaFor(Clauses)) where?: Where,
  // ): Promise<Count> {
  //   return await this.clausesRepository.count(where);
  // }

  @get('/acc-api/clauses', {
    responses: {
      '200': {
        description: 'Array of Clauses model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': Clauses } },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Clauses)) filter?: Filter<Clauses>,
  ): Promise<Clauses[]> {
    return await this.clausesRepository.find(filter);
  }

  // @patch('/acc-api/clauses', {
  //   responses: {
  //     '200': {
  //       description: 'Clauses PATCH success count',
  //       content: { 'application/json': { schema: CountSchema } },
  //     },
  //   },
  // })
  // async updateAll(
  //   @requestBody() clauses: Clauses,
  //   @param.query.object('where', getWhereSchemaFor(Clauses)) where?: Where,
  // ): Promise<Count> {
  //   return await this.clausesRepository.updateAll(clauses, where);
  // }

  @get('/acc-api/clauses/{id}', {
    responses: {
      '200': {
        description: 'Clauses model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Clauses } } },
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<Clauses> {
    return await this.clausesRepository.findById(id);
  }

  @patch('/acc-api/clauses/{id}', {
    responses: {
      '204': {
        description: 'Clauses PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody() clauses: Clauses,
  ): Promise<void> {
    await this.clausesRepository.updateById(id, clauses);
  }

  // @put('/acc-api/clauses/{id}', {
  //   responses: {
  //     '204': {
  //       description: 'Clauses PUT success',
  //     },
  //   },
  // })
  // async replaceById(
  //   @param.path.string('id') id: string,
  //   @requestBody() clauses: Clauses,
  // ): Promise<void> {
  //   await this.clausesRepository.replaceById(id, clauses);
  // }

  @del('/acc-api/clauses/{id}', {
    responses: {
      '204': {
        description: 'Clauses DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.clausesRepository.deleteById(id);
  }
}
