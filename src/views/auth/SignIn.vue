<template>
	<div>
		Sign In
		<form @submit.prevent="signIn">
			<input v-model="username">
			<input v-model="password" type="password">
			<button>Sign In</button>
		</form>
	</div>
</template>

<script>
export default {
	name: 'SignIn',
	data () {
		return {
			username: '',
			password: ''
		}
	},
	methods: {
		signIn () {
			this.$api.auth.signIn({
				username: this.username,
				password: this.password
			})
				.then((resp) => {
					if (!resp.ok) {
						alert(resp.error.message)
						return
					}
					this.$router.push({ name: 'home' })
				})
		}
	}
}
</script>
