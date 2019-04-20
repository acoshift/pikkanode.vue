<template>
	<div>
        <div class="panel">
            <h1>Profile</h1>
            <br>

            <div class="profile">
                <img v-if="photo" class="avatar" :src="photo" height="200" @click="$refs.upload.click()">
                <div v-else class="photo" @click="$refs.upload.click()">
                    <span>Click here to upload</span>
                </div>
                <input ref="upload" type="file" style="display: none" @change="upload">
                <h2>{{ username }}</h2>
            </div>
            <hr>

            <strong>
                <span @click="tab = 'myWorks'" :class="{'active': tab === 'myWorks'}" class="link">My Works</span> |
                <span @click="tab = 'myFavoriteWorks'" :class="{'active': tab === 'myFavoriteWorks'}" class="link">My Favorite Works</span>
            </strong>
            <br>
            <br>
            <br>

            <div v-if="tab === 'myWorks'" class="work-container">
                <template v-if="myWorks.length > 0">
                    <div v-for="w in myWorks" :key="w.id" class="card-work">
                        <img class="photo" :src="w.photo" height="200">
                        <p>name: {{ w.name }}</p>
                        <p>detail: {{ w.detail }}</p>
                        <p>tags: {{ w.tags.join(',') }}</p>
                        <p>post at: {{ w.createdAt }}</p>
                    </div>
                </template>
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
    .profile {
        display: flex;
        align-items: center;

        .avatar {
            width: 100px;
            height: 100px;
            border-radius: 999px;
            cursor: pointer;
        }

        h2 {
            margin-left: 1rem;
        }
    }

    .work-container {
        display: flex;
        align-items: flex-start;
        flex-wrap: wrap;
    }
</style>
