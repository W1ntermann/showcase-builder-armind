// Google Analytics gtag declarations
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string,
      config?: {
        page_title?: string;
        page_location?: string;
        page_path?: string;
        send_to?: string;
        value?: number;
        currency?: string;
        source?: string;
        [key: string]: any;
      }
    ) => void;
    dataLayer: any[];
    // Facebook Pixel
    fbq?: (
      command: 'init' | 'track' | 'trackCustom',
      event: string,
      parameters?: any
    ) => void;
    // Yandex.Metrica
    ym?: (
      counterId: number,
      method: 'reachGoal' | 'hit' | 'params',
      goal?: string,
      params?: any
    ) => void;
    YANDEX_METRICA_ID?: number;
  }
}

export {};
