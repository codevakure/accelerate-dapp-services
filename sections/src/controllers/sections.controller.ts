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
import { Sections } from '../models';
import { SectionsRepository } from '../repositories';

export class SectionsController {
  constructor(
    @repository(SectionsRepository)
    public sectionsRepository: SectionsRepository,
  ) { }


  // Simple healthcheck function for the HTTP GET on /email-service.  The ALB is expecting a 200 for this
  @get('/acc-api/sections/health', {
    responses: {
      '204': {
        description: 'Healthcheck status ok',
      },
    },
  })
  async healthCheck(): Promise<String> {
    return "status: ok";
  }

  @post('/acc-api/sections', {
    responses: {
      '200': {
        description: 'Sections model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Sections } } },
      },
    },
  })
  async create(@requestBody() sections: Sections): Promise<Sections> {
    return await this.sectionsRepository.create(sections);
  }

  @get('/acc-api/sections', {
    responses: {
      '200': {
        description: 'Array of Sections model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': Sections } },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Sections)) filter?: Filter<Sections>,
  ): Promise<Sections[]> {
    return await this.sectionsRepository.find(filter);
  }

  @get('/acc-api/sections/{id}', {
    responses: {
      '200': {
        description: 'Sections model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Sections } } },
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<Sections> {
    return await this.sectionsRepository.findById(id);
  }

  @patch('/acc-api/sections/{id}', {
    responses: {
      '204': {
        description: 'Sections PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody() sections: Sections,
  ): Promise<void> {
    await this.sectionsRepository.updateById(id, sections);
  }

}
