import { Container } from './rest/index.js';

const bootstrap = async () => {
  const container = new Container();

  const restApplication = container.get('RestApplication');
  restApplication.init();
};

bootstrap();
