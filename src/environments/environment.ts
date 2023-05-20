// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
import env from "./.env";

export const environment = {
  production: false,
  fineractPlatformTenantId: "default",
  baseApiUrl: "https://localhost:8443",
  allowServerSwitch: env.allow_switching_backend_instance,
  apiProvider: "/fineract-provider/api",
  apiVersion: "/v1",
  contextPath: "/self",
  serverUrl: "",
  oauth: {
    enabled: false, // For connecting to Mifos X using OAuth2 Authentication change the value to true
    serverUrl: "",
  },
  preloadClients: true,
};

// Server URL
environment.serverUrl = `${environment.baseApiUrl}${environment.apiProvider}${environment.apiVersion}`;
environment.oauth.serverUrl = `${environment.baseApiUrl}${environment.apiProvider}`;
