<template>
    <div class="home">
        <div class="panel fluid">
            <h1>Discovery</h1>
            <div v-if="discoveryWorks.length > 0" class="container">
                <router-link tag="div" :to="{ name: 'work.get', params: { id: w.id } }" v-for="w in discoveryWorks" :key="w.id" class="card-work">
                    <img class="photo" :src="w.photo" height="200">
                    <p>name: {{ w.name }}</p>
                    <p>detail: {{ w.detail }}</p>
                    <p>tags: {{ w.tags.join(',') }}</p>
                    <p>post at: {{ w.createdAt | datetime }}</p>
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
			discoveryWorks: [],
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
