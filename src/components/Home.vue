<template>
  <div>
    <div v-for="( post, postId ) in posts" class="col-md-8 col-md-push-2 col-md-pull-2" >
      <router-link :to="{name: 'post', params: {id: seoUrl(post.title)} }">
        <h3>{{ post.title }} <p>{{ post.date }}</p></h3>
        <hr>
      </router-link>
    </div>
  </div>
</template>

<script>
  export default {
    data()
    {
      return {posts: []}
    },
    created() {
      let _this = this
      firebase.database().ref('/posts').orderByChild('content').on("value", function (snapshot) {
        _this.posts = snapshot.val()
      }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
      });
      
    },
  methods: {
    seoUrl(url) {
      // make the url lowercase         
      var encodedUrl = url.toString().toLowerCase(); 
      // replace & with and           
      encodedUrl = encodedUrl.split(/\&+/).join("-and-")
      // remove invalid characters 
      encodedUrl = encodedUrl.split(/[^a-z0-9]/).join("-");       
      // remove duplicates 
      encodedUrl = encodedUrl.split(/-+/).join("-");
      // trim leading & trailing characters 
      encodedUrl = encodedUrl.trim('-'); 

      return encodedUrl; 
    }
  }
  }
</script>

<style scoped>
  p {
    font-size:15px;
    margin-top: -20px; 
    text-align: right;
  }
</style>
