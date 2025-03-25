<template>
    <div class="lg:px-40 mb-40 lg:w-9/10 lg:mx-auto lg:pt-24 lg:pb-40">
        <div class="bg-white h-4/5 lg:h-6/7 w-11/12 lg:w-8/9 mb-10 p-2 mt-4 ml-7 rounded-2xl ">
            <p class="font-semibold lg:font-bold lg:ml-4 mb-2">Change Password</p>
            <div class="bg-gradient-to-l from-[#1B7590] to-[#1B7B90] relative h-[350px] lg:w-8/9 mx-auto mb-4 rounded-2xl p-8">
                <div class="ml-28">
                    <div class="w-20 h-8 rounded-bl-4xl bg-white absolute top-0 right-0 rounded-tr-xl border-2 border-[#176678] text-[#1B7B90] text-xs font-semibold text-center pt-1">
                        <p>Approved</p>
                    </div>
                </div>
                <div class="md:w-">
                    <div class="w-screen md:w-4/5 md:px-4 md:mx-auto px-4 -ml-10 mb-3">
                        <label class="text-gray-100">Current Password</label>
                        <input 
                            type="password" 
                            v-model="currentPassword" 
                            class="w-5/6 pl-2 h-10 mt-2 outline-none rounded-lg bg-white">
                    </div>
                    <div class="w-screen px-4 -ml-10 mb-3 md:w-4/5 md:px-4 md:mx-auto">
                        <label class="text-gray-100">New Password</label>
                        <input 
                            type="password" 
                            v-model="newPassword" 
                            class="w-5/6 pl-2 h-10 mt-2 outline-none rounded-lg bg-white">
                    </div>
                    <div class="w-screen px-4 -ml-10 mb-3 md:w-4/5 md:px-4 md:mx-auto">
                        <label class="text-gray-100">Confirm Password</label>
                        <input 
                            type="password" 
                            v-model="confirmPassword" 
                            class="w-5/6 pl-2 h-10 mt-2 outline-none rounded-lg bg-white">
                    </div>
                </div>
                <div class="flex mx-auto md:h-10 mt-6 lg:mt-2 w-11/12 lg:w-64 md:w-64 md:-mt-1 md:mx-auto">
                    <div class="flex bg-[#075E86] cursor-pointer w-3/4 mx-auto pl-12 h-10 py-1 rounded-lg">
                        <button 
                             
                            class="text-[14px] text-center cursor-pointer  font-normal text-white">Reset Password</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    data() {
        return {
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
            userInformations: []
        };
    },
  
}
</script>