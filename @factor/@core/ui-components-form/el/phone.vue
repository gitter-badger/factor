<template>
  <div class="phone-inputs">
    <input
      :value="phone"
      type="tel"
      placeholder="+15555555555"
      pattern="^[0-9-+s()]{6,16}"
      autocomplete="tel"
      size="15"
      title="Enter a valid phone number with country code."
      :required="$attrs.required"
      v-on="listeners"
    >
  </div>
</template>
<script>
export default {
  props: {
    value: { type: [String, Number], default: "" }
  },
  data() {
    return {}
  },
  computed: {
    phone() {
      return this.value ? this.addPlus(String(this.value)) : ""
    },
    listeners() {
      return {
        ...this.$listeners,
        input: e => {
          this.send(e.target.value)
        }
      }
    }
  },

  mounted() {},

  methods: {
    addPlus(v) {
      if (v != "" && !v.startsWith("+")) {
        v = `+${v}`
      }
      return v
    },
    send(e) {
      this.$emit("input", this.addPlus(e))
    }
  }
}
</script>
