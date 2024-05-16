import {Count, CountSchema, Filter, repository, Where} from '@loopback/repository';
import {del, get, getModelSchemaRef, getWhereSchemaFor,getFilterSchemaFor, param, patch, post, requestBody} from '@loopback/rest';
import {Ap} from '../models';
import {ApRepository} from '../repositories';

export class ApController {
  constructor(
    @repository(ApRepository)
    public apRepository: ApRepository,
  ) {}


  // Simple healthcheck function for the HTTP GET on /email-service.  The ALB is expecting a 200 for this
  @get('/acc-api/ap/health', {
    responses: {
      '204': {
        description: 'Healthcheck status ok',
      },
    },
  })
  async healthCheck(): Promise<String> {
    return "status: ok";
  }
  @post('/acc-api/ap', {
    responses: {
      '200': {
        description: 'Ap model instance',
        content: {'application/json': {schema: {'x-ts-type': Ap}}},
      },
    },
  })
  async create(@requestBody() ap: Ap): Promise<Ap> {
    ap.is_commercial = true;
    return await this.apRepository.create(ap);
  }

  @post('/acc-api/ap/remote', {
    responses: {
      '200': {
        description: 'Ap model instance',
        content: {'application/json': {schema: getModelSchemaRef(Ap)}},
      },
    },
  })
  async createRemote(@param.query.string('jwt') jwt: string, @requestBody({
    content: {
      'application/json': {
        schema: getModelSchemaRef(Ap, {
          title: 'NewAP',
          exclude: ['id'],
        }),
      },
    },
  }) ap: Ap): Promise<Ap> {
    console.log("JWT " + jwt);
    console.log("Ap Received : " + ap);
    ap.is_commercial = true;
    return await this.apRepository.create(ap);
  }
  @get('/acc-api/ap/count', {
    responses: {
      '200': {
        description: 'Ap model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Ap)) where?: Where,
  ): Promise<Count> {
    return await this.apRepository.count(where);
  }

  @get('/acc-api/ap/{currentuserid}/getApsByUserId', {
    responses: {
      '200': {
        description: 'Array of Ap model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': Ap}},
          },
        },
      },
    },
  })
  async getApsByUserId(@param.path.string('currentuserid') currentuserid: string): Promise<Ap[]> {
    console.log("User passed --------" + currentuserid);
    const myFilter: Filter<Ap> = {where: {or: [{and: [{status: 'Draft'}, {createdUserid: currentuserid}]}, {and: [{status: 'Shared'}, {sharedCollaborators: {inq: [currentuserid]}}]}, {and: [{status: 'Accepted'}, {sharedCollaborators: {inq: [currentuserid]}}]}, {and: [{status: 'Shared'}, {pointsofContact: {inq: [currentuserid]}}]}, {and: [{status: 'Accepted'}, {pointsofContact: {inq: [currentuserid]}}]}]}};
    return await this.apRepository.find(myFilter);


  }

  @get('/acc-api/ap', {
    responses: {
      '200': {
        description: 'Array of Ap model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': Ap}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Ap)) filter?: Filter<Ap>,
    //@param.query.object('filter') filter?: Filter,
  ): Promise<Ap[]> {
    console.log("Filter before parsing "+JSON.stringify(filter));
   // console.log("Filter after parsing "+JSON.parse(filter));
    return await this.apRepository.find(filter);
  }

  @get('/acc-api/ap/{ap_no}/getByApNo', {
    responses: {
      '200': {
        description: 'Ap json ',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': Ap}},
          },
        },
      },
    },
  })
  async getApByNo(@param.path.string('ap_no') ap_no: string
  ): Promise<any> {
    const myfilter: Filter<Ap> = {where: {ap_no: ap_no}};
    return await this.apRepository.find(myfilter);
  }

  @get('/acc-api/ap/getCountsByMonths', {
    responses: {
      '200': {
        description: 'Ap json ',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': Ap}},
          },
        },
      },
    },
  })
  async getApCountsByMonths(): Promise<number[]> {
    let apCount: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let todaysDate = new Date();
    console.log("today's date " + todaysDate);
    let currentYear = new Date().getFullYear();
    console.log("Year " + currentYear);
    let decEdate: string = `${currentYear}",12,31"`;
    let novEdate: string = `${currentYear}",11,30"`;
    let octEdate: string = `${currentYear}",10,31"`;
    let sptEdate: string = `${currentYear}",09,30"`;
    let agstEdate: string = `${currentYear}",08,31"`;
    let jlyEdate: string = `${currentYear}",07,31"`;
    let junEdate: string = `${currentYear}",06,30"`;
    let mayEdate: string = `${currentYear}",05,31"`;
    let aprlEdate: string = `${currentYear}",04,30"`;
    let mrchEdate: string = `${currentYear}",03,31"`;
    let febEdate: string = `${currentYear}",02,28"`;
    let janEdate: string = `${currentYear}",01,31"`;

    let endDates: string[] = [decEdate, novEdate, octEdate, sptEdate, agstEdate, jlyEdate, junEdate, mayEdate, aprlEdate, mrchEdate, febEdate, janEdate];

    let decSdate: string = `${currentYear}",12,01"`;
    let novSdate: string = `${currentYear}",11,01"`;
    let octSdate: string = `${currentYear}",10,01"`;
    let sptSdate: string = `${currentYear}",09,01"`;
    let agstSdate: string = `${currentYear}",08,01"`;
    let jlySdate: string = `${currentYear}",07,01"`;
    let junSdate: string = `${currentYear}",06,01"`;
    let maySdate: string = `${currentYear}",05,01"`;
    let aprlSdate: string = `${currentYear}",04,01"`;
    let mrchSdate: string = `${currentYear}",03,01"`;
    let febSdate: string = `${currentYear}",02,01"`;
    let janSdate: string = `${currentYear}",01,01"`;
    let startDates: string[] = [decSdate, novSdate, octSdate, sptSdate, agstSdate, jlySdate, junSdate, maySdate, aprlSdate, mrchSdate, febSdate, janSdate];
    let start: Date;
    let end: Date;
    try {
      for (let m: number = 11; m >= 0; m--) {
        console.log("m  " + m);
        start = new Date(startDates[m]);
        end = new Date(endDates[m]);
        //const myfilter: Filter<Ap> = { where: { and: [ {createdDate: {gte: start } }, {createdDate:{lt: end }  } ] } };
        const myfilter: Filter<Ap> = {where: {and: [{or: [{status: 'SHARED'}, {status: 'Shared'}, {status: 'shared'}, {status: 'DRAFT'}, {status: 'Draft'}, {status: 'draft'}]}, {createdDate: {gte: start}}, {createdDate: {lt: end}}]}};

        console.log("filter for the month" + (m + 1) + myfilter);
        let result: {}[] = await this.apRepository.find(myfilter);
        let nov = result.length;
        apCount[m] = nov;
      }
      return apCount;
    } catch (err) {
      console.error(err);
      return err;
    }
  }


  @get('/acc-api/ap/{currentuserid}/getApMonthlyCountsByUser', {
    responses: {
      '200': {
        description: 'Ap json ',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': Ap}},
          },
        },
      },
    },
  })
  async getApCountsByUser(@param.path.string('currentuserid') currentuserid: string): Promise<number[]> {
    console.log("User passed --------" + currentuserid);
    let apCount: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let todaysDate = new Date();
    console.log("today's date " + todaysDate);
    let currentYear = new Date().getFullYear();
    console.log("Year " + currentYear);
    let decEdate: string = `${currentYear}",12,31"`;
    let novEdate: string = `${currentYear}",11,30"`;
    let octEdate: string = `${currentYear}",10,31"`;
    let sptEdate: string = `${currentYear}",09,30"`;
    let agstEdate: string = `${currentYear}",08,31"`;
    let jlyEdate: string = `${currentYear}",07,31"`;
    let junEdate: string = `${currentYear}",06,30"`;
    let mayEdate: string = `${currentYear}",05,31"`;
    let aprlEdate: string = `${currentYear}",04,30"`;
    let mrchEdate: string = `${currentYear}",03,31"`;
    let febEdate: string = `${currentYear}",02,29"`;
    let janEdate: string = `${currentYear}",01,31"`;

    let endDates: string[] = [janEdate, febEdate, mrchEdate, aprlEdate, mayEdate, junEdate, jlyEdate, agstEdate, sptEdate, octEdate, novEdate, decEdate];

    let decSdate: string = `${currentYear}",12,01"`;
    let novSdate: string = `${currentYear}",11,01"`;
    let octSdate: string = `${currentYear}",10,01"`;
    let sptSdate: string = `${currentYear}",09,01"`;
    let agstSdate: string = `${currentYear}",08,01"`;
    let jlySdate: string = `${currentYear}",07,01"`;
    let junSdate: string = `${currentYear}",06,01"`;
    let maySdate: string = `${currentYear}",05,01"`;
    let aprlSdate: string = `${currentYear}",04,01"`;
    let mrchSdate: string = `${currentYear}",03,01"`;
    let febSdate: string = `${currentYear}",02,01"`;
    let janSdate: string = `${currentYear}",01,01"`;
    //let startDates: string[] = [ decSdate, novSdate , octSdate,sptSdate,agstSdate,jlySdate,junSdate,maySdate,aprlSdate,mrchSdate,febSdate,janSdate] ;
    let startDates: string[] = [janSdate, febSdate, mrchSdate, aprlSdate, maySdate, junSdate, jlySdate, agstSdate, sptSdate, octSdate, novSdate, decSdate];
    let start: Date;
    let end: Date;


    try {
      for (let m: number = 0; m < 12; m++) {
        console.log("m  " + m);
        start = new Date(startDates[m]);
        console.log(start);
        end = new Date(endDates[m]);

        console.log(end);
        //const myfilter: Filter<Ap> = { where: { and: [ {createdDate: {gte: start } }, {createdDate:{lt: end }  } ] } };
        // const dateFilter: Filter<Ap> = { where: { or: [ { createdDate: undefined} ,{ and: [ {createdDate: {gte: start } }, {createdDate:{lt: end }  } ] } ] } } };
        //const myfilter: Filter<Ap> = { where: { and: [ {or: [ {status: 'SHARED'},{status: 'Shared'},{status: 'shared'},{status: 'DRAFT'},{status: 'Draft'},{status: 'draft'}] } , {createdDate: {gte: start } }, {createdDate:{lt: end }  } ] } };
        // const myfilter: Filter<Ap> = {where : { and: [ { or: [ { createdDate: undefined} ,{ and: [ {createdDate: {gte: start } }, {createdDate:{lt: end }  } ] } ] } , { or: [{ and: [{ status : 'Draft' },{ createdUserid : currentuserid }]},{ and :[{ status : 'Shared' },{ sharedCollaborators :{ inq : [ currentuserid ]}}]},{ and :[ { status:'Accepted'},{ sharedCollaborators :{ inq :[ currentuserid ]}}]},{ and :[{ status : 'Shared' },{ pointsofContact :{ inq :[ currentuserid]}}]},{ and :[{ status :'Accepted'},{ pointsofContact :{inq:[currentuserid ]}}]}]}]}};
        const myfilter: Filter<Ap> = {where: {and: [{createdDate: {gte: start}}, {createdDate: {lte: end}}, {or: [{and: [{status: 'Draft'}, {createdUserid: currentuserid}]}, {and: [{status: 'Shared'}, {sharedCollaborators: {inq: [currentuserid]}}]}, {and: [{status: 'Accepted'}, {sharedCollaborators: {inq: [currentuserid]}}]}, {and: [{status: 'Shared'}, {pointsofContact: {inq: [currentuserid]}}]}, {and: [{status: 'Accepted'}, {pointsofContact: {inq: [currentuserid]}}]}]}]}};
        //const myfilter: Filter<Ap> = {where :  { or: [{ and: [{ status : 'Draft' },{ createdUserid : currentuserid }]},{ and :[{ status : 'Shared' },{ sharedCollaborators :{ inq : [ currentuserid ]}}]},{ and :[ { status:'Accepted'},{ sharedCollaborators :{ inq :[ currentuserid ]}}]},{ and :[{ status : 'Shared' },{ pointsofContact :{ inq :[ currentuserid]}}]},{ and :[{ status :'Accepted'},{ pointsofContact :{inq:[currentuserid ]}}]}]}};

        //const myfilter: Filter<Ap> =  { where :{ or :[{ and :[{ createdDate :{gte: start}},{ createdDate :{lte: end}}]},  { and :[{ status : 'Draft' },{ createdUserid : currentuserid }]},{ and :[{ status : 'Shared' },{ sharedCollaborators :{ inq :[ currentuserid ]}}]},{ and :[{ status : 'Accepted' },{ sharedCollaborators :{ inq :[ currentuserid ]}}]},{ and :[{ status : 'Shared' },{ pointsofContact :{ inq :[ currentuserid ]}}]},{ and :[{ status : 'Accepted' },{ pointsofContact :{ inq :[ currentuserid ]}}]}]}} ;
        console.log("filter for the month" + (m) + " " + JSON.stringify(myfilter));
        let result: {}[] = await this.apRepository.find(myfilter);
        let nov = result.length;
        apCount[m] = nov;
      }
      return apCount;
    } catch (err) {
      console.error(err);
      return err;
    }
  }


  /*

    @get('/acc-api/contract-dapp/{contract_no}/getFullContract', {
    responses: {
      '204': {
        description: 'Get full contract',
      },
    },
  })
  async getFullContract(@param.path.string('contract_no') contract_no: string): Promise<ContractDapp> {
    const dappResponse = await this.contractDappRepository.findById(contract_no);
    console.log("dappResponse ----------------------------------------");
    console.log(dappResponse);
    const full_json: any = buildContractJSON(contract_no, dappResponse);
    return full_json
  }
  */
  // @patch('/acc-api/ap', {
  //   responses: {
  //     '200': {
  //       description: 'Ap PATCH success count',
  //       content: { 'application/json': { schema: CountSchema } },
  //     },
  //   },
  // })
  // async updateAll(
  //   @requestBody() ap: Ap,
  //   @param.query.object('where', getWhereSchemaFor(Ap)) where?: Where,
  // ): Promise<Count> {
  //   return await this.apRepository.updateAll(ap, where);
  // }

  @get('/acc-api/ap/{id}', {
    responses: {
      '200': {
        description: 'Ap model instance',
        content: {'application/json': {schema: {'x-ts-type': Ap}}},
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<Ap> {
    return await this.apRepository.findById(id);
  }

  @patch('/acc-api/ap/{id}', {
    responses: {
      '204': {
        description: 'Ap PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody() ap: Ap,
  ): Promise<void> {
    await this.apRepository.updateById(id, ap);
  }

  // @put('/acc-api/ap/{id}', {
  //   responses: {
  //     '204': {
  //       description: 'Ap PUT success',
  //     },
  //   },
  // })
  // async replaceById(
  //   @param.path.string('id') id: string,
  //   @requestBody() ap: Ap,
  // ): Promise<void> {
  //   await this.apRepository.replaceById(id, ap);
  // }

  @del('/acc-api/ap/{id}', {
    responses: {
      '204': {
        description: 'Ap DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.apRepository.deleteById(id);
  }

}

