#! /usr/bin/env node

const states = require('../utils/states');
const district = require('../utils/districts');
const slots = require('../utils/slots');

const program = require('commander');

program.command('states')
  .description('List down all the states')
  .action(states);

  program.command('districts <stateid>')
  .description('List down all districts using state id')
  .action(district);

  program.command('slots <districtid>')
  .description('List down all slots using district pin code')
  .action(slots);  

program.parse();

// states();
// district(34);
// slots(629);