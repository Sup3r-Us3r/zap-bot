import { InteractiveButtonMessage } from './types';

export const confirmAppointmentButtonData: InteractiveButtonMessage = {
  header: {
    type: 'text',
    text: 'Confirmar Agendamento',
  },
  body: {
    text: 'Deseja realmente confirmar esse agendamento?',
  },
  footer: {
    text: 'Basta clicar em uma das opções abaixo!',
  },
  action: {
    buttons: [
      {
        type: 'reply',
        reply: {
          id: 'confirm-appointment-yes',
          title: 'Sim',
        },
      },
      {
        type: 'reply',
        reply: {
          id: 'confirm-appointment-no',
          title: 'Não',
        },
      },
    ],
  },
};
