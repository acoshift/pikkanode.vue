<template>
	<div>
		Profile
		<br>
		<img v-if="photo" class="photo" :src="photo" height="200" @click="$refs.upload.click()">
		<div v-else class="photo" @click="$refs.upload.click()">
			<span>Click here to upload</span>
		</div>
		<input ref="upload" type="file" style="display: none" @change="upload">
		{{ username }}

		<h1>
			<span @click="tab = 'myWorks'">My Works</span> |
			<span @click="tab = 'myFavoriteWorks'">My Favorite Works</span>
		</h1>
		<div v-if="tab === 'myWorks'">
			<div v-if="myWorks.length > 0">
				<div v-for="w in myWorks" :key="w.id">
					<img class="photo" :src="w.photo" height="200">
					<p>name: {{ w.name }}</p>
					<p>detail: {{ w.detail }}</p>
					<p>tags: {{ w.tags.join(',') }}</p>
					<p>post at: {{ w.createdAt }}</p>
				</div>
			</div>
			<p v-else>You don't have any works</p>
		</div>
		<div v-else>
			<div v-if="myFavoriteWorks.length > 0">
				<div v-for="work in myFavoriteWorks" :key="work.id">
					<img class="photo" :src="work.photo" height="200">
					<p>name: {{ w.name }}</p>
					<p>detail: {{ w.detail }}</p>
					<p>tags: {{ w.tags.join(',') }}</p>
					<p>post at: {{ w.createdAt }}</p>
				</div>
			</div>
			<p v-else>You don't have any works</p>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Profile',
	data () {
		return {
			username: '',
			photo: '',
			myWorks: [],
			myFavoriteWorks: [],
			tab: 'myWorks'
		}
	},
	created () {
		this.reload()
		this.fetchMyWorks()
		this.fetchMyFavoriteWorks()
	},
	methods: {
		reload () {
			this.$api.me.profile()
				.then((resp) => {
					if (!resp.ok) {
						return
					}

					this.username = resp.result.username
					this.photo = resp.result.photo
				})
		},
		upload () {
			if (!this.$refs.upload.files) {
				return
			}
			if (!this.$refs.upload.files.length) {
				return
			}

			this.$api.me.uploadProfilePhoto(this.$refs.upload.files[0])
				.then((resp) => {
					if (!resp.ok) {
						alert(resp.error.message)
						return
					}
					this.reload()
				})
		},
		fetchMyWorks () {
			this.$api.me.getMyWorks({
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

					this.myWorks = resp.result.list
				})
		},
		fetchMyFavoriteWorks () {
			this.$api.me.getMyFavoriteWorks({
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

					this.myFavoriteWorks = resp.result.list
				})
		}
	}
}
</script>

<style lang="scss" scoped>
	.photo {
		width: 200px;
		height: 200px;
		cursor: pointer;
	}

	div.photo {
		border: red solid 1px;
		text-align: center;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
