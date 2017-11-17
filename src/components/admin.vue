        <template>  
          <div class="col-md-12">
            <form @submit.prevent="signIn">
              <div class="form-group">
                <label for="email">Email</label>
                <input type="email" v-model="email" id="email" name="email" class="form-control"/>
              </div>
              <div class="form-group">
                <label for="password">Password</label>
                <input type="password" v-model="password" id="password" name="password" class="form-control"/>
              </div>
              <button class="btn btn-primary">Login</button>
            </form>
          </div>
        </template>

<script type="text/javascript">
export default {
    data() {
      return {
        email: '',
        password: '',
        isLogged: false
      }
    },
    methods: {
		signIn() {
		    let _this = this
		    firebase.auth().signInWithEmailAndPassword(this.email, this.password)
		      .catch(function (error) {
		        if (errorCode === 'auth/wrong-password') {
		          alert('Wrong password.');
		        } else {
		          alert(errorMessage);
		        }
		        console.log(error);
		      })
		      .then(function (user) {
		        _this.$router.push('/')
		        _this.isLogged = true
		      });
		}
	}
}
</script>    