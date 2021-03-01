<template>
	<div class="custom-date-picker">
		<v-menu
			:close-on-content-click="false"
			:nudge-right="40"
			transition="scale-transition"
			offset-y
			max-width="290px"
			min-width="290px"
		>
			<template v-slot:activator="{on}">
				<v-text-field
					v-model="dateFormatted"
					append-icon="mdi-calendar"
					v-on="on"
					dense
					outlined
					:label="label"
					:placeholder="placeholder"
					class="text-body-2"
					readonly
				>
					<template slot="append" v-if="date">
						<v-icon class="cursor-pointer" @click="clearDate">mdi-close</v-icon>
					</template>
				</v-text-field>
			</template>
			<v-date-picker
				v-model="date"
				no-title
				@input="menu = false"
        :range="range"
				:min="min"
			/>
		</v-menu>
	</div>
</template>
<script>
import moment from 'moment'
export default {
	props: {
		type: {
			type: String,
			default: 'text',
		},
		placeholder: {
			type: String,
			default: '',
		},
		label: {
			type: String,
			default: '',
		},
    value: undefined,
    range: {
			type: Boolean,
			default: false,
		},
		min: String,
	},
	data() {
		return {
			date: '',
			dateFormatted: '',
			menu: false,
		}
	},
	mounted() {
		// let today = new Date()
		// let dd = String(today.getDate()).padStart(2, '0')
		// let mm = String(today.getMonth() + 1).padStart(2, '0') //January is 0!
		// let yyyy = today.getFullYear()
		// today = yyyy + '-' + mm + '-' + dd
		this.date = this.value ? this.value : null
	},
	watch: {
		date(val) {
			if (val) {
				this.dateFormatted = this.formatDate(val)
				this.$emit('input', this.range ? this.sortRangeDate(val) : val)
      } else {
        this.$emit('input', this.range ? this.sortRangeDate() : null)
      }
		},
		value() {
			this.date = this.value
		},
	},
	methods: {
    sortRangeDate(rangeDate = []) {
      let startDate = null
      let endDate = null
      let isNull = true
      if (rangeDate && rangeDate.length > 0) {
        const firstChosenDate = moment(rangeDate[0])
        const secondChosenDate = moment(rangeDate[1])
        if (firstChosenDate.diff(secondChosenDate) < 0) {
          startDate = firstChosenDate
          endDate = secondChosenDate
        } else {
          startDate = secondChosenDate
          endDate = firstChosenDate
        }
        isNull = false
      }
      return {startDate, endDate, isNull}
    },
		formatDate(date) {
      if (!date) return null
      if (this.range) {
        const {startDate, endDate, isNull} = this.sortRangeDate(date)
        if (isNull) return null
        return `${startDate.format('DD/MM/YYYY')} - ${endDate.format('DD/MM/YYYY')}`
      }
      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    },
    clearDate() {
      this.date = null
      this.dateFormatted = null
    },
	},
	computed: {
		defaultDate() {
			return this.formatDate(new Date())
		},
	},
}
</script>
