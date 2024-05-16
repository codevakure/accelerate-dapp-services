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
import { Requisition } from '../models';
import { RequisitionRepository } from '../repositories';

export class RequistionController {
  constructor(
    @repository(RequisitionRepository)
    public requisitionRepository: RequisitionRepository,
  ) { }

  // Simple healthcheck function for the HTTP GET on /email-service.  The ALB is expecting a 200 for this
  @get('/acc-api/requisition/health', {
    responses: {
      '204': {
        description: 'Healthcheck status ok',
      },
    },
  })
  async healthCheck(): Promise<String> {
    return "status: ok";
  }

  @post('/acc-api/requisition', {
    responses: {
      '200': {
        description: 'Requisition model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Requisition } } },
      },
    },
  })
  async create(@requestBody() requisition: Requisition): Promise<Requisition> {
    return await this.requisitionRepository.create(requisition);
  }


  @get('/acc-api/requisition', {
    responses: {
      '200': {
        description: 'Array of Requisition model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': Requisition } },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Requisition)) filter?: Filter<Requisition>,
  ): Promise<Requisition[]> {
    return await this.requisitionRepository.find(filter);
  }


  @get('/acc-api/requisition/{id}', {
    responses: {
      '200': {
        description: 'Requisition model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Requisition } } },
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<Requisition> {
    return await this.requisitionRepository.findById(id);
  }

  @patch('/acc-api/requisition/{id}', {
    responses: {
      '204': {
        description: 'Requisition PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Requisition, { partial: true }),
        },
      },
    })
    requisition: Requisition,
  ): Promise<void> {
    await this.requisitionRepository.updateById(id, requisition);
  }

}
