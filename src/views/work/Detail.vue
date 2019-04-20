<template>
	<div class="panel">
		<h1>Photo Detail</h1>

        <div class="photo-container">
		    <img v-if="photo" class="photo" :src="photo">
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
    .photo-container {
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
</style>
