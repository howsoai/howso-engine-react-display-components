window.APP_CONFIG = {
  oidc: {
    authority: "https://management.local.howso.com/oauth",
    client_id: "platform-ui-app-client-id",
    redirect_uri: "https://localhost:3000",
  },
  scheme: "https",
  domains: {
    base: "local.howso.com",
    self: "localhost:3000",
    api: "api.local.howso.com",
    docs: "docs.howso.com",
    auth: "management.local.howso.com",
  },
  pypi: {
    host: "pypi.local.howso.com",
    indexUrl: "pypi.local.howso.com/simple/",
    securityEnabled: false,
  },
  features: {
    jobs: true,
  },
};
