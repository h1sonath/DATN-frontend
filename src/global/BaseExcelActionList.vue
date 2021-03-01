<template>
  <div>
    <v-menu offset-y>
      <template v-slot:activator="{on, attrs}">
        <div v-if="isCustomActivator" v-bind="attrs" v-on="on">
          <v-tooltip top close-delay="1000">
            <template v-slot:activator="{on, attrs}">
              <v-btn
                color="primary"
                outlined
                v-bind="attrs"
                v-on="on"
                class="text-none"
              >
                Nhập/xuất Excel
                <v-icon right>mdi-menu-down</v-icon>
              </v-btn>
            </template>
            <slot name="tooltip" />
          </v-tooltip>
        </div>
        <v-btn
          v-else
          color="primary"
          outlined
          v-bind="attrs"
          v-on="on"
          class="text-none"
        >
          Nhập/xuất Excel
          <v-icon right>mdi-menu-down</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(item, index) in listSelectionExcel"
          :key="index"
          @click="selectActionExcel(item.value)"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <input
      ref="input-excel-file"
      type="file"
      accept=".xlsx, .xls"
      class="d-none"
    />
    <BaseProgressBar ref="progress-bar" />
  </div>
</template>
<script>
import {get} from 'lodash-es'
export default {
  props: {
    listSelectionExcel: {
      type: Array,
      default: () => [
        {
          title: 'Nhập file Excel',
          value: 'importExcel',
        },
        {
          title: 'Download file mẫu',
          value: 'downloadTemplate',
        },
        {
          title: 'Xuất file excel',
          value: 'exportExcel',
        },
      ],
    },
    excelTemplate: Object,
    excelFileName: String,
    exportObjects: Array,
    isCustomActivator: Boolean,
    richCellRangeStart: {
      type: Number,
      default: 0,
    },
    richCellRangeEnd: {
      type: Number,
      default: 0,
    },
    isCustomSelectActions: Boolean,
  },
  mounted() {
    this.$refs['input-excel-file'].onchange = async (e) => {
      let isUploadFileSuccessful = true
      let file = get(e, 'target.files.0')
      if (!file) {
        return
      }
      let dataExcel = await this.$utils
        .importFileExcelAndGetData(
          e.target.files[0],
          Object.keys(this.excelTemplate).length - 1,
          this.richCellRangeStart,
          this.richCellRangeEnd
        )
        .catch((e) => {
          isUploadFileSuccessful = false
          if (e.type === 'wrong_template') this.$message.error(e.message)
          else this.$message.error('Có lỗi khi đọc file, vui lòng thử lại!')
        })
      this.$refs['input-excel-file'].value = ''
      if (isUploadFileSuccessful) {
        if (dataExcel && dataExcel.length > 0) this.createObjects(dataExcel)
        else this.$message.error('Vui lòng upload file có nội dung')
      }
    }
  },
  methods: {
    selectActionExcel(value) {
      if (!this.isCustomSelectActions) {
        if (value === 'importExcel') {
          this.importExcel()
        } else if (value === 'downloadTemplate') {
          this.downloadTemplate()
        } else if (value === 'exportExcel') {
          this.exportExcel()
        }
      } else {
        this.$emit('selectActionExcel', value)
      }
    },
    importExcel() {
      this.$refs['input-excel-file'].click()
    },
    downloadTemplate() {
      this.$utils.exportFileExcel(
        [this.excelTemplate],
        `template-${this.excelFileName}`
      )
    },
    async exportExcel() {
      await this.$emit('fetchDataToExport')
      this.$utils.exportFileExcel(
        this.exportObjects,
        `export-${this.excelFileName}`
      )
    },
    async createObjects(listObject) {
      const progressBar = this.$refs['progress-bar']
      for await (const object of listObject) {
        if (!object) return
        progressBar.openLoading()
        progressBar.changePercentage(
          'update',
          listObject.indexOf(object),
          listObject.length
        )
        await this.$emit('create', object)
        await this.$utils.delay(500)
      }
      await setTimeout(() => this.$emit('postCreate'), 1500)
      progressBar.closeLoading()
    },
  },
}
</script>