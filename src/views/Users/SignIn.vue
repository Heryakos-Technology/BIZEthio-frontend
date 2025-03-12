<template>

<div class="hidden lg:block">
    <div class="pt-10 pb-10">

<div class="relative w-1/2 h-165 rounded-2xl overflow-hidden ml-100 pt-30 mx-auto">
 
  <div class="absolute inset-0 bg-gray-100 ">
    <h1 class="text-center mt-8 font-bold text-xl w-1/2">SIgn In</h1>
    <div class="w-9/10 mx-auto mt-10">
              <div class="flex">
                  <div>
  
                      <p>User Name or Email: </p>
                  </div>
                
              </div>
              <div class="mt-2 ">
                  <input type="text" class="border-2 rounded-md focus:outline-none pl-3 border-blue-300 w-1/2 md:h-12"  v-model="email">
                 
              </div>
          </div>
          <div class="w-9/10 mx-auto mt-10">
              <div class="flex">
                  <div>
  
                      <p>Password </p>
                  </div>
                 
              </div>
              <div class="mt-2 ">
                  <input type="text" class="border-2 rounded-md focus:outline-none pl-3 border-blue-300 w-1/2 md:h-12" v-model="password">
              </div>
          </div>
          <div class="mt-9 flex w-12/12  mx-auto">
             

                 <div class="md:text-lg md:w-1/2 md:mx-auto ">
                   <div class="flex w-2/3 mx-auto">
                       <div class="">
                   <input type="radio" class= " border border-cyan-400" >
                 </div>
                 <div class=" mx-auto">
    
                     <p class="text-cyan-500 text-lg">Remember me</p>
                 </div>
                   </div>
             </div>
            <div class="w-11/10 mx-auto -mt-5">

                <p class="text-cyan-500 mt-6  ">Forgot Password?</p>
            </div>
         </div>
         <div class="w-2/3 mx-auto mt-7">
              <button  @click="() => { handleLogin(); handleLogin2(); }" class="mx-auto bg-cyan-700 text-white px-15  py-2 rounded-3xl ">Continue</button>
          </div>
          <div class="mt-5 w-12/10 mx-auto md:w-2/3 md:mx-auto">
              <p class="md:text-lg text-sm  w-12/10 mx-auto -ml-4"> Don't have an account ? <span class="text-cyan-500 ">Login</span> </p>
              <p class="text-gray-400 text-sm mt-7 w-11/11 mx-auto">Or connect with social media</p>
          </div>
          <div class="w-4/5 mx-auto text-white bg-cyan mt-5">
            <div class="w-3/4">
                <button style="background: linear-gradient(to bottom left, #57B4D3 0%,  48%, #57B4D3 98%);" class="p1-1 py-2 rounded-3xl w-7/11 text-sm"><i class="fa-brands fa-twitter -ml-6 mr-1"></i>  Sign in with Twitter</button>
            </div>
            <div class="mt-3 w-3/4">
             <button style="background: linear-gradient(to bottom left, #4584D7 0%,  48%, #6B94C9 98%);" class="pl-1 py-2 rounded-3xl w-7/11 text-sm"><i class="fa-brands fa-facebook-f -ml-4 mr-1"></i>  Sign in with Facebook </button>
            </div>
          </div>
  </div>

  <!-- Blue Diagonal Section -->
  <div class="absolute right-0 top-0 pt-20 left-112 w-1/2 mx-auto h-full bg-blue-200 transform -skew-x-12">
    <div class="w-2/3 mx-auto ">
        <img src="/public/logolarge.png" alt="" class=" pt-5 w-2/3 mx-auto -ml-8">
        <h1 class="mt-36  text-xl w-12/12 -ml-3 mx-auto">Welcome Back</h1>
        <p class="text-sm font-normal w-13/13 -ml-10 mt-2 mx-auto">Sign in to continue access pages</p>
    </div>
  </div>
</div>
</div>
</div>

    <div class="px-2 py-5 lg:hidden">
      <div class="bg-white rounded-sm pb-10 lg:hidden">
      
  <img src="/public/logo.png" alt="" class="mx-auto pt-5">
  <h1 class="text-center mt-8 font-bold text-xl">SIgn In</h1>
  <!-- <div class="flex justify-between w-1/3 mx-auto text-gray-400 mt-4 md:w-1/5 md:mx-auto">
      <div><i class="fa-brands fa-facebook-f text-2xl"></i></div>
      <div><i class="fa-brands fa-twitter text-2xl"></i></div>
      <div><i class="fa-brands fa-linkedin-in text-2xl"></i></div>
  </div> -->
  <!-- <p class="text-gray-400 text-center mt-4">fill the form for registration</p> -->
  <div class="w-2/3 mx-auto mt-10">
          <div>
              <div class="flex">
                  <div>
  
                      <p>User Name or Email </p>
                  </div>
                
              </div>
              <div class="mt-2 ">
                  <input type="text" class="border-2 rounded-md focus:outline-none pl-3 border-blue-300 w-13/13 md:h-12"  v-model="email">
                 
              </div>
          </div>
       
          <div class="mt-9">
              <div class="flex">
                  <div>
  
                      <p>Password </p>
                  </div>
                 
              </div>
              <div class="mt-2 ">
                  <input type="text" class="border-2 rounded-md focus:outline-none pl-3 border-blue-300 w-13/13 md:h-12" v-model="password">
              </div>
          </div>
      
          <div class="mt-9 flex w-1/2  mx-auto">
             
              <div class="md:text-xl md:w-2/3 md:mx-auto w-12/11">
                <div class="flex">
                    <div class="mr-3">
                <input type="radio" class= " border border-cyan-400" >
              </div>
              <div class="w-12/11">

                  <p class="text-cyan-500 w-12/11">Remember me</p>
              </div>
                </div>
                <p class="text-cyan-500 mt-6  w-12/11">Forgot Password?</p>
              </div>
          </div>
          <div class="mx-auto w-1/2 mt-6 md:w-1/3 md:mx-auto">
              <button @click="() => { handleLogin(); handleLogin2(); }" class="bg-cyan-700 text-white px-8 py-2 rounded-sm " >Continue</button>
          </div>
          <div class="mt-5 w-12/13 mx-auto md:w-2/3 md:mx-auto">
              <p class="md:text-lg text-sm text-center w-10/11"> Don't have an account ? <span class="text-cyan-500 ">Login</span> </p>
              <p class="text-gray-400 text-sm mt-2 w-10/11 text-center">Or connect with social media</p>
          </div>
          <div class="w-4/5 mx-auto text-white bg-cyan mt-10">
            <div>
                <button style="background: linear-gradient(to bottom left, #57B4D3 0%,  48%, #57B4D3 98%);" class="p1-1 py-2 rounded-md w-11/11 text-sm"><i class="fa-brands fa-twitter -ml-6 mr-1"></i>  Sign in with Twitter</button>
            </div>
            <div class="mt-3">
             <button style="background: linear-gradient(to bottom left, #4584D7 0%,  48%, #6B94C9 98%);" class="pl-1 py-2 rounded-md w-11/11 text-sm"><i class="fa-brands fa-facebook-f -ml-4 mr-1"></i>  Sign in with Facebook </button>
            </div>
          </div>
         
      </div>
      </div>
      
    <div class="hidden lg:block w-2/3 mx-auto rounded-md"  style="background: linear-gradient(to bottom right, #F5F5F5 10%, #F5F5F5 38%, #BDE5F2 98%);">
<div class="flex">
    <div class=" rounded-sm pb-10 w-1/2 " >

  <h1 class="text-center mt-8 font-bold text-xl">SIgn In</h1>
  <!-- <div class="flex justify-between w-1/3 mx-auto text-gray-400 mt-4 md:w-1/5 md:mx-auto">
      <div><i class="fa-brands fa-facebook-f text-2xl"></i></div>
      <div><i class="fa-brands fa-twitter text-2xl"></i></div>
      <div><i class="fa-brands fa-linkedin-in text-2xl"></i></div>
  </div> -->
  <!-- <p class="text-gray-400 text-center mt-4">fill the form for registration</p> -->
  <div class="w-2/3 mx-auto mt-10">
          <div>
              <div class="flex">
                  <div>
  
                      <p>User Name or Email </p>
                  </div>
                
              </div>
              <div class="mt-2 ">
                  <input type="text" class="border-2 rounded-md focus:outline-none pl-3 border-blue-300 w-13/13 md:h-12"  v-model="email">
                 
              </div>
          </div>
       
          <div class="mt-9">
              <div class="flex">
                  <div>
  
                      <p>Password </p>
                  </div>
                 
              </div>
              <div class="mt-2 ">
                  <input type="text" class="border-2 rounded-md focus:outline-none pl-3 border-blue-300 w-13/13 md:h-12" v-model="password">
              </div>
          </div>
      
          <div class="mt-9 flex w-1/2  mx-auto">
             
              <div class="md:text-xl md:w-2/3 md:mx-auto w-12/11">
                <div class="flex">
                    <div class="mr-3">
                <input type="radio" class= " border border-cyan-400" >
              </div>
              <div class="w-12/11">

                  <p class="text-cyan-500 w-12/11">Remember me</p>
              </div>
                </div>
                <p class="text-cyan-500 mt-6  w-12/11">Forgot Password?</p>
              </div>
          </div>
          <div class="mx-auto w-1/2 mt-6 md:w-1/3 md:mx-auto">
              <button @click="() => { handleLogin(); handleLogin2(); }" class="bg-cyan-700 text-white px-8 py-2 rounded-sm " >Continue</button>
          </div>
          <div class="mt-5 w-12/13 mx-auto md:w-2/3 md:mx-auto">
              <p class="md:text-lg text-sm text-center w-10/11"> Don't have an account ? <span class="text-cyan-500 ">Login</span> </p>
              <p class="text-gray-400 text-sm mt-2 w-10/11 text-center">Or connect with social media</p>
          </div>
          <div class="w-4/5 mx-auto text-white bg-cyan mt-10">
            <div>
                <button style="background: linear-gradient(to bottom left, #57B4D3 0%,  48%, #57B4D3 98%);" class="p1-1 py-2 rounded-md w-11/11 text-sm"><i class="fa-brands fa-twitter -ml-6 mr-1"></i>  Sign in with Twitter</button>
            </div>
            <div class="mt-3">
             <button style="background: linear-gradient(to bottom left, #4584D7 0%,  48%, #6B94C9 98%);" class="pl-1 py-2 rounded-md w-11/11 text-sm"><i class="fa-brands fa-facebook-f -ml-4 mr-1"></i>  Sign in with Facebook </button>
            </div>
          </div>
         
      </div>
      </div>
      <!-- <div class="w-1 h-full bg-black transform  absolute left-171 rotate-6">

      </div> -->
   
</div>
  
    </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios'
  import { login, register } from '../../auth';
  export default {
  data(){
      return{
          base_url:'https://bizethio-backend-production.up.railway.app/api',
            email:"",
            password:"",
            currentUser:""
      }
  },
  mounted(){
//     const token = localStorage.getItem('token');
// if(token){
//       axios.defaults.withCredentials = true
//       axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
// }
  },
  methods:{
    async handleLogin2() {
      try {
        await login(this.email, this.password);
        alert('Logged in successfully!');
      } catch (error) {
        alert(error.message);
      }
    },
 async handleLogin(){
    try{
            const response = await axios.post(`${this.base_url}/login`,{
                email:this.email,
                password:this.password
            });
            
            const token = response.data.token; // Get the token
      const user = response.data.user;   // Get user information

      console.log('Token:', token);
      console.log('User:', user);
            console.log('token',response)
            localStorage.setItem('token',token)

            axios.defaults.headers.common['Authorization'] = `Bearer${token}`

            if(token){
                this.$router.push('/')
            }
           //this.getUser();
           // this.signin = true
           // localStorage.setItem('signin',this.signin)
           // console.log('signin',this.signin)
            // if (router) {
            //   router.push('/');
            //   console.log('redirect to home page')
            // }
            // // const router = useRouter()
            // // this.redirectToHome(router)
        }catch(res){
            console.log(res)
        }
 }
  },
  created(){
    // const token = localStorage.getItem('token')
   

    // if (token) {
    //   console.log('token', token)
    //   axios.defaults.withCredentials = true
    //   axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    // }
  }
  }
  </script>
  
  <style>
  
  </style>