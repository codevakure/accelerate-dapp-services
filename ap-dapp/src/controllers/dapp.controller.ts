import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
  FilterBuilder,
  AnyType,
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
  HttpErrors,
  api,
  operation,
} from '@loopback/rest';
import { Dapp } from '../models';
import { DappRepository } from '../repositories';
import { filterByKey } from '@loopback/core';
import { inject } from '@loopback/context';

const loopback = require("loopback");
const pEvent = require('p-event');
export class DappController {
  constructor(
    @repository(DappRepository)
    public dappRepository: DappRepository,
    //  @inject('services.IdService')
    //  protected idService: IdService,
  ) { }

  // Simple healthcheck function for the HTTP GET on /email-service.  The ALB is expecting a 200 for this
  @get('/acc-api/ap-dapp/health', {
    responses: {
      '204': {
        description: 'Healthcheck status ok',
      },
    },
  })
  async healthCheck(): Promise<String> {
    return "status: ok";
  }

  @post('/acc-api/ap-dapp/ap/create', {
    responses: {
      '200': {
        description: 'Dapp model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Dapp } } },
      }
      ,
    },
  })
  //async create(@param.header.string('Authorization') jwtToken: string, ): Promise<any> {
  async create(): Promise<any> {
    //const token: string = jwtToken.replace(/Bearer /g,'');
    const token: string = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJwa0lkIjoiNjYzMjA3ZDMtYjU1Yi00ODQ5LWI2NDktOGE0ZDA2NWRiZmY1IiwiaWQiOiJiMzlhMjQxMGIxNTAxNDYzOTE1ZjIwYmFmZGI0NTcxNTplOWQzMTlmYjMwMzAzZGJkNzM1MDYxZWZkN2RkMTJkNGVmNjZiYTZlNTNmMTM4YzAxNDMzZGJlOTZkYjg0NjFjM2ZmODQwNDY3NGRjNjhmN2VmNTY4YmI0ZDI0ZTU5NDA5N2FkODM0YzRiZGUwMjRiZjVlMTUzMmUzYzcxYTM2OWVhYjYzMDE0OGMxZTk4ZTA0MDQ3ZGNiNzVlMGVhM2I4MzQ1NzI5YzJiOTNhNWQyNWMxOGU4YjdkZThlYjM3ODE2NDZlY2E3YThjNzhjZDc2ZTU2MTI4NjdmNWIwYWQzYTZlZTA3NzE4MDc1N2IwYTczYTc3NjVhMWZiMGU2MzdlMDkxYjc0OTc0MjJhMTBlMzg1MjQ0MTNjYWE1ODRkMDFkYTUwMzkyOTNkOTljOTJlNDExNzlmYTI5YjNhOWI5NmMzY2IxYWRmNGJmOWQxODNlZGU2ZmVkYTFkMDI1NmYwNTMzZGU4YWJmMTU1YWQyZjE1OWI0OTJlNDA1YWRhZjJmNjViNmYyNDZlYjMxMGI4MjlmYTk4NWI0MTQxNGY3ZjA1YzU2MDZlZTJiYTNiYzYzNmFkZDY0MjY5NzViYTU3YjhhZjk0MDRmMmMxYjdlMWE5NzNmM2QxZjFiMjEwMDE0MWYxMGFjZTRkMmI3OGMxYjY1ZjA5OGQ5MDcwNmUyMDM0MGI2MzQ0Y2YzNDYxNzEiLCJpYXQiOjE1OTMwMjg2MzksImV4cCI6MTU5MzAyOTUzOSwiaXNzIjoiVW5pdGVkIFNvbHV0aW9ucyJ9.EEeZl9HyFpdawoN-j3SXCbJZSYzcdXOkuYp0ZSbFeclLS6gCSRsLZ8Iw4bSZ917ZRIlp1MPudglviQ_0NQLGFRYWnuqMuoZ7Zd7GJ3t88NGVBnaMT85PApG5PYTjz0gF5uePaIEyfRzAnzGYip4dzGLEwYtPizUdfk0yO_ii4len5be0MJcxVOtDQ0qRqvXKWwoa2ee1epuYOhbLKE3ePuSgdYt4vFlFE3HYt6czBEv9XuECnf-pgkGK0hmTq0VLJnUMb3DkIaNPzbcGdo0ySsu4fhfF15uFwaHFDHKDUrdLrCaAGdgGhTSyKZiw0aj4syOH0Hi95Q03zVa2GC17BA";
    const dapp = new Dapp();
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    let error: {};
    try {
      console.log("ID service " + process.env.ID_SERVICE);
      const idService = await getServiceConstant(process.env.ID_SERVICE, 'IdService');
      const id = await idService.IdController_genApID();
      dapp.ap_no = id['obj'].id;

      // const idService = await getServiceConstantJwt(process.env.ID_SERVICE, 'IdService', token);
      // const id = await idService.IdController_genApID();
      // dapp.ap_no = id['obj'].id;

      // const url = process.env.ID_SERVICE + `?jwt=${token}`;
      // const idService = await getServiceConstant(url, 'IdService');
      // //const id = await idService.IdController_genApID(token);
      // const id = await idService.IdController_genApIDRemote(token)
      // dapp.ap_no = id['obj'].id;

      //Rest approach
      // var path :string = "acc-api/id/ap";
      // const idService = await getServiceConstantRest(path, 'IdService', jwtToken,{ "genApId": []}, "GET" );
      // const idObj = await idService.genApId();
      // var x;
      // for (x in idObj) {
      //   if(x =='id'){
      //     dapp.ap_no = idObj[x];
      //   }
      // }

      // var idOperations: Object =
      // [
      //      {
      //        "template": {
      //          "method": "GET",
      //          "url": `${process.env.BASE_DOMAIN}acc-api/id/ap`,
      //        },
      //        "functions": {
      //          "genApId": []
      //        }
      //      }
      // ] ;
      // const idService = await getServiceConstantRest(path, 'IdService', jwtToken,idOperations);
      // const idObj = await idService.genApId();
      // var x;
      // for (x in idObj) {
      //   if(x =='id'){
      //     dapp.ap_no = idObj[x];
      //   }
      // }


      //const idService = await getServiceConstantTemp(process.env.ID_SERVICE, 'IdService');
      //const idService = await getServiceConstant(process.env.ID_SERVICE+tempToken, 'IdService');

      // const idService = await getServiceConstantTemp(process.env.ID_SERVICE, 'IdService',jwtToken);
      // const id = await idService.IdController_genApID();
      // dapp.ap_no = id['obj'].id;
    } catch (err) {
      console.log(err);
      error = {
        "error": {
          "code": 503,
          "message": "ID Service not available"
        }
      };
      return error;
    }

    try {
      console.log("AP service " + process.env.AP_OPENAPI);
      const apService = await getServiceConstant(process.env.AP_OPENAPI, 'ApService');
      //const ap = await apService.ApController_create(JSON.stringify(dapp));
      const ap = await apService.ApController_create(dapp);
      dapp.apId = ap['obj'].id;

      // const apService = await getServiceConstantJwt(process.env.AP_OPENAPI, 'ApService', token);
      // const ap = await apService.ApController_create(JSON.stringify(dapp));
      // dapp.apId = ap['obj'].id;

      //const url = process.env.AP_OPENAPI + `?jwt=${token}`;
      //const apService = await getServiceConstant(url, 'ApService');
      //const ap = await apService.ApController_createRemote(JSON.stringify(dapp));
      //const ap = await apService.ApController_createRemote(token, dapp);
      //dapp.apId = ap['obj'].id;

    } catch (err) {
      console.log(err);
      error = {
        "error": {
          "code": 503,
          "message": "AP Service not available"
        }
      };
      return error;
    }

    try {
      // const url = process.env.SOW_OPENAPI+`?jwt=${token}`;
      const sowService = await getServiceConstant(process.env.SOW_OPENAPI, 'SowService');
      // const sowService = await getServiceConstant(url, 'SowService');
      const sow = await sowService.SowController_create({});
      dapp.sowid = sow['obj'].id;
    } catch (err) {
      console.log(err);
      error = {
        "error": {
          "code": 503,
          "message": "SOW Service not available"
        }
      };
      return error;
    }

    try {
      //const url = process.env.IGCE_OPENAPI+`?jwt=${token}`;
      const igceService = await getServiceConstant(process.env.IGCE_OPENAPI, 'IgceService');
      //const igceService = await getServiceConstant(url, 'IgceService');
      const igce = await igceService.IgceController_create({});
      dapp.igceId = igce['obj'].id;

    } catch (err) {
      error = {
        "error": {
          "code": 503,
          "message": "IGCE Service not available"
        }
      };
      return error;
    }

    try {
      const evaluationCriteriaService = await getServiceConstant(process.env.EVALUATIONCRITERIA_OPENAPI, 'EvaluationCriteriaService');
      const evaluationCriteria = await evaluationCriteriaService.EvaluationCriteriaController_create({});
      dapp.evaluationCriteriaId = evaluationCriteria['obj'].id;
    } catch (err) {

      error = {
        "error": {
          "code": 503,
          "message": "Evaluation Criteria Service not available"
        }
      };
      return error;
    }


    try {
      const compatibilityService = await getServiceConstant(process.env.COMPATIBILITY_OPENAPI, 'CompatibilityService');
      const compatibility = await compatibilityService.CompatibilityController_create({});
      dapp.compatibilityId = compatibility['obj'].id;
    } catch (err) {

      error = {
        "error": {
          "code": 503,
          "message": "Compatibility Service not available"
        }
      };
      return error;
    }

    try {

      const tradeoffService = await getServiceConstant(process.env.TRADEOFFS_OPENAPI, 'TradeoffService');
      const tradeoff = await tradeoffService.TradeoffsController_create({});
      dapp.tradeoffId = tradeoff['obj'].id;

    } catch (err) {
      error = {
        "error": {
          "code": 503,
          "message": "Tradeoff Service not available"
        }
      };
      return error;
    }


    try {
      //const url = process.env.IGCE_OPENAPI;
      const requisitionService = await getServiceConstant(process.env.REQUISITION_OPENAPI, 'RequisitionService');
      const requisition = await requisitionService.RequistionController_create({});
      dapp.requisitionId = requisition['obj'].id;

    } catch (err) {

      error = {
        "error": {
          "code": 503,
          "message": "Requisition Service not available"
        }
      };
      return error;
    }

    try {
      //const url = process.env.IGCE_OPENAPI+`?jwt=${token}`;
      const collaboratorService = await getServiceConstant(process.env.COLLABORATOR_OPENAPI, 'CollaboratorService');
      const collaborator = await collaboratorService.CollaboratorController_create({});
      dapp.collaboratorId = collaborator['obj'].id;

    } catch (err) {

      error = {
        "error": {
          "code": 503,
          "message": "Collaborator Service not available"
        }
      };
      return error;
    }


    try {
      //const url = process.env.IGCE_OPENAPI+`?jwt=${token}`;
      const section508Service = await getServiceConstant(process.env.SECTION508_OPENAPI, 'Section508Service');
      const sectn = await section508Service.Section508Controller_create({});
      dapp.section508Id = sectn['obj'].id;
    } catch (err) {
      error = {
        "error": {
          "code": 503,
          "message": "Section508 Service not available"
        }
      };
      return error;
    }


    try {

      //    const considerationService = await getServiceConstant(process.env.CONSIDERATION_OPENAPI, 'ConsiderationService');
      const considerationService = await getServiceConstant(process.env.CONSIDERATION_OPENAPI, 'ConsiderationService');
      const consideration = await considerationService.ConsiderationController_create({});

      dapp.considerationId = consideration['obj'].id;
    } catch (err) {
      error = {
        "error": {
          "code": 503,
          "message": "Consideration Service not available"
        }
      };
      return error;
    }



    try {

      //const securityService = await getServiceConstant(process.env.SECURITY_OPENAPI, 'SecurityService');
      const url = process.env.SECURITY_OPENAPI;
      const securityService = await getServiceConstant(url, 'SecurityService');
      const security = await securityService.SecurityController_create({});
      dapp.securityId = security['obj'].id;
    } catch (err) {
      error = {
        "error": {
          "code": 503,
          "message": "Security Service not available"
        }
      };
      return error;
    }


    console.log("All down stream services records created ----------------------------------------------------------");

    return await this.dappRepository.create(dapp);
  }



  // @patch('/acc-api/ap-dapp/{id}/sow', {
  //   responses: {
  //     '204': {
  //       description: 'Dapp PATCH SOW success',
  //     },
  //   },
  // })
  // async createSOW(
  //   @param.path.string('id') id: string,
  //   @requestBody() dapp: Dapp,
  // ): Promise<void> {

  //   try {
  //     const sowService = await getServiceConstant(process.env.SOW_OPENAPI, 'SowService');
  //     const sow = await sowService.SowController_create({});
  //     dapp.sowid = sow['obj'].id;
  //     await this.dappRepository.updateById(id, dapp);

  //   } catch (err) {
  //     console.error(err);
  //     return err;
  //   }
  // }


  // @patch('/acc-api/ap-dapp/{id}/igce', {
  //   responses: {
  //     '204': {
  //       description: 'Dapp PATCH IGCE success',
  //     },
  //   },
  // })
  // async createIGCE(
  //   @param.path.string('id') id: string,
  //   @requestBody() dapp: Dapp,
  // ): Promise<void> {

  //   try {
  //     const igceService = await getServiceConstant(process.env.IGCE_OPENAPI, 'IgceService');
  //     const igce = await igceService.IgceController_create({});
  //     dapp.igceId = igce['obj'].id;
  //     await this.dappRepository.updateById(id, dapp);
  //   } catch (err) {
  //     console.error(err);
  //     return err;
  //   }
  // }





  // @patch('/acc-api/ap-dapp/{id}/eval', {
  //   responses: {
  //     '204': {
  //       description: 'Dapp PATCH EVAL success',
  //     },
  //   },
  // })
  // async createEvaluationCriteria(
  //   @param.path.string('id') id: string,
  //   @requestBody() dapp: Dapp,
  // ): Promise<void> {

  //   try {
  //     const evaluationCriteriaService = await getServiceConstant(process.env.EVALUATIONCRITERIA_OPENAPI, 'EvaluationCriteriaService');
  //     const evaluationCriteria = await evaluationCriteriaService.EvaluationCriteriaController_create({});
  //     dapp.evaluationCriteriaId = evaluationCriteria['obj'].id;
  //     await this.dappRepository.updateById(id, dapp);

  //   } catch (err) {
  //     console.error(err);
  //     return err;
  //   }
  // }





  // @patch('/acc-api/ap-dapp/{id}/compatibility', {
  //   responses: {
  //     '204': {
  //       description: 'Dapp PATCH Compatibility success',
  //     },
  //   },
  // })
  // async createCompatibility(
  //   @param.path.string('id') id: string,
  //   @requestBody() dapp: Dapp,
  // ): Promise<void> {

  //   try {
  //     const compatibilityService = await getServiceConstant(process.env.COMPATIBILITY_OPENAPI, 'CompatibilityService');
  //     const compatibility = await compatibilityService.CompatibilityController_create({});
  //     dapp.compatibilityId = compatibility['obj'].id;
  //     await this.dappRepository.updateById(id, dapp);

  //   } catch (err) {
  //     console.error(err);
  //     return err;
  //   }
  // }


  // @patch('/acc-api/ap-dapp/{id}/tradeoff', {
  //   responses: {
  //     '204': {
  //       description: 'Dapp PATCH Tradeoff success',
  //     },
  //   },
  // })
  // async createTradeoof(
  //   @param.path.string('id') id: string,
  //   @requestBody() dapp: Dapp,
  // ): Promise<void> {

  //   try {
  //     const tradeoffService = await getServiceConstant(process.env.TRADEOFFS_OPENAPI, 'TradeoffService');
  //     const tradeoff = await tradeoffService.TradeoffsController_create({});
  //     dapp.tradeoffId = tradeoff['obj'].id;
  //     await this.dappRepository.updateById(id, dapp);

  //   } catch (err) {
  //     console.error(err);
  //     return err;
  //   }
  // }



  // @patch('/acc-api/ap-dapp/{id}/requisition', {
  //   responses: {
  //     '204': {
  //       description: 'Dapp PATCH Tradeoff success',
  //     },
  //   },
  // })
  // async createRequisition(
  //   @param.path.string('id') id: string,
  //   @requestBody() dapp: Dapp,
  // ): Promise<void> {

  //   try {
  //     const requisitionService = await getServiceConstant(process.env.REQUISITION_OPENAPI, 'RequisitionService');
  //     const requisition = await requisitionService.RequisitionController_create({});
  //     dapp.requisitionId = requisition['obj'].id;
  //     await this.dappRepository.updateById(id, dapp);

  //   } catch (err) {
  //     console.error(err);
  //     return err;
  //   }
  // }


  // @get('/acc-api/ap-dapp/count', {
  //   responses: {
  //     '200': {
  //       description: 'Dapp model count',
  //       content: { 'application/json': { schema: CountSchema } },
  //     },
  //   },
  // })
  // async count(
  //   @param.query.object('where', getWhereSchemaFor(Dapp)) where?: Where<Dapp>,
  // ): Promise<Count> {
  //   return await this.dappRepository.count(where);
  // }

  @get('/acc-api/ap-dapp', {
    responses: {
      '200': {
        description: 'Array of Dapp model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': Dapp } },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Dapp)) filter?: Filter<Dapp>,
  ): Promise<Dapp[]> {
    return await this.dappRepository.find(filter);
  }

  @get('/acc-api/ap-dapp/{id}', {
    responses: {
      '200': {
        description: 'Dapp model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Dapp } } },
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<Dapp> {
    return await this.dappRepository.findById(id);
  }

  @patch('/acc-api/ap-dapp/{id}', {
    responses: {
      '204': {
        description: 'Dapp PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody() dapp: Dapp,
  ): Promise<void> {
    await this.dappRepository.updateById(id, dapp);
  }

  @put('/acc-api/ap-dapp/ap/{ap_no}/acceptAp', {
    responses: {
      '204': {
        description: 'Blockchain accept put success',
      },
    },
  })
  async acceptAp(@param.path.string('ap_no') ap_no: string): Promise<void> {
    console.log("ap-dapp api called....>>>>>>>>>>>>>>>");
    // const token: string = jwtToken.replace(/Bearer /g,'');
    // Get the Dapp model that contains the references to all sub-components related to this (ap_no) AP
    let dappResponse;

    console.log("Before ------------------------------------");
    try {
      //const dappResponse = await this.dappRepository.findById(ap_no);
      dappResponse = await this.dappRepository.findById(ap_no);
      console.log(dappResponse);
    } catch (er) {
      console.log(er);
      throw er;
    }
    console.log("OK ------------------------------------");
    // Build the apFullJson from the ap_no and the dapp model
    const apFullJson = await buildApJSON(ap_no, dappResponse);
    console.log("AP Full going to be written on BC----------------------------------------------------");
    console.log(apFullJson);

    // Get a reference to the blockchain service
    const blockchainService = await getServiceConstant(process.env.BLOCKCHAIN_OPENAPI, 'BlockChainService');

    // invoke the blockchain service to put the full AP JSON Asset onto the blockchain
    blockchainService.BcController_createAsset(apFullJson);

  }

  // @put('/acc-api/ap-dapp/ap/{ap_no}/{token}/acceptApRemote', {
  //   responses: {
  //     '204': {
  //       description: 'Blockchain accept put success',
  //     },
  //   },
  // })
  // async acceptApRemote(@param.path.string('ap_no') ap_no: string, @param.path.string('token') token: string ): Promise<void> {
  //   console.log("token received ------------------------------------"+token);
  //   //const token: string = jwtToken.replace(/Bearer /g,'');
  //   // Get the Dapp model that contains the references to all sub-components related to this (ap_no) AP
  //   const dappResponse = await this.dappRepository.findById(ap_no);

  //   // Build the apFullJson from the ap_no and the dapp model
  //   const apFullJson = await buildApJSON(ap_no, dappResponse, token);
  //   console.log("AP Full going to be written on BC----------------------------------------------------");
  //   console.log(apFullJson);

  //   // Get a reference to the blockchain service
  //   const blockchainService = await getServiceConstant(process.env.BLOCKCHAIN_OPENAPI, 'BlockChainService');

  //   // invoke the blockchain service to put the full AP JSON Asset onto the blockchain
  //   blockchainService.BcController_createAsset(apFullJson);

  // }

  @get('/acc-api/ap-dapp/ap/{ap_no}/apjson', {
    responses: {
      '200': {
        description: 'Temporary method',
        content: { 'application/json': { schema: { 'x-ts-type': Dapp } } },
      },
    },
  })
  async getApJson(@param.path.string('ap_no') ap_no: string): Promise<{}> {
    //const token: string = jwtToken.replace(/Bearer /g,'');
    const dappResponse = await this.dappRepository.findById(ap_no);
    const full_json: any =  buildApJSON(ap_no, dappResponse);
    //let apFullJson = buildApJSON(ap_no, dappResponse);
    return full_json
  }
}


// async function acceptApFun( ap_no: string,  jwtToken: string ): Promise<void> {

//   let dappRep: DappRepository = new DappRepository(ap_no);

//   const token: string = jwtToken.replace(/Bearer /g,'');
//   // Get the Dapp model that contains the references to all sub-components related to this (ap_no) AP
//   const dappResponse = await dappRep.findById(ap_no);
//   console.log("OK ------------------------------------");
//   // Build the apFullJson from the ap_no and the dapp model
//   const apFullJson = await buildApJSON(ap_no, dappResponse, token);
//   console.log("AP Full going to be written on BC----------------------------------------------------");
//   console.log(apFullJson);

//   // Get a reference to the blockchain service
//   const blockchainService = await getServiceConstant(process.env.BLOCKCHAIN_OPENAPI, 'BlockChainService');

//   // invoke the blockchain service to put the full AP JSON Asset onto the blockchain
//   blockchainService.BcController_createAsset(apFullJson);

// }

async function buildApJSON(ap_no: string, dappResponse: Dapp) {
  console.log('Start of buildApJSON');
  let full_json = {};
  full_json = { "id": ap_no };
  console.log("ID added.................................");

  try {


    // let apResponse = await this.dappRepository.find({ filter: `{"where][id":"${ap_no}"}` });

    let ap_id: String | undefined;
    let trd_id: String | undefined;
    let est_id: String | undefined;
    let cmpt_id: String | undefined;
    let compat_id: String | undefined;
    let cnstrn_id: String | undefined;
    let igce_id: String | undefined;
    let sow_id: String | undefined;
    let evalCrt_id: String | undefined;
    let section508_id: String | undefined;
    let consideration_id: String | undefined;
    let resource_id: String | undefined;
    let security_id: String | undefined;
    let poc_id: String | undefined;
    let requisition_id: String | undefined;
    // let atchmnt_id: String | undefined;

    // console.log(dappResponse);
    ap_id = dappResponse.apId
    igce_id = dappResponse.igceId;
    trd_id = dappResponse.tradeoffId;
    est_id = dappResponse.estimateId;
    cmpt_id = dappResponse.competitionId;
    compat_id = dappResponse.compatibilityId;
    cnstrn_id = dappResponse.constraintId;
    sow_id = dappResponse.sowid;
    evalCrt_id = dappResponse.evaluationCriteriaId;
    section508_id = dappResponse.section508Id;
    consideration_id = dappResponse.considerationId;
    resource_id = dappResponse.resourceId;
    security_id = dappResponse.securityId;
    poc_id = dappResponse.pocId;
    requisition_id = dappResponse.requisitionId;

    // atchmnt_id = dappResponse.attachmentId;
    // console.log("AP............................................................. ");
    console.log(dappResponse);
    
    if (ap_id != undefined) {
      console.log("AP START............................................................. ");
      const apService = await getServiceConstant(process.env.AP_OPENAPI, 'ApService');
      //const myFilter: Filter<any> = {"where":{"id":`${ap_id}`}};
      //const apResponse = await apService.ApController_find({ filter: `{"where][id":"${ap_id}"}` });
      //console.log("parsed -----"+JSON.parse(JSON.stringify("[where][id]=HHSSU8M6EPRFD")));
      const apResponse = await apService.ApController_find({"where":{"id":`${ap_id}`}});
      // full_json = full_json.concat("AP" : '+JSON.stringify(apResponse['body'][0]));
      const AP = apResponse['body'][0];
      console.log(AP);
      full_json = { ...full_json, AP };
      console.log("AP COMPLETE............................................................. ");
    }

    console.log("SOW START............................................................. ");

    if (sow_id != undefined) {
      const sowService = await getServiceConstant(process.env.SOW_OPENAPI, 'SowService');
      //const sowResponse = await sowService.SowController_find({ filter: `{"where][id":"${sow_id}"}` });
      const sowResponse = await sowService.SowController_find({"where":{"id":`${sow_id}`}});
      //full_json = full_json.concat('SOW : '+JSON.stringify(sowResponse['body'][0]));
      const SOW = sowResponse['body'][0];
      console.log(SOW);
      full_json = { ...full_json, SOW };
    }
    console.log("Eval START............................................................. ");
    if (evalCrt_id != undefined) {
      const evalCrtService = await getServiceConstant(process.env.EVALUATIONCRITERIA_OPENAPI, 'EvalCrtService');
      //const evalCrtResponse = await evalCrtService.EvaluationCriteriaController_find({ filter: `{"where][id":"${evalCrt_id}"}` });
      const evalCrtResponse = await evalCrtService.EvaluationCriteriaController_find({"where":{"id":`${evalCrt_id}`}} );
      // full_json = full_json.concat('Evaludation Criteria : '+JSON.stringify(evalCrtResponse['body'][0]));
      const Evaluation_Criteria = evalCrtResponse['body'][0];
      console.log(Evaluation_Criteria);
      full_json = { ...full_json, Evaluation_Criteria };
    }

    // if(atchmnt_id != undefined){
    // const attachmentService = await getServiceConstant(process.env.ATTACHMENT_OPENAPI, 'AttachmentService');
    // const atchmntResponse = await attachmentService.AttachmentController_find({ filter: `{"where][id":"${atchmnt_id}"}` });
    // //full_json = full_json.concat('Attachment : '+JSON.stringify(atchmntResponse['body'][0]));
    // let ATTACHMENT =  atchmntResponse['body'][0];
    // console.log(ATTACHMENT);
    // full_json = {...full_json, ATTACHMENT };
    // }

    console.log("IGCE START............................................................. ");

    if (igce_id != undefined) {
      const igceService = await getServiceConstant(process.env.IGCE_OPENAPI, 'IgceService');
      //const igceResponse = await igceService.IgceController_find({ filter: `{"where][id":"${igce_id}"}` });
      const igceResponse = await igceService.IgceController_find({"where":{"id":`${igce_id}`}} );
      // full_json = full_json.concat('IGCE : '+JSON.stringify(igceResponse['body'][0]));
      const IGCE = igceResponse['body'][0];
      console.log(IGCE);
      full_json = { ...full_json, IGCE };
    }
    //  console.log("IGCE............................................................. ");
    // //  console.log(igceResponse);
    // console.log("ESTIMATE START............................................................. ");
    // if (est_id != undefined) {
    //   const estimateService = await getServiceConstant(process.env.ESTIMATES_OPENAPI, 'EstimateService');
    //   const estimateResponse = await estimateService.EstimatesController_find({ filter: `{"where][id":"${est_id}"}` });
    //   // console.log('ESTIMATES ::::::::::::: '+estimateResponse['body'][0]);
    //   // full_json = full_json.concat('Estimate : '+JSON.stringify(estimateResponse['body'][0]));
    //   const ESTIMATE = estimateResponse['body'][0];
    //   console.log(ESTIMATE);
    //   full_json = { ...full_json, ESTIMATE };

    // }

    console.log("Tradeoffs START............................................................. ");
    // Get Tradeoffs json by trd_id
    if (trd_id != undefined) {
      const tradeoffsService = await getServiceConstant(process.env.TRADEOFFS_OPENAPI, 'TradeoffService');
      //const tradeoffsResponse = await tradeoffsService.TradeoffsController_find({ filter: `{"where][id":"${trd_id}"}` });
      //const tradeoffsResponse = await tradeoffsService.TradeoffsController_find({ filter: `{"where][id":"${trd_id}"}` });
      const tradeoffsResponse = await tradeoffsService.TradeoffsController_find({"where":{"id":`${trd_id}`}} );
      //full_json = full_json.concat('Tradeoffs : '+JSON.stringify(tradeoffsResponse['body'][0]));
      const Tradeoffs = tradeoffsResponse['body'][0];
      console.log(Tradeoffs);
      full_json = { ...full_json, Tradeoffs };
      //full_json = full_json.concat(JSON.parse(JSON.stringify(tradeoffsResponse)));
      // console.log("Tradeoff............................................................. ");
      // console.log(tradeoffsResponse);
    }

    // console.log("Competition START............................................................. ");
    // // Get Competition json by cmpt_id
    // if (cmpt_id != undefined) {
    //   const competitionService = await getServiceConstant(process.env.COMPETITION_OPENAPI, 'CompetitionService');
    //   const competitionResponse = await competitionService.CompetitionController_find({ filter: `{"where][id":"${cmpt_id}"}` });
    //   //full_json = full_json.concat('Competition : '+JSON.stringify(competitionResponse['body'][0]));
    //   const Competition = competitionResponse['body'][0];
    //   console.log(Competition);
    //   full_json = { ...full_json, Competition };
    //   //full_json = full_json.concat(JSON.parse(JSON.stringify(competitionResponse)));
    //   //console.log("Competition............................................................. ");
    //   //console.log(competitionResponse);
    // }

    console.log("Compatibility START............................................................. ");
    // Get Compatibility json by compat_id
    if (compat_id != undefined) {
      const compatibilityService = await getServiceConstant(process.env.COMPATIBILITY_OPENAPI, 'CompatibilityService');
      //const compatibilityResponse = await compatibilityService.CompatibilityController_find({ filter: `{"where][id":"${compat_id}"}` });
      const compatibilityResponse = await compatibilityService.CompatibilityController_find({"where":{"id":`${compat_id}`}} );
      //full_json = full_json.concat('Compatibility : '+JSON.stringify(compatibilityResponse['body'][0]));
      const Compatibility = compatibilityResponse['body'][0];
      console.log(Compatibility);
      full_json = { ...full_json, Compatibility };
      // full_json = full_json.concat(JSON.parse(JSON.stringify(compatibilityResponse)));
      //console.log("Compatibility............................................................. ");
      //console.log(compatibilityResponse);
    }

    // console.log("Constraints START............................................................. ");
    // // Get Constraints json by cnstrn_id
    // if (cnstrn_id != undefined) {
    //   const constraintService = await getServiceConstant(process.env.CONSTRAINTS_OPENAPI, 'ConstraintService');
    //   const constraintResponse = await constraintService.ConstraintsController_find({ filter: `{"where][id":"${cnstrn_id}"}` });
    //   // full_json = full_json.concat('Constraints : '+JSON.stringify(constraintResponse['body'][0]));
    //   const Constraints = constraintResponse['body'][0];
    //   console.log(Constraints);
    //   full_json = { ...full_json, Constraints };
    //   //full_json = full_json.concat(JSON.parse(JSON.stringify(constraintResponse)));
    //   //console.log("Constraint............................................................. ");
    //   //console.log(constraintResponse);
    // }

    console.log("Section 508 START............................................................. ");
    if (section508_id != undefined) {
      const section508Service = await getServiceConstant(process.env.SECTION508_OPENAPI, 'Section508Service');
      //const sectnResponse = await section508Service.Section508Controller_find({ filter: `{"where][id":"${section508_id}"}` });
      const sectnResponse = await section508Service.Section508Controller_find({"where":{"id":`${section508_id}`}} );
      const SECTION508 = sectnResponse['body'][0];
      console.log(SECTION508);
      full_json = { ...full_json, SECTION508 };
    }

    console.log("Consideration START............................................................. ");
    if (consideration_id != undefined) {
      const considerationService = await getServiceConstant(process.env.CONSIDERATION_OPENAPI, 'ConsiderationService');
      //const considerationResponse = await considerationService.ConsiderationController_find({ filter: `{"where][id":"${consideration_id}"}` });
      const considerationResponse = await considerationService.ConsiderationController_find({"where":{"id":`${consideration_id}`}});
      const CONSIDERATIONS = considerationResponse['body'][0];
      console.log(CONSIDERATIONS);
      full_json = { ...full_json, CONSIDERATIONS };
    }


    // console.log("Resource START............................................................. ");
    // if (resource_id != undefined) {
    //   const resourceService = await getServiceConstant(process.env.RESOURCE_OPENAPI, 'ResourceService');
    //   const resourceResponse = await resourceService.ResourceController_find({ filter: `{"where][id":"${resource_id}"}` });
    //   const OTHER_RESOURCES = resourceResponse['body'][0];
    //   console.log(OTHER_RESOURCES);
    //   full_json = { ...full_json, OTHER_RESOURCES };
    // }

    console.log("Security START............................................................. ");
    if (security_id != undefined) {
      const securityService = await getServiceConstant(process.env.SECURITY_OPENAPI, 'SecurityService');
      //const securityResponse = await securityService.SecurityController_find({ filter: `{"where][id":"${security_id}"}` });
      const securityResponse = await securityService.SecurityController_find({"where":{"id":`${security_id}`}});
      const SECURITY = securityResponse['body'][0];
      console.log(SECURITY);
      full_json = { ...full_json, SECURITY };
    }

    // console.log("POC START............................................................. ");
    // if (poc_id != undefined) {
    //   const pocService = await getServiceConstant(process.env.POC_OPENAPI, 'PocService');
    //   const pocResponse = await pocService.PocController_find({ filter: `{"where][id":"${poc_id}"}` });
    //   const POINT_OF_CONTACT = pocResponse['body'][0];
    //   console.log(POINT_OF_CONTACT);
    //   full_json = { ...full_json, POINT_OF_CONTACT };
    // }

    console.log("REQUISITION START............................................................. ");
    if (requisition_id != undefined) {
      const requisitionService = await getServiceConstant(process.env.REQUISITION_OPENAPI, 'RequisitionService');
      //const requisitionResponse = await requisitionService.RequistionController_find({ filter: `{"where][id":"${requisition_id}"}` });
      const requisitionResponse = await requisitionService.RequistionController_find({"where":{"id":`${requisition_id}`}});
      const REQUISITION = requisitionResponse['body'][0];
      console.log(REQUISITION);
      full_json = { ...full_json, REQUISITION };
    }

    console.log("full_json....................................");
    console.log(full_json);

  } catch (err) {
    console.error(err);
    return err;
  }
  return full_json;
}



// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function getServiceConstant(API_URL: any, serviceName: string) {
  const getDS = await createDataSource(API_URL, { positional: true });
  const getModel = await getDS.createModel(serviceName);
  return getModel;
}


// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function createDataSource(spec: any, options: any) {
  const config = Object.assign(
    {
      connector: 'loopback-connector-openapi',
      spec: spec,
    },
    options,
  );

  const ds = await loopback.createDataSource('openapi', config);
  // console.log(pEvent(ds, 'ECONNREFUSED'));
  await pEvent(ds, 'connected');
  return ds;
}


// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function getServiceConstantJwt(API_URL: any, serviceName: string, authHeader: string) {
  const getDS = await createDataSourceJwt(API_URL, { positional: true, }, authHeader);
  const getModel = await getDS.createModel(serviceName);
  return getModel;
}


// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function createDataSourceJwt(spec: any, options: any, token: string) {
  const config = Object.assign(
    {
      connector: 'loopback-connector-openapi',
      spec: spec,
      authorizations: {
        bearerAuth: token,
      }
    },
    options,
  );

  const ds = await loopback.createDataSource('openapi', config);
  // console.log(pEvent(ds, 'ECONNREFUSED'));
  await pEvent(ds, 'connected');
  return ds;
}














