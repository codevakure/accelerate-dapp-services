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
import { Tradeoffs } from '../models';
import { TradeoffsRepository } from '../repositories';

export class TradeoffsController {
  constructor(
    @repository(TradeoffsRepository)
    public tradeoffsRepository: TradeoffsRepository,
  ) { }

  // Simple healthcheck function for the HTTP GET on /email-service.  The ALB is expecting a 200 for this
  @get('/acc-api/tradeoffs/health', {
    responses: {
      '204': {
        description: 'Healthcheck status ok',
      },
    },
  })
  async healthCheck(): Promise<String> {
    return "status: ok";
  }
  @post('/acc-api/tradeoffs', {
    responses: {
      '200': {
        description: 'Tradeoffs model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Tradeoffs } } },
      },
    },
  })
  async create(@requestBody() tradeoffs: Tradeoffs): Promise<Tradeoffs> {
    return await this.tradeoffsRepository.create(tradeoffs);
  }

  @get('/acc-api/tradeoffs', {
    responses: {
      '200': {
        description: 'Array of Tradeoffs model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': Tradeoffs } },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Tradeoffs)) filter?: Filter<Tradeoffs>,
  ): Promise<Tradeoffs[]> {
    return await this.tradeoffsRepository.find(filter);
  }

  @get('/acc-api/tradeoffs/{id}', {
    responses: {
      '200': {
        description: 'Tradeoffs model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Tradeoffs } } },
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<Tradeoffs> {
    return await this.tradeoffsRepository.findById(id);
  }

  @patch('/acc-api/tradeoffs/{id}', {
    responses: {
      '204': {
        description: 'Tradeoffs PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody() tradeoffs: Tradeoffs,
  ): Promise<void> {
    await this.tradeoffsRepository.updateById(id, tradeoffs);
  }

}
