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
import { Section508 } from '../models';
import { Section508Repository } from '../repositories';

export class Section508Controller {
  constructor(
    @repository(Section508Repository)
    public section508Repository: Section508Repository,
  ) { }


  // Simple healthcheck function for the HTTP GET on /email-service.  The ALB is expecting a 200 for this
  @get('/acc-api/section508/health', {
    responses: {
      '204': {
        description: 'Healthcheck status ok',
      },
    },
  })
  async healthCheck(): Promise<String> {
    return "status: ok";
  }




  @post('/acc-api/section508', {
    responses: {
      '200': {
        description: 'Section508 model instance',
        content: { 'application/json': { schema: getModelSchemaRef(Section508) } },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Section508, { exclude: ['id'] }),
        },
      },
    })
    section508: Omit<Section508, 'id'>,
  ): Promise<Section508> {
    return this.section508Repository.create(section508);
  }





  @get('/acc-api/section508', {
    responses: {
      '200': {
        description: 'Array of Section508 model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(Section508) },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Section508)) filter?: Filter<Section508>,
  ): Promise<Section508[]> {
    return this.section508Repository.find(filter);
  }


  @get('/acc-api/section508/{id}', {
    responses: {
      '200': {
        description: 'Section508 model instance',
        content: { 'application/json': { schema: getModelSchemaRef(Section508) } },
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<Section508> {
    return this.section508Repository.findById(id);
  }

  @patch('/acc-api/section508/{id}', {
    responses: {
      '204': {
        description: 'Section508 PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Section508, { partial: true }),
        },
      },
    })
    section508: Section508,
  ): Promise<void> {
    await this.section508Repository.updateById(id, section508);
  }

}
