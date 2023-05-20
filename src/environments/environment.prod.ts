import env from "./.env";

export const environment = {
  production: true,
  fineractPlatformTenantId:
    window["env"]["fineractPlatformTenantId"] || "default",
  baseApiUrl: window["env"]["baseApiUrl"] || "https://demo.fineract.dev",
  allowServerSwitch: env.allow_switching_backend_instance,
  apiProvider: window["env"]["apiProvider"] || "/fineract-provider/api",
  apiVersion: window["env"]["apiVersion"] || "/v1",
  contextPath: "/self",
  serverUrl: "",
  oauth: {
    enabled: false, // For connecting to Mifos X using OAuth2 Authentication change the value to true
    serverUrl: "",
  },
  preloadClients: window["env"]["preloadClients"] || true,
};

// Server URL
environment.serverUrl = `${environment.baseApiUrl}${environment.apiProvider}${environment.apiVersion}`;
environment.oauth.serverUrl = `${environment.baseApiUrl}${environment.apiProvider}`;
