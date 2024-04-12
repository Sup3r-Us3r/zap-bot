import { InteractiveListMessage } from './types';

export const barbershopAddressListData: InteractiveListMessage = {
  header: {
    type: 'text',
    text: 'Barbearias',
  },
  body: {
    text: 'Selecione o endereço da barbearia desejada para continuar.',
  },
  footer: {
    text: 'Basta clicar em uma das opções abaixo!',
  },
  action: {
    button: 'Selecionar barbearia',
    sections: [
      {
        title: 'Barbearia disponível',
        rows: [
          {
            id: 'barbershop-1',
            title: '💈 Barbearia 1',
            description: 'Endereço: Itabira MG, Rua XXX, YYY, Nº 111',
          },
        ],
      },
      {
        title: 'Barbearia disponível',
        rows: [
          {
            id: 'barbershop-2',
            title: '💈 Barbearia 2',
            description: 'Endereço: Itabira MG, Rua XXX, YYY, Nº 222',
          },
        ],
      },
      {
        title: 'Barbearia disponível',
        rows: [
          {
            id: 'barbershop-3',
            title: '💈 Barbearia 3',
            description: 'Endereço: Itabira MG, Rua XXX, YYY, Nº 333',
          },
        ],
      },
      {
        title: 'Barbearia disponível',
        rows: [
          {
            id: 'barbershop-4',
            title: '💈 Barbearia 4',
            description: 'Endereço: Itabira MG, Rua XXX, YYY, Nº 444',
          },
        ],
      },
      {
        title: 'Barbearia disponível',
        rows: [
          {
            id: 'barbershop-5',
            title: '💈 Barbearia 5',
            description: 'Endereço: Itabira MG, Rua XXX, YYY, Nº 555',
          },
        ],
      },
    ],
  },
};
