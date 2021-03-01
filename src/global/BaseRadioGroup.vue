<template>
  <v-radio-group v-bind="$attrs" v-model="data">
    <v-radio
      :color="color"
      v-for="item in items"
      :key="item.value"
      :label="`${item.title}`"
      :value="item.value"
    ></v-radio>
  </v-radio-group>
</template>
<script>
export default {
  props: {
    color: {
      type: String,
      default: 'primary'
    },
    items: {
      type: Array,
      default: () => []
    },
    value: {
      default: ''
    }
  },
  data() {
    return {
      data: ''
    }
  },
  watch: {
    data() {
      this.$emit('input', this.data)
    },
    value: {
      handler(value) {
        this.data = value
      },
      immediate: true
    }
  }
}
</script>