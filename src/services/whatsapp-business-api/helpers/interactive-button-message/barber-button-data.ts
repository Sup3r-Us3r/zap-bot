import { InteractiveButtonMessage } from './types';

export type BarberData = {
  id: string;
  name: string;
};

export function barberButtonData({ id, name }: BarberData) {
  return {
    header: {
      type: 'text',
      text: name,
    },
    body: {
      text: 'Barbeiro experiente, mestre em cortes, modelagens e barbas, proporcionando serviços impecáveis e personalizados.',
    },
    footer: {
      text: 'Venha dar um talento!',
    },
    action: {
      buttons: [
        {
          type: 'reply',
          reply: {
            id,
            title: 'Selecionar barbeiro',
          },
        },
      ],
    },
  } as InteractiveButtonMessage;
}
