export default Factor => {
  return new (class {
    constructor() {
      Factor.$stack.registerProvider({
        provider: "google-auth",
        title: "Google Auth Api",
        description:
          "Google's authentication API requires ApiKey (browser) and ClientId. Find in the Google Cloud Console.",
        link: "https://console.developers.google.com/apis/credentials",
        settings: {
          group: "google",
          config: ["apiKey", "clientId"]
        }
      })

      Factor.$stack.cover({
        id: "auth-provider-tokens-google",
        requires: ["google-auth"],
        description: "Returns Google Api Auth tokens.",
        service: async _ => {
          return await this.getToken(_)
        }
      })

      if (!Factor.$isNode) {
        this.init()
      }
    }

    init() {
      const { google: { apiKey = "", clientId = "" } = {} } = Factor.$config.settings()

      this.apiKey = apiKey
      this.clientId = clientId

      Factor.$events.$on("logout", () => {
        this.logout()
      })
    }

    listeners() {
      // Factor.$filters.add("auth-provider-tokens", ({ provider }) => {
      //   if (provider.includes("google")) {
      //     return this.getToken()
      //   }
      // })
    }

    loadClientApi() {
      return new Promise(resolve => {
        if (this.gapi) {
          resolve(this.gapi)
        } else {
          require("scriptjs")("https://apis.google.com/js/api.js", () => {
            this.gapi = window.gapi
            this.gapi.load("client:auth2", {
              callback: async () => {
                await this.gapi.client.init({
                  apiKey: this.apiKey,
                  clientId: this.clientId,
                  scope: "profile",
                  discoveryDocs: ["https://people.googleapis.com/$discovery/rest?version=v1"]
                })

                resolve(this.gapi)
              },
              onerror: () => {
                reject("gapi.client failed to load!")
              },
              timeout: 2000,
              ontimeout: () => {
                reject("gapi.client could not load in a timely manner!")
              }
            })
          })
        }
      })
    }
    async getToken(_) {
      const googleAuth = await this.login(_)
      const idToken = googleAuth.Zi.id_token
      const accessToken = googleAuth.Zi.access_token

      return { idToken, accessToken }
    }

    // https://developers.google.com/identity/sign-in/web/reference#googleauthsigninoptions
    async login(options = {}) {
      await this.loadClientApi()
      // Ideally the button should only show up after gapi.client.init finishes, so that this
      // handler won't be called before OAuth is initialized.
      const result = await this.gapi.auth2.getAuthInstance().signIn(options)

      return result
    }

    async loggedIn() {
      await this.loadClientApi()
      return this.gapi.auth2.getAuthInstance().isSignedIn.get()
    }

    async logout() {
      await this.loadClientApi()
      if (this.loggedIn()) {
        this.gapi.auth2.getAuthInstance().signOut()
      }
    }
  })()
}
