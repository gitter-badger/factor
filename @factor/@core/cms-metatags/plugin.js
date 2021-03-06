export default Factor => {
  return new (class {
    constructor() {
      this.metatags = []

      Factor.$filters.add("mixins", _ => {
        _.metatags = Factor.FACTOR_SSR == "server" ? this.serverMetatags() : this.clientTitleTag()
        return _
      })

      Factor.$filters.add("site-mixins", _ => {
        _.push(this.siteMixin())
        return _
      })
    }

    siteMixin() {
      const that = this
      return {
        metatags() {
          return {
            ...that._getDefaults(),
            priority: 20
          }
        }
      }
    }

    serverMetatags() {
      return () => {
        Factor.mixin({
          async created() {
            const mtOpt = this.$options.metatags
            let mt = false
            const list = []

            if (mtOpt) {
              mt = typeof mtOpt === "function" ? mtOpt.call(this) : mtOpt
            }

            if (mt) {
              const titleSuffix = mt.titleSuffix //|| this.$ssrContext.metatagsRaw.titleSuffix

              if (titleSuffix && (!mt.title || !mt.title.includes(titleSuffix))) {
                mt.title = mt.title + titleSuffix
              }

              if (mt.image && !mt.image.includes("//")) {
                mt.image = Factor.$config.setting("url") + mt.image
              }

              // remove empty vals
              mt = this.$lodash.pickBy(mt)

              const existingMetatags = this.$ssrContext.metatags || {}

              const metatags = { ...existingMetatags, ...mt }
              this.$ssrContext.metatags = metatags

              const { title, description, canonical, image } = metatags

              if (title) {
                list.push(`<title>${title}</title>`)
              }

              if (description) {
                list.push(`<meta name="description" content="${description}" />`)
              }

              if (image) {
                list.push(`<meta property="og:image" content="${image}" />`)
              }

              if (canonical) {
                list.push(`<link rel="canonical" href="${canonical}" />`)
                list.push(`<meta property="og:url" content="${canonical}" />`)
              }

              this.$ssrContext.extend.metatags = list.join("")
            }
          }
        })
      }
    }

    clientTitleTag() {
      const that = this

      Factor.mixin({
        watch: {
          $route: {
            handler: function() {
              const { metatags } = this.$options

              if (metatags) {
                const mt = typeof metatags === "function" ? metatags.call(this) : metatags

                that.metatags.push(this.$lodash.pickBy(mt))
              }
            },
            immediate: true
          }
        }
      })

      Factor.$filters.add("client-route-loaded", () => {
        setTimeout(() => {
          let finalMeta = {}

          const sorted = Factor.$utils.sortPriority(this.metatags)

          sorted.forEach(mt => {
            finalMeta = { ...finalMeta, ...mt }
          })

          const def = that._getDefaults(finalMeta)

          document.title = `${def.title} ${def.titleSuffix}`
        }, 70)
      })
    }

    _getDefaults(meta = {}) {
      const metatagSettings = Factor.$config.setting("metatags") || {}
      const currentPath = Factor.$router.currentRoute.path

      return {
        title: Factor.$utils.toLabel(currentPath.split("/").pop()),
        description: "",
        image: "",
        titleSuffix: "",
        ...metatagSettings,
        ...meta
      }
    }
  })()
}
