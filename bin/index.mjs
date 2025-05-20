#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import Device from '../lib/Device.mjs';

const optionsDevice = yargs => {
  return yargs
    .option('host', {
      required: true,
      type: 'string',
    })
    .option('port', {
      required: true,
      type: 'number',
      default: 1515,
    })
    .option('display', {
      required: true,
      type: 'number',
      default: 0,
    })
    .option('pin', {
      required: true,
      type: 'string',
      default: '000000',
    });
};

yargs(hideBin(process.argv))
  .command({
    command: 'wakeup',
    describe: `Wake up a device by Wake-on-LAN`,
    builder: (yargs) => {
      return yargs
        .option('mac', {
          required: true,
          type: 'string',
        })
        .option('host', {
          required: true,
          type: 'string',
          default: '255.255.255.255',
        })
        .option('port', {
          required: true,
          type: 'number',
          default: 9,
        })
        .option('bytes', {
          type: 'number',
          default: 6,
        })
        .option('repetitions', {
          type: 'number',
          default: 16,
        });
    },
    handler: async (argv) => {
      const device = new Device({
        mac: argv.mac,
        host: argv.host,
        port: argv.port,
      });
      await device.wakeup({
        bytes: argv.bytes,
        repetitions: argv.repetitions,
      });
      console.log(`Sent magic packet to ${argv.mac} at ${argv.host}:${argv.port}`);
    },
  })
  .command({
    command: 'get_serial_number',
    describe: `Get a device's serial number`,
    builder: optionsDevice,
    handler: async (argv) => {
      const device = new Device({ ...argv });
      const serial = await device.getSerialNumber();
      console.log(`Serial Number: ${serial}`);
      await device.disconnect();
    },
  })
  .command({
    command: 'download_content',
    describe: `Download content from a device`,
    builder: optionsDevice,
    handler: async (argv) => {
      // TODO
      console.log('download_content', argv);
    },
  })
  .demandCommand()
  .parse();