<template>
  <div>
    <h1>New Post</h1>
    <form @submit.prevent="savePost">
      <div class="form-group">
        <label for="title">Title</label>
        <input type="text" id="title" v-model="post.title" class="form-control">
      </div>
      <div class="form-group">
        <label for="content">Content</label>
        <quill-editor id="content" v-model="post.content"></quill-editor>
      </div>
      <button class="btn btn-primary">Save Post</button>
    </form>
  </div>
</template>

<script>
  export default {
    data() {
      const currentDate = new Date().toDateString();
      return {
        post: {
          title: '',
          content: '',
          date : currentDate
        }
      }
    },
    methods: {
      savePost() {
            firebase.database().ref().child('posts').push({
              title: this.post.title,
              content: this.post.content,
              date : this.post.date
            }).key
        this.$swal('Saved new post!')
        this.$router.push('/admin/posts')
        this.mediumPost()
      },
      mediumPost() {
        const token = '2ec21d2b0245604d2e829fbd66c5a0b7e3eed2bf533ee7115908fc88263953825'
        const postUrl = 'https://api.medium.com/v1/users/'+token+'/posts'

        const json = {
          "title": this.post.title,
          "contentFormat": "html",
          "content": this.post.content,
          "canonicalUrl": "http://irfansener.com/",
          "tags": ["", "", ""],
          "publishStatus": "public"
        }
        fetch(postUrl,{
          method: 'post',
          mode: 'no-cors',
          headers: {
            'Authorization': this.token,
             'Content-Type': 'application/json; charset=UTF-8',
             'Accept': 'application/json'
          },
          body: JSON.stringify(json)
        }).then(response => {return response.json()})
        .then(data => {console.log(data)});
      }
    }
  }
</script>
