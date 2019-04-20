<template>
	<div>
		<h1>Photo Detail</h1>
		<img v-if="photo" class="photo" :src="photo" height="200">
		<p>name: {{ name }}</p>
		<p>detail: {{ detail }}</p>
		<p>tags: {{ tags.join(',') }}</p>
		<p>poster: {{ username }}</p>
		<p>post at: {{ createdAt | datetime }}</p>

		<h1>Comments</h1>
		<div v-if="comments.length > 0">
			<div v-for="c in comments" :key="c.id">
				<p>{{ c.content }}</p>
				<img v-if="photo" class="c.user.photo" :src="photo" height="200">
				<p>by {{ c.user.username }} post at: {{ c.createdAt | datetime }}</p>
			</div>
		</div>
		<p v-else>this photo doesn't have any comment</p>
	</div>
</template>

<script>
export default {
	name: 'Detail',
	data () {
		return {
			name: '',
			detail: '',
			photo: '',
			tags: [],
			username: '',
			createdAt: '',
			comments: []
		}
	},
	created () {
		this.reload()
	},
	methods: {
		reload () {
			this.$api.work.get({ id: `${this.$route.params.id}` })
				.then((resp) => {
					if (!resp.ok) {
						alert(resp.error.message)
						return
					}

					this.name = resp.result.name
					this.detail = resp.result.detail
					this.photo = resp.result.photo
					this.tags = resp.result.tags
					this.username = resp.result.username
					this.createdAt = resp.result.createdAt
					this.comments = resp.result.comments
				})
		},
	}
}
</script>

<style lang="scss" scoped>
</style>
