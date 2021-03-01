<template>
  <v-dialog width="500" v-model="dialog">
    <v-card>
      <v-card-title class="headline">Soạn thông báo</v-card-title>
			<v-divider />
      <v-card-text class="pt-5 pb-0">
        <v-form v-model="form" ref="form-send-notification">
          <BaseInput
            label="Tiêu đề thông báo"
            placeholder="Nhập tiêu đề thông báo"
            :rules="[$rules.required]"
            v-model="title"
          />
          <BaseInput
            label="Nội dung thông báo"
            placeholder="Nhập nội dung thông báo"
            :rules="[$rules.required]"
            v-model="content"
          />
        </v-form>
      </v-card-text>
			<v-divider />
      <v-card-actions class="py-4">
        <v-spacer></v-spacer>
        <BaseButton
          @click="dialog = false"
          isButtonText
          text="Huỷ"
        />
        <BaseButton
          @click="onSendNotification"
          text="Gửi"
          :dark="false"
          :disabled="!form"
        />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  data() {
    return {
      title: '',
      dialog: false,
      content: '',
      form: false,
    }
  },
  methods: {
    openDialog() {
      this.dialog = true
    },
    closeDialog() {
      this.dialog = false
    },
    onSendNotification() {
      const validate = this.$refs['form-send-notification'].validate()
      if (validate) {
        this.$emit('sendNotification', {title: this.title, text: this.content})
      } else this.$message.warning('Vui lòng kiểm tra lại trường thông tin !')
    },
  },
}
</script>