declare module 'emailjs-com' {
  export interface EmailJSResponseStatus {
    status: number;
    text: string;
  }

  export interface SendFormParams {
    serviceID: string;
    templateID: string;
    userID: string;
    templateParams?: Record<string, any>;
  }

  export function send(
    serviceID: string,
    templateID: string,
    templateParams: Record<string, any>,
    userID: string,
  ): Promise<EmailJSResponseStatus>;

  export function init(userID: string): void;

  export function sendForm(
    serviceID: string,
    templateID: string,
    form: HTMLFormElement,
    userID: string,
  ): Promise<EmailJSResponseStatus>;
}
