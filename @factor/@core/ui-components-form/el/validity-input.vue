<template>
  <input
    v-if="isRequired"
    ref="customValidity"
    :name="
      $attrs['data-test'] ? `custom-validity-${$attrs['data-test']}` : ''
    "
    :title="customValidity"
    type="text"
    class="validity-input"
    tabindex="-1"
  >
</template>

<script>
export default {
  props: {
    customValidity: {
      type: [String, Boolean],
      default: ""
    }
  },
  mounted() {
    this.$watch(
      "customValidity",
      function(v) {
        if (typeof v === "string" && this.$refs.customValidity) {
          this.$refs.customValidity.setCustomValidity(v)
        }
      },
      { immediate: true }
    )
  }
}
</script>
<style lang="less">
.validity-input {
  position: absolute;
  height: 1px !important;
  width: 1px !important;
  left: 50%;
  bottom: 0;
  padding: 0;
  background-color: transparent !important;
  pointer-events: none !important;
  border: none !important;
  box-shadow: none !important;
  color: transparent;
}
</style>