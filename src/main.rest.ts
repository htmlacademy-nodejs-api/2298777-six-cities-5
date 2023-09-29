import { RestApplication } from './rest/index.js';
import { PinoLoger } from './shared/libs/loger/index.js';

const bootstrap = () => {
  const loger = new PinoLoger();

  const restApplication = new RestApplication(loger);

  restApplication.init();
};

bootstrap();
