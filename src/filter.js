import Vue from 'vue'
import moment from 'moment'

Vue.filter('datetime', (value) => {
	if (!value) return ''
	return moment(value).format('HH:mm, DD/MM/YYYY')
})
