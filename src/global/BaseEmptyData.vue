<template>
  <div class="py-4 d-flex justify-center flex-column">
    <div class="text-h5 font-weight-medium text--secondary text-center">
      {{ title }}
    </div>
    <div class="text-subtitle text--secondary text-center">
      {{ subtitle }}
    </div>
    <div class="mx-auto pt-4">
      <v-btn
        v-if="!isNewButtonCustomed"
        class="elevation-0 text-none full-width mb-4"
        @click="$emit('click')"
        color="primary"
      >
        <v-icon small class="mr-2">mdi-plus</v-icon>{{ buttonText }}
      </v-btn>
      <slot name="custom-new-button" />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: 'Chưa tồn tại dữ liệu',
    },
    subtitle: {
      type: String,
      default: 'Vui lòng tạo mới dữ liệu để hiển thị trên danh sách này',
    },
    buttonText: {
      type: String,
      default: 'Tạo dữ liệu mới',
    },
    isNewButtonCustomed: Boolean,
  },
}
</script>