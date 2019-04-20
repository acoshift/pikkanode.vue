<template>
	<div class="form-layout">
		<div class="panel">
			<h1>Update Photo</h1>
			<br>
			<form @submit.prevent="save">
				<div class="photo-container">
					<img v-if="photo" class="avatar" :src="photo" height="200">
				</div>

				<input v-model="name" placeholder="name">
				<input v-model="detail" placeholder="detail">
				<input v-model="tags" placeholder="tags">
				<button>Save</button>
			</form>
		</div>
	</div>
</template>

<script>
export default {
	name: 'UpdatePhoto',
	data () {
		return {
			name: '',
			detail: '',
			photo: '',
			tags: '',
			isSaving: false
		}
	},
	created () {
		this.$api.work.get({ id: `${this.$route.params.id}` })
			.then((resp) => {
				if (!resp.ok) {
					alert(resp.error.message)
					this.$router.push({ name: 'home' })
					return
				}

				this.name = resp.result.name
				this.detail = resp.result.detail
				this.photo = resp.result.photo
				this.tags = resp.result.tags.join(',')
				this.isSaving = false
			})
	},
	methods: {
		save () {
			if (this.isSaving) {
				return
			}

			this.$api.me.updateWork({
				id: `${this.$route.params.id}`,
				name: this.name,
				detail: this.detail,
				tags: this.tags.split(',')
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
