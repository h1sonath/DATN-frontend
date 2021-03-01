<template>
  <span
    class="cursor-pointer font-weight-medium action-hover ellipsis-one-line"
    @click="$emit('click')"
  >
    <slot />
    <div class="d-flex align-center" v-if="isBack" :class="textClass">
      <v-icon size="18" class="mr-1">mdi-arrow-left</v-icon> {{ backText }}
    </div>
  </span>
</template>
<script>
export default {
  props: {
    isBack: Boolean,
    backText: String,
    textClass: String,
  },
}
</script>
