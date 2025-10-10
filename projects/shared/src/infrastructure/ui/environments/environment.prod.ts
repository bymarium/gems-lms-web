const API_BASE_URL = import.meta.env?.API_BASE_URL || 'https://api.production.com/api';

export const environment = {
  production: true,
  apiBaseUrl: API_BASE_URL,
  apiUrls: {
    client: `${API_BASE_URL}/clients`,
    menu: `${API_BASE_URL}/menus`,
    dish: `${API_BASE_URL}/dishes`,
    order: `${API_BASE_URL}/orders`,
  }
};
