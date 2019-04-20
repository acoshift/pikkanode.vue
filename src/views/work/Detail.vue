<template>
	<div class="panel">
		<h1>Photo Detail</h1>

		<div class="photo-container">
			<img v-if="photo" class="photo" :src="photo">
			<div class="favorite" :class="{ active: isFavorite }">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"/></svg>
			</div>
		</div>
		<br>

		<p class="detail">
			<strong>name:</strong> {{ name }} <br>
			<strong>detail:</strong> {{ detail }} <br>
			<strong>tags:</strong> {{ tags.join(',') }} <br>
			<strong>poster:</strong> {{ username }} <br>
			<strong>post at:</strong> {{ createdAt | datetime }}
		</p>
		<hr>

		<h3>Comments</h3>
		<div v-if="comments.length > 0" class="comment-container">
			<div v-for="c in comments" :key="c.id" class="comment">
				<img v-if="photo" class="c.user.photo" :src="photo" height="200">
				<div>
					<a href class="link">
						<strong>{{ c.user.username }}</strong>
					</a>
					<br>
					<span class="message">{{ c.content }}</span> <br>
					<small class="date">{{ c.createdAt | datetime }}</small>
				</div>
			</div>
		</div>
		<p v-else>this photo doesn't have any comment</p>
		<br>

		<!-- comment section -->
		<form @submit.prevent="submitComment">
			<textarea v-model="comment" placeholder="type to comment..."></textarea>
			<button class="post-button">post</button>
		</form>
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
			comments: [],
			comment: '',
			isFavorite: false
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
					this.isFavorite = resp.result.isFavorite
				})
		},
		submitComment () {
			this.$api.work.postComment({ id: `${this.$route.params.id}`, content: this.comment })
				.then((resp) => {
					if (!resp.ok) {
						alert(resp.error.message)
						return
					}

					this.comment = ''
					this.reload()
				})
		}
	}
}
</script>

<style lang="scss" scoped>
	.photo-container {
		position: relative;
		text-align: center;

		img {
			max-width: 100%;
			object-fit: contain;
		}
	}

	.detail {
		font-size: 1.2rem;
	}

	.comment-container {
		margin-top: 1rem;

		.comment {
			display: flex;

			&:not(:first-child) {
				margin-top: 2rem;
			}

			img {
				width: 3rem;
				height: 3rem;
				border-radius: 999px;
				margin-right: 0.5rem;
			}

			.message {
				line-height: 1.65;
			}

			.date {
				opacity: .5;
			}
		}
	}

	.post-button {
		margin-left: auto;
		margin-top: 1rem;
	}
</style>
