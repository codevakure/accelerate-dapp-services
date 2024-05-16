#!/bin/bash
cd dapp-ap/
npm run docker:remove
cd ../dapp-facade/
npm run docker:remove
cd ../ap/
npm run docker:remove
cd ../clauses
npm run docker:remove
cd ../evaluationcriteria
npm run docker:remove
cd ../forms
npm run docker:remove
cd ../igce
npm run docker:remove
cd ../sections
npm run docker:remove
cd ../sow
npm run docker:remove
cd ../comment
npm run docker:remove
cd ../email-service
npm run docker:remove
cd ../dapp-ap
npm run docker:build
cd ../comment
npm run docker:build
cd ../ap
npm run docker:build
cd ../clauses
npm run docker:build
cd ../evaluationcriteria
npm run docker:build
cd ../forms
npm run docker:build
cd ../igce
npm run docker:build
cd ../sections
npm run docker:build
cd ../sow
npm run docker:build
cd ../email-service
npm run docker:build
cd ../dapp-facade/
npm run docker:build
cd ../dapp-ap
npm run docker:run
cd ../ap
npm run docker:run
cd ../clauses
npm run docker:run
cd ../evaluationcriteria
npm run docker:run
cd ../forms
npm run docker:run
cd ../igce
npm run docker:run
cd ../sections
npm run docker:run
cd ../sow
npm run docker:run
cd ../comment
npm run docker:run
cd ../email-service
npm run docker:run
cd ../dapp-facade/
npm run docker:run

