<template>
  <div class="px-2 py-5">
    <div class="bg-white rounded-sm pb-10 lg:hidden">
<img src="/public/logo.png" alt="" class="mx-auto pt-5">
<h1 class="text-center mt-8 text-xl">Create an account</h1>
<div class="flex justify-between w-1/3 mx-auto text-gray-400 mt-4 md:w-1/5 md:mx-auto">
    <div><i class="fa-brands fa-facebook-f text-2xl"></i></div>
    <div><i class="fa-brands fa-twitter text-2xl"></i></div>
    <div><i class="fa-brands fa-linkedin-in text-2xl"></i></div>
</div>
<p class="text-gray-400 text-center mt-4">fill the form for registration</p>
<div class="w-2/3 mx-auto mt-10">
        <div>
            <div class="flex">
                <div>

                    <p>Name </p>
                </div>
                <div>
                    <p class="text-red-400 mt-1 ml-1">*</p>
                </div>
            </div>
            <div class="mt-2 ">
                <input type="text" class="border-2 rounded-md border-blue-300 w-13/13 md:h-12"  v-model="model.user.name">
               
            </div>
        </div>
       {{ name }}
        <div class="mt-9">
            <div class="flex">
                <div>

                    <p>Email </p>
                </div>
                <div>
                    <p class="text-red-400 mt-1 ml-1">*</p>
                </div>
            </div>
            <div class="mt-2 ">
                <input type="text" class="border-2 rounded-md border-blue-300 w-13/13 md:h-12" v-model="model.user.email">
            </div>
        </div>
        <div class="mt-9">
            <div class="flex">
                <div>

                    <p>Phone Number </p>
                </div>
                <div>
                    <p class="text-red-400 mt-1 ml-1">*</p>
                </div>
            </div>
            <div class="mt-2 ">
                <input type="text" class="border-2 rounded-md border-blue-300 w-13/13 md:h-12" v-model="model.user.phone_number">
            </div>
        </div>
        <div class="mt-9">
            <div class="flex">
                <div>

                    <p>City </p>
                </div>
                <div>
                    <p class="text-red-400 mt-1 ml-1">*</p>
                </div>
            </div>
            <div class="mt-2 ">
                <input type="text" class="border-2 rounded-md border-blue-300 w-13/13 md:h-12" v-model="model.user.city">
            </div>
        </div>
        <div class="mt-9">
            <div class="flex">
                <div>

                    <p>Subcity </p>
                </div>
                <div>
                    <p class="text-red-400 mt-1 ml-1">*</p>
                </div>
            </div>
            <div class="mt-2 ">
                <input type="text" class="border-2 rounded-md border-blue-300 w-13/13 md:h-12" v-model="model.user.sub_city">
            </div>
        </div>
        <div class="mt-9">
            <div class="flex">
                <div>

                    <p>Location </p>
                </div>
                <div>
                    <p class="text-red-400 mt-1 ml-1">*</p>
                </div>
            </div>
            <div class="mt-2 ">
                <input type="text" class="border-2 rounded-md border-blue-300 w-13/13 md:h-12" v-model="model.user.location">
            </div>
        </div>
        <div class="mx-auto w-1/2 mt-6 md:w-1/3 md:mx-auto">
            <button class="bg-cyan-700 text-white px-8 py-2 rounded-sm " @click="registerUser">Continue</button>
        </div>
        <div class="mt-5 w-12/13 mx-auto md:w-2/3 md:mx-auto">
            <p class="md:text-lg text-sm text-center"> Do you have an account ? <span class="text-cyan-500 ">Login</span> </p>
        </div>
    </div>
    </div>
  <div class="hidden lg:block w-2/3 mx-auto">
<div class="flex justify-between">
<div class="bg-[#BDE5F2] rounded-md px-10 pt-20 w-1/2 pb-20">
<div class="w-2/3 mx-auto">
    <img src="/public/logolarge.png" alt="">
</div>
<h1 class="mt-20 text-center font-bold w-3/4">Elevate Your Business Online</h1>
<p class="text-sm w-10/11 mx-auto mt-16">An online platform designed to showcase your 
products and services, connect with customers,
and enhance your brand's visibility. This website 
serves as a critical tool for engaging with your
audience, providing essential information, and 
facilitating transactions. It typically includes 
features such as an about page, product listings, 
a blog for content marketing, customer
testimonials, and contact information to fost
er communication and trust.</p>
<div style="background: linear-gradient(to bottom left, #8AE4FF 0%, #FFFFFF 48%, #00D2EA 98%);" class="rounded-xl shadow-md w-5/6 pb-5 mx-auto pt-7 pr-4 mt-30">
    <div class="flex justify-between">
        <div class="w-1/3">
            <img src="/public/logo.png" alt="">
        </div>
        <div class=""> 
            <p class="">Privacy Information</p>
        </div>
    </div>
    <div>
<p class="w-7/8 text-center mx-auto mt-4">At [Business Name], 
we prioritize your privacy and
are committed to protecting 
your personal information.</p>
    </div>
</div>
</div>
<div class="bg-white rounded-md w-2/3 mx-auto px-10 pb-20">
<h1 class="mt-10 w-1/2 mx-auto text-xl text-center">Create and account</h1>
<div class="flex justify-between w-1/4 mx-auto text-gray-400 mt-7">
    <div><i class="fa-brands fa-facebook-f text-2xl"></i></div>
    <div><i class="fa-brands fa-twitter text-2xl"></i></div>
    <div><i class="fa-brands fa-linkedin-in text-2xl"></i></div>
</div>
<p class="w-1/2 text-center mx-auto mt-6 text-gray-400">fill the form for registration</p>
<div>
    <div class="mt-4">
            <div class="flex">
                <div>

                    <p>Name </p>
                </div>
                <div>
                    <p class="text-red-400 mt-1 ml-1">*</p>
                </div>
            </div>
            <div class="mt-2 ">
                <input type="text" class="border-2 rounded-xl border-blue-300 w-13/13 md:h-12" v-model="model.user.name">
            </div>
        </div>
        <div class="mt-9">
            <div class="flex">
                <div>

                    <p>Email </p>
                </div>
                <div>
                    <p class="text-red-400 mt-1 ml-1">*</p>
                </div>
            </div>
            <div class="mt-2 ">
                <input type="text" class="border-2 rounded-xl border-blue-300 w-13/13 md:h-12" v-model="model.user.email">
            </div>
        </div>
        <div class="mt-9">
            <div class="flex">
                <div>

                    <p>Phone Number </p>
                </div>
                <div>
                    <p class="text-red-400 mt-1 ml-1">*</p>
                </div>
            </div>
            <div class="mt-2 ">
                <input type="text" class="border-2 rounded-xl border-blue-300 w-13/13 md:h-12" v-model="model.user.phone_number">
            </div>
        </div>
        <div class="mt-9">
            <div class="flex">
                <div>

                    <p>City </p>
                </div>
                <div>
                    <p class="text-red-400 mt-1 ml-1">*</p>
                </div>
            </div>
            <div class="mt-2 ">
                <input type="text" class="border-2 rounded-xl border-blue-300 w-13/13 md:h-12" v-model="model.user.city">
            </div>
        </div>
        <div class="mt-9">
            <div class="flex">
                <div>

                    <p>Subcity </p>
                </div>
                <div>
                    <p class="text-red-400 mt-1 ml-1">*</p>
                </div>
            </div>
            <div class="mt-2 ">
                <input type="text" class="border-2 rounded-xl border-blue-300 w-13/13 md:h-12" v-model="model.user.sub_city">
            </div>
        </div>
        <div class="mt-9">
            <div class="flex">
                <div>

                    <p>Location </p>
                </div>
                <div>
                    <p class="text-red-400 mt-1 ml-1">*</p>
                </div>
            </div>
            <div class="mt-2 ">
                <input type="text" class="border-2 rounded-xl border-blue-300 w-13/13 md:h-12" v-model="model.user.location">
            </div>
        </div>
        <div class="mx-auto w-1/2 mt-6 md:w-1/3 md:mx-auto">
            <button class="bg-cyan-700 text-white px-14 py-2 rounded-sm text-lg" @click="registerUser">Continue</button>
        </div>
        <div class="mt-5 w-12/13 mx-auto md:w-2/3 md:mx-auto">
            <p class="md:text-lg text-sm text-center"> Do you have an account ? <span class="text-cyan-500 ">Login</span> </p>
        </div>
</div>
</div>
<div>
   
</div>
</div>

  </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
data(){
    return{
        base_url:'https://bizethio-backend-production.up.railway.app/api',
        model:{
            user:{
                name:"",
                email:"",
                phone_number:"",
                city:"",
                sub_city:"",
                location:""
            }
        }
    }
},
mounted(){
// axios.get(`${this.base_url}/users`).then((res)=>{
//     console.log(res.data)
// })
},
methods:{
    registerUser(){
        localStorage.setItem('name',this.model.user.name)
      
        localStorage.setItem('email',this.model.user.email)
      
        localStorage.setItem('phone_number',this.model.user.phone_number)
       
        localStorage.setItem('city',this.model.user.city)
       
        localStorage.setItem('sub_city',this.model.user.sub_city)
        const parsedLocation = JSON.parse(this.model.user.location);
        this.model.user.location = JSON.stringify(parsedLocation)
        localStorage.setItem('location',this.model.user.location)
        

        this.$router.push('/next')

    },
//    registerUser(){
//         localStorage.setItem('name',this.name)
//         localStorage.setItem('email',this.email)
//         localStorage.setItem('phone_number',this.phone_number)
//         localStorage.setItem('city',this.city)
//         localStorage.setItem('sub_city',this.sub_city)
//         localStorage.setItem('location',this.location)
//     this.$router.push('/next')
//    }
}
}
</script>

<style>

</style>