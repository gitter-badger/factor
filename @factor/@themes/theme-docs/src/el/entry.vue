<template>
  <div class="docs-entry">
    <div v-formatted-text="text" />
  </div>
</template>
<script>
export default {
  props: {
    text: { type: String, default: "" }
  },
  data() {
    return {}
  },

  watch: {
    $route: function(to, from) {
      if (to.path != from.path) {
        this.setPage()
      }
    }
  },
  mounted() {
    require("../prism/prism.js")

    this.prism = window.Prism

    this.setPage()
  },
  methods: {
    setPage() {
      // wait til content is done rendering
      setTimeout(() => {
        this.prism.highlightAll()
      }, 50)
    }
  }
}
</script>
<style lang="less">
@import "../prism/prism.less";

code {
  color: #ff0070;
  font-family: "Roboto Mono", Monaco, courier, monospace;
  padding: 3px 5px;
  margin: 0 2px;
  border-radius: 5px;
  white-space: nowrap;
  background-color: rgba(255, 4, 4, 0.05);
  font-family: "Roboto Mono", Monaco, courier, monospace;
  font-size: 0.85em;
  -webkit-font-smoothing: initial;
  -moz-osx-font-smoothing: initial;
}

// pre code {
//   overflow-x: auto;
//   background-color: #f8f8f8;

//   white-space: pre;

//   padding: 1.2em 1.4em;
//   font-size: 0.9rem;
//   line-height: 1.6rem;
//   display: block;
// }

// Docs Content
.docs-entry {
  /* Code blocks */
  pre {
    background: #f7f8f9;
    border-radius: 5px;
    position: relative;
    padding: 1.5em;
    overflow-x: auto;
    line-height: normal;
    code {
      color: inherit;
      margin: 0;
      padding: 0;
      background: transparent;
    }
  }

  margin: 0 auto;
  h1 {
    font-size: 2em;
  }
  h2 {
    font-size: 1.5em;
  }
  h3 {
    font-size: 1.2em;
    margin: 2em 0 1em;
  }
  h4 {
    margin: 1em 0;
    font-size: 1.15em;
    opacity: 0.4;
  }
  h1,
  h2,
  h3,
  h4 {
    font-weight: 800;
    a {
      font-weight: 800;
    }
  }
  h1,
  h2,
  h3,
  h4 {
    position: relative;
    a {
      pointer-events: auto;
      color: inherit;
    }
  }
  h1 {
    margin: 0 0 1em;
  }
  h2 {
    margin: 45px 0 0.8em;
    padding-bottom: 0.7em;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }
  h3 {
    position: relative;
    &:before {
      content: "#";
      color: var(--color-primary);
      position: absolute;
      left: -0.9em;
      margin-top: -0.15em;
      font-size: 1.2em;
      font-weight: 800;
    }
  }
  a {
    color: var(--color-primary);
    font-weight: 600;
  }
  img {
    max-width: 100%;
  }
  p,
  ul,
  ol {
    line-height: 1.7;
    padding-bottom: 1.2em;
  }
  ol,
  ul {
    padding-left: 1.5em;
  }
  blockquote {
    margin: 2em 0;
    padding: 1em 2em;
    border-radius: 5px;
    box-shadow: var(--input-shadow);
    p {
      padding-bottom: 0;
    }
  }
  .alert {
    color: var(--color-light);
    background-color: var(--color-bg-dark);
    padding: 15px 15px 0;
    line-height: 20px;
    margin: 20px 0;
    border-radius: 4px;
    code {
      background-color: rgba(255, 255, 255, 0.1);
    }
    a {
      color: var(--color-light);
      text-decoration: underline;
    }
  }

  hr {
    margin-top: 20px;
    margin-bottom: 20px;
    border: 0;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  }
  p.tip {
    padding: 12px 24px 12px 30px;
    margin: 2em 0;
    border-left: 4px solid var(--color-primary);
    background-color: #fff;
    border-radius: 0 4px 4px 0;
  }
  sub,
  sup {
    position: relative;
    font-size: 75%;
    line-height: 0;
    vertical-align: baseline;
  }
  sub {
    top: -0.5em;
  }
  sup {
    bottom: -0.25em;
  }
  table {
    margin-bottom: 1em;
    border-spacing: 0;

    thead tr th {
      background: #f8f8f8;
      padding: 10px 15px;
      text-transform: uppercase;
    }
    th,
    td {
      border: 1px solid rgba(0, 0, 0, 0.1);
    }
    td {
      padding: 10px;
    }
  }
}
</style>