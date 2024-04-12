export type WhatsAppBusinessTextMessage = {
  id: string;
  from: string;
  timestamp: string;
  text: {
    body: string;
  };
  type: 'text';
};

export type WhatsAppBusinessReactionMessage = {
  id: string;
  from: string;
  timestamp: string;
  reaction: {
    message_id: string;
    emoji: string;
  };
  type: 'reaction';
};

export type WhatsAppBusinessMediaMessage = {
  id: string;
  from: string;
  timestamp: string;
  image: {
    caption: string;
    mime_type: string;
    sha256: string;
    id: string;
  };
  type: 'image';
};

export type WhatsAppBusinessStickerMessage = {
  id: string;
  from: string;
  timestamp: string;
  sticker: {
    id: string;
    mime_type: string;
    sha256: string;
  };
  type: 'sticker';
};

export type WhatsAppBusinessLocationMessage = {
  from: string;
  id: string;
  timestamp: string;
  location: {
    name: string;
    latitude: number;
    longitude: number;
    address: string;
  };
  type: 'location';
};

export type WhatsAppBusinessButtonMessage = {
  id: string;
  from: string;
  timestamp: string;
  context: {
    from: string;
    id: string;
  };
  interactive: {
    type: 'button_reply';
    button_reply: {
      id: string;
      title: string;
    };
  };
  type: 'interactive';
};

export type WhatsAppBusinessListMessage = {
  id: string;
  from: string;
  timestamp: string;
  context: {
    from: string;
    id: string;
  };
  interactive: {
    type: 'list_reply';
    list_reply: {
      id: string;
      title: string;
      description: string;
    };
  };
  type: 'interactive';
};

export type WhatsAppBusinessUnknownMessage = {
  id: string;
  from: string;
  timestamp: string;
  errors: Array<{
    code: number;
    title: string;
    details: string;
  }>;
  type: 'unknown';
};

export type WhatsAppBusinessMessagePayloadType =
  | WhatsAppBusinessTextMessage
  | WhatsAppBusinessReactionMessage
  | WhatsAppBusinessMediaMessage
  | WhatsAppBusinessStickerMessage
  | WhatsAppBusinessLocationMessage
  | WhatsAppBusinessButtonMessage
  | WhatsAppBusinessListMessage
  | WhatsAppBusinessUnknownMessage;

export type WhatsAppBusinessMessageReceivedPayload = {
  object: string;
  entry: Array<{
    id: string;
    changes: Array<{
      value: {
        messaging_product: string;
        metadata: {
          display_phone_number: string;
          phone_number_id: string;
        };
        contacts?: Array<{
          profile: {
            name: string;
          };
          wa_id: string;
        }>;
        messages?: WhatsAppBusinessMessagePayloadType[];
      };
      field: string;
    }>;
  }>;
};
