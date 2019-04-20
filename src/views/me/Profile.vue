<template>
	<div>
		<div class="panel">
			<h1>Profile</h1>
			<br>

			<div class="profile">
				<div v-if="photo" class="avatar-container">
					<img class="avatar" :src="photo" height="200" @click="$refs.upload.click()">
					<a href="#" class="link">Delete Avatar</a>
				</div>
				<div v-else class="blank" @click="$refs.upload.click()">
					<span>Click here to upload</span>
				</div>
				<input ref="upload" type="file" style="display: none" @change="upload">
				<div class="info">
					<h2>{{ username }}</h2>
					<div>
						<a href="#" class="link">Edit</a>
					</div>
				</div>
			</div>
			<hr>

			<strong>
				<span @click="tab = 'myPhotos'" :class="{'active': tab === 'myPhotos'}" class="link">My Photos</span> |
				<span @click="tab = 'myFavoritePhotos'" :class="{'active': tab === 'myFavoritePhotos'}" class="link">My Favorite Photos</span>
			</strong>
			<br>
			<br>
			<br>

			<div v-if="tab === 'myPhotos'" class="photo-container">
				<template v-if="myWorks.length > 0">
					<div v-for="w in myWorks" :key="w.id" class="card-work">
						<img class="photo" :src="w.photo" height="200">
						<p>name: {{ w.name }}</p>
						<p>detail: {{ w.detail }}</p>
						<p>tags: {{ w.tags.join(',') }}</p>
						<p>post at: {{ w.createdAt | datetime }}</p>
					</div>
				</template>
				<p v-else>You don't have any photos</p>
			</div>
			<div v-else>
				<div v-if="myFavoriteWorks.length > 0">
					<div v-for="w in myFavoriteWorks" :key="w.id">
						<img class="photo" :src="w.photo" height="200">
						<p>name: {{ w.name }}</p>
						<p>detail: {{ w.detail }}</p>
						<p>tags: {{ w.tags.join(',') }}</p>
						<p>post at: {{ w.createdAt | datetime }}</p>
					</div>
				</div>
				<p v-else>You don't have any photos</p>
			</div>
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
			tab: 'myPhotos'
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
	.profile {
		display: flex;
		align-items: center;

		.avatar,
		.blank {
			width: 100px;
			height: 100px;
			border-radius: 999px;
			cursor: pointer;
		}

		.blank {
			display: flex;
			align-items: center;
			text-align: center;
			padding: 0 0.5rem;
			border: 3px dashed rgb(172, 172, 172);
		}

		.info {
			margin-left: 1rem;
		}
	}

	.avatar-container {
		display: flex;
		flex-direction: column;
		align-items: center;

		.link {
			margin-top: .5rem;
			font-weight: 500;
		}
	}

	.photo-container {
		display: flex;
		align-items: flex-start;
		flex-wrap: wrap;
	}
</style>
