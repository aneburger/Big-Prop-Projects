import { createContactServer } from './app.js';
import { readConfig } from './mailgun.js';

const config = readConfig();
createContactServer(config).listen(config.port, config.host, () => {
  console.log(`Contact API listening on ${config.host}:${config.port}`);
});
