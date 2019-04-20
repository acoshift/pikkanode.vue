<template>
	<div class="form-layout">
		<div class="panel">
			<h1>Sign Up</h1>
			<br>
			<form @submit.prevent="signUp">
				<input v-model="username">
				<input v-model="password" type="password">
				<button>Sign Up</button>
			</form>
		</div>
	</div>
</template>

<script>
export default {
	name: 'SignUp',
	data () {
		return {
			username: '',
			password: ''
		}
	},
	methods: {
		signUp () {
			this.$api.auth.signUp({
				username: this.username,
				password: this.password
			})
				.then((resp) => {
					if (!resp.ok) {
						alert(resp.error.message)
						return
					}
					alert('Sign Up success, please sign in')
					this.$router.push({ name: 'auth.signIn' })
				})
		}
	}
}
</script>

<style>
	.signup {
		display: flex;
		justify-content: center;
		text-align: center;
	}
</style>
