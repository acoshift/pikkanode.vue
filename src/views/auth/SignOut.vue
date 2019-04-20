<template>
	<div>Signing Out...</div>
</template>

<script>
export default {
	name: 'SignOut',
	created () {
		this.$api.auth.signOut()
			.then(() => {
				this.$router.replace({ name: 'home' })
			})
	}
}
</script>
