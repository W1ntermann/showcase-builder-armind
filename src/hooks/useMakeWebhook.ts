import { useState, useCallback } from 'react';
import { makeWebhookService, MakeWebhookData, MakeWebhookResponse } from '@/services/makeWebhook';

interface UseMakeWebhookReturn {
  sendData: (data: MakeWebhookData) => Promise<MakeWebhookResponse>;
  isLoading: boolean;
  error: string | null;
  isConfigured: boolean;
  lastResponse: MakeWebhookResponse | null;
}

/**
 * React хук для роботи з Make webhook
 */
export const useMakeWebhook = (): UseMakeWebhookReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastResponse, setLastResponse] = useState<MakeWebhookResponse | null>(null);

  const sendData = useCallback(async (data: MakeWebhookData): Promise<MakeWebhookResponse> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await makeWebhookService.sendToMake(data);
      setLastResponse(response);
      
      if (!response.success && response.error) {
        setError(response.error);
      }
      
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Невідома помилка';
      setError(errorMessage);
      
      const errorResponse: MakeWebhookResponse = {
        success: false,
        error: errorMessage
      };
      setLastResponse(errorResponse);
      
      return errorResponse;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    sendData,
    isLoading,
    error,
    isConfigured: makeWebhookService.isConfigured(),
    lastResponse
  };
};

export default useMakeWebhook;
