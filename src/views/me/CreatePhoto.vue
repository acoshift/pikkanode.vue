<template>
	<div class="form-layout">
		<div class="panel">
			<h1>Create New Photo</h1>
			<br>
			<form @submit.prevent="submit">
				<div class="photo-container">
					<img v-if="photo" class="avatar" :src="photo" height="200" @click="$refs.upload.click()">
					<div v-else class="blank" @click="$refs.upload.click()">
						<span>Click here to select file</span>
					</div>
					<input ref="upload" type="file" style="display: none" @change="preview">
				</div>
				<input v-model="name" placeholder="name">
				<input v-model="detail" placeholder="detail">
				<input v-model="tags" placeholder="tags">
				<button>Create</button>
			</form>
		</div>
	</div>
</template>

<script>
export default {
	name: 'CreatePhoto',
	data () {
		return {
			name: '',
			detail: '',
			tags: '',
			photo: '',
			isSaving: false
		}
	},
	methods: {
		preview () {
			if (!this.$refs.upload.files) {
				return
			}
			if (!this.$refs.upload.files.length) {
				return
			}

			const reader = new FileReader()
			reader.onloadend = (e) => {
				if (e.target.error) {
					return
				}
				this.photo = e.target.result
			}
			reader.readAsDataURL(this.$refs.upload.files[0])
		},
		submit () {
			if (!this.$refs.upload.files) {
				return
			}
			if (!this.$refs.upload.files.length) {
				return
			}

			if (this.isSaving) {
				return
			}

			this.$api.me.createWork({
				name: this.name,
				detail: this.detail,
				tags: this.tags.split(','),
				photo: this.$refs.upload.files[0]
			})
				.then((resp) => {
					this.isSaving = false

					if (!resp.ok) {
						alert(resp.error.message)
						return
					}

					this.$router.push({ name: 'me.profile' })
				})
				.catch((e) => {
					this.isSaving = false
					alert(e.message)
				})
		}
	}
}
</script>

<style lang="scss" scoped>
	.photo-container {
		display: flex;
		justify-content: center;
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
	}
</style>
