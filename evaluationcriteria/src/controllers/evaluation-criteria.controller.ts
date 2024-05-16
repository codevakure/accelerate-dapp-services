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
import { EvaluationCriteria } from '../models';
import { EvaluationCriteriaRepository } from '../repositories';

export class EvaluationCriteriaController {
  constructor(
    @repository(EvaluationCriteriaRepository)
    public evaluationCriteriaRepository: EvaluationCriteriaRepository,
  ) { }

  
  // Simple healthcheck function for the HTTP GET on /email-service.  The ALB is expecting a 200 for this
  @get('/acc-api/evaluation-criteria/health', {
    responses: {
      '204': {
        description: 'Healthcheck status ok',
      },
    },
  })
  async healthCheck(): Promise<String> {
    return "status: ok";
  }

  @post('/acc-api/evaluation-criteria', {
    responses: {
      '200': {
        description: 'EvaluationCriteria model instance',
        content: {
          'application/json': { schema: { 'x-ts-type': EvaluationCriteria } },
        },
      },
    },
  })
  async create(
    @requestBody() evaluationCriteria: EvaluationCriteria,
  ): Promise<EvaluationCriteria> {
    return await this.evaluationCriteriaRepository.create(evaluationCriteria);
  }


  @get('/acc-api/evaluation-criteria', {
    responses: {
      '200': {
        description: 'Array of EvaluationCriteria model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': EvaluationCriteria } },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(EvaluationCriteria))
    filter?: Filter<EvaluationCriteria>,
  ): Promise<EvaluationCriteria[]> {
    return await this.evaluationCriteriaRepository.find(filter);
  }


  @get('/acc-api/evaluation-criteria/{id}', {
    responses: {
      '200': {
        description: 'EvaluationCriteria model instance',
        content: {
          'application/json': { schema: { 'x-ts-type': EvaluationCriteria } },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
  ): Promise<EvaluationCriteria> {
    return await this.evaluationCriteriaRepository.findById(id);
  }

  @patch('/acc-api/evaluation-criteria/{id}', {
    responses: {
      '204': {
        description: 'EvaluationCriteria PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody() evaluationCriteria: EvaluationCriteria,
  ): Promise<void> {
    await this.evaluationCriteriaRepository.updateById(id, evaluationCriteria);
  }

}
