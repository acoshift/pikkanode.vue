<template>
	<div class="home">
		<div class="panel fluid">
			<h1>Discovery</h1>
			<div v-if="discoveryWorks.length > 0" class="container">
				<router-link tag="div" :to="{ name: 'photo.get', params: { id: w.id } }" v-for="w in discoveryWorks" :key="w.id" class="card-work">
					<img class="photo" :src="w.photo" height="200">
					<p>name: {{ w.name }}</p>
					<p>detail: {{ w.detail }}</p>
					<p>tags: {{ w.tags.join(',') }}</p>
					<p>post at: {{ w.createdAt | datetime }}</p>
					<div class="favorite" :class="{ active: w.isFavorite }">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"/></svg>
					</div>
				</router-link>
			</div>
			<p v-else>404 not found any photos</p>
		</div>
	</div>
</template>

<script>
export default {
	name: 'home',
	components: {},
	data () {
		return {
			discoveryWorks: []
		}
	},
	created () {
		this.$api.discovery.getWorks({
			paginate: {
				page: 1,
				perPage: 20
			}
		})
			.then((resp) => {
				if (!resp.ok) {
					alert(resp.error.message)
					return
				}

				this.discoveryWorks = resp.result.list
			})
	}
}
</script>

<style scoped>
	.container {
		display: flex;
		align-items: flex-start;
		flex-wrap: wrap;
		margin-top: 2rem;
	}
</style>
