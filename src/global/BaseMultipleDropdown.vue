<template>
  <v-select
    class="custom-dropdown"
    :items="items"
    v-bind="$attrs"
    :item-text="itemText"
    :item-value="itemValue"
    v-model="tempValue"
    outlined
    dense
    multiple
    return-object
  >
    <template slot="item" slot-scope="{ item, attrs }">
      <template v-if="getValue(item) == actionCustomValue">
        <slot name="action-custom"></slot>
        <template v-if="!$slots['action-custom']">
          {{getText(item)}}
        </template>
      </template>
      <template v-else>
        <div class="d-flex align-center full-width">
          <span class="mr-2 checkbox checkbox--checked" v-if="attrs['aria-selected'] === 'true'">
            <v-icon size="16px">mdi-check</v-icon>
          </span>
          <span class="mr-2 checkbox checkbox--not-checked" v-else></span>
          <span class="ellipsis-one-line d-inline-block">{{getText(item)}}</span>
        </div>
      </template>
    </template>
  </v-select>
</template>
<script>
import get from 'lodash-es/get'
export default {
  props: {
    items: {
      type: Array,
      default () {
        return []
      }
    },
    value: {
      type: Array,
      default() {
        return []
      }
    },
    itemText: {
      type: String,
      default: () => 'text'
    },
    itemValue: {
      type: String,
      default: () => 'value'
    },
    actionCustomValue: {
      type: String,
      default: () => 'action-custom'
    }
  },
  data(){
    return {
      tempValue: [],
    }
  },
  methods: {
    getText(item) {
      return item instanceof Object && this.itemText
        ? get(item, this.itemText)
        : item
    },
    getValue(item) {
      return item instanceof Object && this.itemValue
        ? get(item, this.itemValue)
        : item
    },
    isActionCustomValue(value) {
      return this.actionCustomValue
        && value instanceof Array
        && value.includes(this.actionCustomValue)
    }
  },
  watch: {
    tempValue(value, oldValue) {
      if(this.isActionCustomValue(value)) {
        this.$emit('action-custom')
        this.$nextTick(() => {
          this.tempValue = oldValue
          this.$forceUpdate()
        })
      } else {
        this.$emit('input', value)
      }
    },
    value: {
      handler (val) {
        this.tempValue = val
      },
      immediate: true
    }
  },
}
</script>
<style lang="scss" scoped>
* {
  font-size: 14px;
}
.checkbox {
  width: 18px;
  height: 18px;
  border: 2px solid #747474;
  border-radius: 2px;
  &--checked {
    border-color: #82b1ff;
    background: #82b1ff;
    >i.v-icon {
      color: #fff !important;
      margin-left: -1px;
      margin-bottom: 3px;
    }
  }
  &--not-checked {
    background: inherit;
  }
}
</style>