#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import Device from '../lib/Device.mjs';

const optionsDevice = yargs => {
  return yargs
    .option('host', {
      required: true,
      type: 'string',
      describe: 'IP address',
    })
    .option('port', {
      required: true,
      type: 'number',
      default: 1515,
      describe: 'Port',
    })
    .option('display', {
      required: true,
      type: 'number',
      default: 0,
      describe: 'Display ID',
    })
    .option('pin', {
      required: true,
      type: 'string',
      describe: 'e.g. 000000',
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
          describe: 'MAC address',
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
      const serialNumber = await device.getSerialNumber({
        displayId: argv.display,
      });
      console.log(serialNumber);
      await device.disconnect();
    },
  })
  .command({
    command: 'get_software_version',
    describe: `Get a device's software version`,
    builder: optionsDevice,
    handler: async (argv) => {
      const device = new Device({ ...argv });
      const softwareVersion = await device.getSoftwareVersion({
        displayId: argv.display,
      });
      console.log(softwareVersion);
      await device.disconnect();
    },
  })
  .command({
    command: 'get_device_name',
    describe: `Get a device's name`,
    builder: optionsDevice,
    handler: async (argv) => {
      const device = new Device({ ...argv });
      const deviceName = await device.getDeviceName({
        displayId: argv.display,
      });
      console.log(deviceName);
      await device.disconnect();
    },
  })
  .command({
    command: 'get_power_state',
    describe: `Get a device's power state`,
    builder: optionsDevice,
    handler: async (argv) => {
      const device = new Device({ ...argv });
      const powerState = await device.getPowerState({
        displayId: argv.display,
      });
      console.log(`Power State: ${powerState}`);
      await device.disconnect();
    },
  })
  .command({
    command: 'set_content_download',
    describe: `Set content URL. Used in EMDX E-Paper displays`,
    builder: yargs => optionsDevice(yargs)
      .option('url', {
        required: true,
        type: 'string',
        describe: 'http://example.com/content.json',
      }),
    handler: async (argv) => {
      const device = new Device({ ...argv });
      await device.setContentDownload({
        displayId: argv.display,
        url: argv.url,
      });
    },
  })
  // .command({
  //   command: 'get_battery_state',
  //   describe: `Get a device's battery state`,
  //   builder: optionsDevice,
  //   handler: async (argv) => {
  //     const device = new Device({ ...argv });
  //     const batteryState = await device.getBatteryState({
  //       displayId: argv.display,
  //     });
  //     console.log(`Battery State: ${batteryState}`);
  //     await device.disconnect();
  //   },
  // })
  .demandCommand()
  .parse();