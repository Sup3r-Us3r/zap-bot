export type InteractiveListMessage = {
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
    /** Maximum 20 characters */
    button: string;
    //* * Maximum 10 section */
    sections: Array<{
      /** Maximum 24 characters */
      title: string;
      rows: Array<{
        id: string;
        /** Maximum 24 characters */
        title: string;
        /** Maximum 72 characters */
        description: string;
      }>;
    }>;
  };
};
