<template>
  <BaseWrapper :title="title" :subtitle="subtitle">
    <BaseButton
      @click="$emit('onRemove')"
      color="#FF1D30"
      outlined
      :text="buttonText"
      className="text-none"
    />
  </BaseWrapper>
</template>
<script>
import BaseWrapper from '@/templates/wrapper/BaseWrapper'
export default {
  components: {
    BaseWrapper,
  },
  props: {
    buttonText: String,
    title: String,
    subtitle: String,
  },
}
</script>