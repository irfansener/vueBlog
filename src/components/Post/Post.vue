<template>
  <div>
    Post
  </div>
</template>
<template>
  <div>
    <h1>{{ post.title }}</h1>
    <p v-html="post.content"></p>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        post: '',
        postId: this.$route.params.id
      }
    },
    created() {
      let _this = this
      firebase.database().ref('/posts').orderByChild('title').equalTo(_this.postId).on("value", snapshot => {
        _this.post = Object.values(snapshot.val())[0];
      })
    }
  }
</script>
