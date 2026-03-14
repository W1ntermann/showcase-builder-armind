import { makeWebhookService } from '@/services/makeWebhook';

/**
 * Утиліта для тестування Make webhook інтеграції
 * Використовуйте у консолі браузера для відладки
 */

// Експортуємо функції для використання в консолі браузера
(window as any).testMakeWebhook = {
  
  /**
   * Перевіряє чи налаштований webhook
   */
  isConfigured: () => {
    const configured = makeWebhookService.isConfigured();
    console.log('🔧 Make webhook configured:', configured);
    if (!configured) {
      console.log('ℹ️ Додайте VITE_MAKE_WEBHOOK_URL в .env файл');
    }
    return configured;
  },

  /**
   * Показує поточний URL webhook (для відладки)
   */
  getUrl: () => {
    const url = makeWebhookService.getWebhookUrl();
    console.log('🔗 Current webhook URL:', url);
    return url;
  },

  /**
   * Відправляє тестові дані
   */
  sendTestData: async () => {
    console.log('🚀 Відправка тестових даних...');
    
    const testData = {
      name: "Тестовий клієнт",
      phone: "+380931234567",
      question: "Тестове повідомлення з браузера",
      timestamp: new Date().toLocaleString('uk-UA', { 
        timeZone: 'Europe/Kiev',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      }),
      source: "browser-test",
      utm_source: "test",
      utm_medium: "console",
      utm_campaign: "debug",
      page_url: window.location.href
    };

    try {
      const result = await makeWebhookService.sendToMake(testData);
      
      if (result.success) {
        console.log('✅ Тест успішний!', result);
      } else {
        console.log('❌ Тест провалився:', result.error);
      }
      
      return result;
    } catch (error) {
      console.error('💥 Помилка тесту:', error);
      return { success: false, error: error };
    }
  },

  /**
   * Відправляє кастомні дані
   */
  sendCustomData: async (data: any) => {
    console.log('📤 Відправка кастомних даних:', data);
    
    try {
      const result = await makeWebhookService.sendToMake(data);
      console.log('📥 Результат:', result);
      return result;
    } catch (error) {
      console.error('💥 Помилка:', error);
      return { success: false, error: error };
    }
  },

  /**
   * Показує інструкції для тестування
   */
  help: () => {
    console.log(`
🔧 Make Webhook Test Utils

Доступні команди:

testMakeWebhook.isConfigured()     - Перевірити налаштування
testMakeWebhook.getUrl()          - Показати поточний URL
testMakeWebhook.sendTestData()    - Відправити тестові дані
testMakeWebhook.sendCustomData({...}) - Відправити кастомні дані
testMakeWebhook.help()            - Показати цю довідку

Приклад використання:
> testMakeWebhook.isConfigured()
> testMakeWebhook.sendTestData()
> testMakeWebhook.sendCustomData({
    name: "Іван",
    phone: "+380123456789",
    question: "Тест"
  })

Переконайтеся, що налаштували VITE_MAKE_WEBHOOK_URL в .env файлі!
    `);
  }
};

// Автоматично показуємо довідку при імпорті
console.log('🎯 Make Webhook Test Utils завантажені! Введіть testMakeWebhook.help() для довідки');

export default (window as any).testMakeWebhook;
