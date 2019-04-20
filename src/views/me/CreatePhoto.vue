<template>
	<div class="form-layout">
		<div class="panel">
			<h1>Create New Photo</h1>
			<br>
			<form @submit.prevent="signIn">
				<div class="photo-container">
					<img v-if="photo" class="avatar" :src="photo" height="200" @click="$refs.upload.click()">
					<div v-else class="blank" @click="$refs.upload.click()">
						<span>Click here to upload</span>
					</div>
					<input ref="upload" type="file" style="display: none" @change="upload">
				</div>

				<input ref="upload" type="file" style="display: none" @change="upload">
				<input v-model="name" placeholder="name">
				<input v-model="detail" placeholder="detail">
				<input v-model="tags" placeholder="tags">
				<button>Upload</button>
			</form>
		</div>
	</div>
</template>

<script>
export default {
	name: 'CreateWork',
	data () {
		return {
			name: '',
			detail: '',
			tags: ''
		}
	},
	methods: {
		upload () {
			if (!this.$refs.upload.files) {
				return
			}
			if (!this.$refs.upload.files.length) {
				return
			}

			console.log('TODO')
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
