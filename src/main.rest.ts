import { MainContainer } from './rest/index.js';

const bootstrap = async () => {
  const container = new MainContainer();

  const restApplication = container.get('RestApplication');
  restApplication.init();
};

bootstrap();
