import { RestApplication } from './rest/index.js';
import { RestConfig } from './shared/libs/config/index.js';
import { PinoLoger } from './shared/libs/loger/index.js';

const bootstrap = () => {
  const loger = new PinoLoger();
  const config = new RestConfig(loger);

  const restApplication = new RestApplication(loger, config);

  restApplication.init();
};

bootstrap();
