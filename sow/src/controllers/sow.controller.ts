import {Filter, repository} from '@loopback/repository';
import {get, getModelSchemaRef,getFilterSchemaFor, param, patch, post, requestBody} from '@loopback/rest';
import {Sow} from '../models';
import {SowRepository} from '../repositories';

export class SowController {
  constructor(
    @repository(SowRepository)
    public sowRepository: SowRepository,
  ) {}

  // Simple healthcheck function for the HTTP GET on /email-service.  The ALB is expecting a 200 for this
  @get('/acc-api/sow/health', {
    responses: {
      '204': {
        description: 'Healthcheck status ok',
      },
    },
  })
  async healthCheck(): Promise<String> {
    return "status: ok";
  }
  @post('/acc-api/sow/remote', {
    responses: {
      '200': {
        description: 'Sow model instance',
        content: {'application/json': {schema: getModelSchemaRef(Sow)}},
      },
    },
  })
  async createRemote(@param.query.string('jwt') jwt: string, @requestBody({
    content: {
      'application/json': {
        schema: getModelSchemaRef(Sow),
      },
    },
  }) sow: Sow): Promise<Sow> {
    console.log("token received " + jwt);
    return await this.sowRepository.create(sow);
  }

  @post('/acc-api/sow', {
    responses: {
      '200': {
        description: 'Sow model instance',
        content: {'application/json': {schema: {'x-ts-type': Sow}}},
      },
    },
  })
  async create(@requestBody() sow: Sow): Promise<Sow> {
    return await this.sowRepository.create(sow);
  }


  @get('/acc-api/sow', {
    responses: {
      '200': {
        description: 'Array of Sow model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': Sow}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Sow)) filter?: Filter<Sow>,
    //@param.query.object('filter') filter?: Filter,
  ): Promise<Sow[]> {
    console.log("SOW filter " + JSON.stringify(filter));

    return await this.sowRepository.find(filter);
  }

  @get('/acc-api/sow/{id}', {
    responses: {
      '200': {
        description: 'Sow model instance',
        content: {'application/json': {schema: {'x-ts-type': Sow}}},
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<Sow> {
    return await this.sowRepository.findById(id);
  }

  @patch('/acc-api/sow/{id}', {
    responses: {
      '204': {
        description: 'Sow PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody() sow: Sow,
  ): Promise<void> {
    await this.sowRepository.updateById(id, sow);
  }


}
