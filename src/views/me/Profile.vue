<template>
	<div>
		Profile
		<br>
		<img :src="photo">
		{{ username }}
	</div>
</template>

<script>
export default {
	name: 'Profile',
	data () {
		return {
			username: '',
			photo: ''
		}
	},
	created () {
		this.$api.me.profile()
			.then((resp) => {
				if (!resp.ok) {
					return
				}

				this.username = resp.result.username
				this.photo = resp.result.photo
			})
	}
}
</script>
