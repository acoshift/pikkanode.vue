<template>
	<div id="app">
		<div v-if="isAuth" id="nav">
			<router-link :to="{ name: 'home' }">Home</router-link>
			|
			<router-link :to="{ name: 'me.profile' }">Profile</router-link>
			|
			<button @click="signOut">Sign Out</button>
		</div>
		<div v-else>
			<router-link :to="{ name: 'home' }">Home</router-link>
			|
			<router-link :to="{ name: 'auth.signIn' }">Sign In</router-link>
			|
			<router-link :to="{ name: 'auth.signUp' }">Sign Up</router-link>
		</div>
		<router-view />
	</div>
</template>

<script>
export default {
	name: 'App',
	computed: {
		isAuth () {
			return !!this.$route.meta.isAuth
		}
	},
	methods: {
		signOut () {
			this.$router.push({ name: 'auth.signOut' })
		}
	}
}
</script>
