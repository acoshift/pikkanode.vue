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
		this.reload()
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
