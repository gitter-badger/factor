<template>
  <div class="fallback-page">
    <div class="fallback-page-pad">
      <div class="title">{{ title }}</div>
      <div class="sub-title">{{ subTitle }}</div>
    </div>
  </div>
</template>

<script>
export default {
  metatags() {
    return {
      title: `${this.errorText} Error`,
      description: `Looks like you've hit a ${this.errorText} error.`
    }
  },
  computed: {
    errorText() {
      return this.$route.meta.error || 404
    },
    title() {
      return this.details.title
    },
    subTitle() {
      return this.details.subTitle
    },
    details() {
      let out

      if (this.$route.meta.error == 403) {
        out = {
          title: "403 Error",
          subTitle: "You don't have permissions to access this page"
        }
      } else {
        out = {
          title: "404 Error",
          subTitle: "This page doesn't exist."
        }
      }

      return out
    }
  }
}
</script>

<style lang="less">
.fallback-page {
  height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  letter-spacing: -0.03em;
  .fallback-page-pad {
    max-width: 450px;
    margin: 0 auto;
    line-height: 1;
    text-align: center;
    padding: 1em;
  }
  .title {
    font-size: 3em;
  }
  .sub-title {
    font-size: 1.5em;
    opacity: 0.3;
    margin: 0.5em 0 1.5em;
  }
  .description {
    font-weight: 500;
    font-size: 1.2em;
    margin: 1em 0 2em;
  }
}
</style>
