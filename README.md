# Samsung MDC

This package is a Node.js client for Samsung Multiple Display Protocol (MDC) servers, such as TVs and the Samsung E-Paper EMDX.

It can wake up the device using Wake-on-LAN, create a secure TCP-TLS connection with a pincode (e.g. `123456`), send commands and parse responses.

## Usage

### CLI

```text
$ npm i -g @weejewel/samsung-mdc
$ samsung-mdc --help
samsung-mdc <command>

Commands:
  samsung-mdc wakeup                Wake up a device by Wake-on-LAN
  samsung-mdc get_serial_number     Get a device's serial number
  samsung-mdc get_software_version  Get a device's software version
  samsung-mdc get_device_name       Get a device's name
  samsung-mdc get_power_state       Get a device's power state
  samsung-mdc set_content_download  Set content URL. Used in EMDX E-Paper displays

Options:
  --help     Show help                                                 [boolean]
  --version  Show version number                                       [boolean]
```

For example:

```bash
$ samsung-mdc wakeup --mac 00:11:22:33:44:55
$ samsung-mdc get_serial_number --host 192.168.0.123 --pin 123456
```

### Code

```bash
$ npm i @weejewel/samsung-mdc
```

```js
import { Device } from '@weejewel/samsung-mdc';

const device = new Device({
  mac: '00:11:22:33:44:55',
  host: '192.168.0.123',
});

// Send Wake-on-LAN packet
await device.wakeup();

// Get Serial Number
const serialNumber = await device.getSerialNumber();
console.log(`Serial Number: ${serialNumber}`);

// Disconnect
await device.disconnect();
```

## References

* Samsung EMDX CLI: [https://github.com/WeeJeWel/node-samsung-emdx](https://github.com/WeeJeWel/node-samsung-emdx)
* Python Library: [https://github.com/vgavro/samsung-mdc](https://github.com/vgavro/samsung-mdc)
* MDC Calculator: [https://mdc.sesg.ch](https://mdc.sesg.ch)