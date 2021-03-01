<template>
  <div
    @click="$emit('click')"
    :class="{'has-box-shadow': hasShadow}"
    class="base-wrapper bg-white has-border"
  >
    <div :class="paddingBottomNone ? 'pa-5 pb-0' : 'pa-5'" >
      <div class="d-flex justify-space-between" v-if="title">
        <div class="subtitle-2">
          <v-icon class="mb-1 mr-1" small v-if="icon">{{ icon }}</v-icon
          >{{ title }}
        </div>
        <BaseButton
          v-if="buttonText"
          @click="onClick"
          :text="buttonText"
          :dark="false"
          :disabled="disabled"
          className="text-none"
          style="height: 25px"
        />
        <slot name="action-button"></slot>
      </div>
      <div v-if="subtitle" class="body-2 mt-1">{{ subtitle }}</div>
      <div :class="defaultSlotClass">
        <slot></slot>
      </div>
    </div>
    <div>
      <slot name="footer"></slot>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    paddingBottomNone: Boolean,
    hasShadow: Boolean,
    title: String,
    subtitle: String,
    buttonText: String,
    icon: String,
    disabled: Boolean,
    defaultSlotClass: {
      type: String,
      default: 'mt-4',
    },
  },
  methods: {
    onClick() {
      this.$emit('onClick')
    },
  },
}
</script>
<style lang="scss" scoped>
.is-disabled {
  opacity: 0.5;
}
</style>