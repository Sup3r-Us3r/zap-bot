export type InteractiveButtonMessage = {
  header: {
    type: string;
    /** Maximum 60 characters */
    text: string;
  };
  body: {
    /** Maximum 1024 characters */
    text: string;
  };
  footer: {
    text: string;
  };
  action: {
    /** Maximum 3 button */
    buttons: Array<{
      type: string;
      reply: {
        id: string;
        title: string;
      };
    }>;
  };
};
