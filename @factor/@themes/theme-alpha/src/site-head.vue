<template>
  <div class="site-head blue">
    <div class="site-head-pad">
      <div class="brand">
        <factor-link path="/">
          <site-logo />
        </factor-link>
      </div>
      <div class="mob-nav-btn">
        <factor-link :class="{ active: showMobileMenu }" @click="showMobileMenu = !showMobileMenu" />
      </div>
      <div class="nav-wrap" :class="{ active: showMobileMenu }">
        <div class="nav">
          <slot name="nav" />
        </div>
        <div class="social">
          <slot name="social" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {
    "site-logo": () => import("./el/logo")
  },
  data() {
    return {
      showMobileMenu: false
    }
  }
}
</script>
<style lang="less">
.site-head {
  position: relative;
  z-index: 10;
  padding: 0 1.5em;
  background: var(--color-primary);
  color: var(--color-white);
}

.site-head-pad {
  height: 75px;
  align-items: center;
  display: flex;
  justify-content: space-between;

  .brand {
    display: flex;
    align-items: center;
    flex: 1;
  }
  .mob-nav-btn {
    display: none;

    a {
      position: relative;
      display: block;
      width: 30px;
      height: 30px;
      &:before,
      &:after {
        content: "";
        position: absolute;
        height: 2px;
        width: 100%;
        left: 0;
        top: 50%;
        margin-top: -1px;
        background-color: var(--color-white);
        transition: 0.29s cubic-bezier(0.52, 0.01, 0.16, 1);
      }
      &:before {
        transform: rotate(0deg) translateY(-5px);
      }
      &:after {
        transform: rotate(0deg) translateY(5px);
      }
    }
    @media (max-width: 767px) {
      display: block;
      z-index: 210;
      a.active {
        &:before,
        &:after {
          background-color: var(--color-text);
        }
        &:before {
          transform: rotate(45deg) translateY(0);
        }
        &:after {
          transform: rotate(-45deg) translateY(0);
        }
      }
    }
  }
  .nav-wrap {
    flex: 3;
    display: grid;
    grid-template-columns: 2fr 1fr;
    @media (max-width: 767px) {
      opacity: 0;
      pointer-events: none;
      &.active {
        opacity: 1;
        pointer-events: auto;
      }
      grid-template-columns: 1fr;
      position: fixed;
      align-items: center;
      z-index: 200;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border: 14px solid var(--color-primary);
      background-color: var(--color-white);
      transition: 0.55s cubic-bezier(0.52, 0.01, 0.16, 1);
    }
  }

  .nav,
  .social {
    > a {
      letter-spacing: 0.08em;
      font-size: 0.9em;
      font-weight: 300;
      color: #fdfdfd;
      margin: 0 0.5em;
      &:hover,
      &.active {
        color: var(--color-tertiary);
      }
      &:active {
        color: var(--color-tertiary);
      }
      @media (max-width: 767px) {
        font-size: 1.2em;
        color: var(--color-text);
        text-align: center;
        padding: 1.5em 0;
        &:hover,
        &.active {
          color: var(--color-primary);
        }
        &:active {
          color: var(--color-primary);
        }
      }
    }
  }

  .nav {
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    text-transform: uppercase;

    @media (max-width: 767px) {
      display: grid;
    }

    // .nav-dropdown-toggle {
    //   padding: 4px 6px;
    //   font-weight: 500;
    //   border-radius: 4px;
    //   &.active,
    //   &:hover {
    //     opacity: 0.6;
    //   }
    // }
  }
  .social {
    text-align: right;
    @media (max-width: 767px) {
      text-align: center;
      justify-content: center;
    }
  }
}
</style>