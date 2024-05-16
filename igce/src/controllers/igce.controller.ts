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
import { Igce } from '../models';
import { IgceRepository } from '../repositories';

export class IgceController {
  constructor(
    @repository(IgceRepository)
    public igceRepository: IgceRepository,
  ) { }


  // Simple healthcheck function for the HTTP GET on /email-service.  The ALB is expecting a 200 for this
  @get('/acc-api/igce/health', {
    responses: {
      '204': {
        description: 'Healthcheck status ok',
      },
    },
  })
  async healthCheck(): Promise<String> {
    return "status: ok";
  }

  @post('/acc-api/igce', {
    responses: {
      '200': {
        description: 'Igce model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Igce } } },
      },
    },
  })
  async create(@requestBody() igce: Igce): Promise<Igce> {
    return await this.igceRepository.create(igce);
  }



  @get('/acc-api/igce', {
    responses: {
      '200': {
        description: 'Array of Igce model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': Igce } },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Igce)) filter?: Filter<Igce>,
  ): Promise<Igce[]> {
    return await this.igceRepository.find(filter);
  }



  @get('/acc-api/igce/{id}', {
    responses: {
      '200': {
        description: 'Igce model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Igce } } },
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<Igce> {
    return await this.igceRepository.findById(id);
  }

  @patch('/acc-api/igce/{id}', {
    responses: {
      // '204': {
      //   description: 'Igce PATCH success',
      // }, '403': {
      //   description: 'End date error',
      // },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody() igce: Igce,
  ): Promise<void> {
    let dateValidated : boolean = true;
    console.log("optionYears "+igce.optionYears);
    //var optionYearCount = 0;
    if(igce.optionYears === undefined || igce.optionYears.length == 1){
      console.log("igce.optionYears is undefined or or length is 1");
      
    } else{
     //optionYearCount = igce.optionYears.length ;
    try{
     //optionYearCount = igce.optionYears.length ;
    for (let oy = 1; oy < igce.optionYears.length; oy++) {
      console.log("processing optionYears["+oy+"]");
    if(igce.optionYears !== undefined && igce.optionYears.length > 1
      && igce.optionYears[(oy-1)]["endDate"] !== undefined && igce.optionYears[(oy-1)]["endDate"] != ''
      && igce.optionYears[oy]["startDate"] !== undefined && igce.optionYears[oy]["startDate"] != ''){
            console.log("newEndDate of optionYears["+oy+"] is undefined or empty or newStartDate is undefined or empty");
                  
                    var d1  = Date.parse(igce.optionYears[(oy-1)]["endDate"]);
                    console.log("d1 "+d1);
                     var d2 = Date.parse(igce.optionYears[oy]["startDate"]);
                     if(d2 < d1 ){
                      console.log("validating optionYears["+oy+"] new start Date ");
                      dateValidated  = false;
                      throw new Error('newStartDate should not be prior than '+igce.optionYears[oy-1]["endDate"]);
                    }
                     
                     if(igce.optionYears[oy]["endDate"] !== undefined && igce.optionYears[oy]["endDate"] != '' ){
                      console.log("validating optionYears["+oy+"] new end Date ");
                      var d3 = Date.parse(igce.optionYears[oy]["endDate"]);
                      console.log("d2 "+d2);
                      console.log("d3 "+d3);
                        if( d3 < d2){
                          dateValidated  = false;
                          throw new Error('newStartDate should not be prior than '+igce.optionYears[oy]["endDate"]);
                          
                        }
                    //  }else
                    //  {
                    //   if(d2 < d1 ){
                    //     console.log("validating optionYears["+oy+"] new start Date ");
                    //     dateValidated  = false;
                    //     throw new Error('newStartDate should not be prior than '+igce.optionYears[oy-1]["endDate"]);
                    //   }
                      }

            
            
     }else{
       console.log("Either optionYears is undefined or optionYears length is not 2 or original end date is undefined or empty  or newStartDate is undefined or empty");
       dateValidated  = false;
       throw new Error("Either optionYears is undefined or optionYears length is not 2 or original end date is undefined or empty  or newStartDate is undefined or empty");

      }
    }
    }catch(error)
    {
      dateValidated  = false;
      error = {
        "error": {
          "statusCode": 403,
          "message": "Date validation failed"
        }
      }

      return error ;
    }
  }
    if(dateValidated){
      console.log("New start date is good to save ");
      await this.igceRepository.updateById(id, igce);
    }
  }


  
  @del('/acc-api/igce/{id}', {
    responses: {
      '204': {
        description: 'IGCE DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.igceRepository.deleteById(id);
  }

}
