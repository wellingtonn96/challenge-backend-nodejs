export const documentation = {
  swagger: '2.0',
  info: {
    version: '1.0.0',
    title: 'Users api Nodejs',
    description: 'Node.js Application API',
    license: {
      name: 'MIT',
      url: 'https://opensource.org/licenses/MIT',
    },
  },
  host: 'localhost:3333',
  tags: [
    {
      name: 'Users',
      description: 'API para manipulação de usuarios no sistema',
    },
  ],
  schemes: ['http'],
  consumes: ['application/json'],
  produces: ['application/json'],
  paths: {
    '/users/download': {
      get: {
        tags: ['Users'],
        description: 'Baixar usuários da api',
        produces: ['application/json'],
        summary: 'Baixar usuários da api externa',
        responses: {
          '200': {
            description: 'Rota para baixar usuários da api externa',
          },
        },
      },
    },
    '/users/save': {
      get: {
        tags: ['Users'],
        summary: 'Salvar todos usuários no banco de dados',
        responses: {
          '200': {
            description:
              'Rota para cadastrar todos os usuários da api no banco de dados',
          },
        },
      },
    },
  },
};
