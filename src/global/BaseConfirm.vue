<template>
  <v-dialog
    :persistent="dialog.persistent"
    v-model="dialog.state"
    max-width="400px"
  >
    <v-card>
      <v-card-title class="title break-word">
        {{ dialog.title }}
      </v-card-title>
      <v-card-text class="text-align-justify">
        <span v-if="dialog.text" class="body">{{ dialog.text }}</span>
        <slot></slot>
      </v-card-text>
      <v-card-actions class="d-flex justify-space-between pt-0 px-5 pb-5">
        <BaseButton
          v-show="!dialog.hideOk"
          :color="dialog.confirmColor || 'red'"
          @click="done"
          class="ma-0 elevation-0"
          :text="dialog.okText"
          className="text-uppercase"
        />
        <BaseButton
          v-show="!dialog.hideCancel"
          color="#616161"
          outlined
          @click="cancel"
          class="ma-0 elevation-0"
          :text="dialog.cancelText"
          className="text-uppercase"
        />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialog: this.$confirm.confirmData,
    }
  },
  methods: {
    done() {
      this.dialog.done()
      this.dialog.state = false
    },
    cancel() {
      this.$confirm.cancel()
    },
  },
}
</script>
<style lang="scss" scoped>
.break-word {
  word-break: break-word;
}
</style>
