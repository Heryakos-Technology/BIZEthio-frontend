<template>
    <UserLayout>
        <div class="lg:px-40 mb-40 lg:w-9/10 lg:mx-auto lg:pt-24 lg:pb-40">
            <div class="bg-white h-4/5 lg:h-6/7 w-11/12 lg:w-8/9 mb-10 p-2 mt-4 ml-7 rounded-2xl ">
                <p class="font-semibold lg:font-bold lg:ml-4 mb-2">Change Password</p>
                <div class="bg-gradient-to-l from-[#1B7590] to-[#1B7B90] relative h-[350px] w lg:w-8/9 mx-auto mb-4 rounded-2xl p-8">
                    <div class="md:w-">
                        <div class="w-screen md:w-4/5 md:px-4 md:mx-auto px-4 -ml-10 mb-3">
                            <label for="currentPassword" class="text-gray-100">Current Password</label>
                            <div class="flex">
                                <input :type="showCurrentPassword ? 'text' : 'password'" v-model="currentPassword" class="pl-2 w-5/6 h-10 mt-2 outline-none rounded-lg bg-white" />
                                <i @click="toggleCurrentPassowrd" :class="showCurrentPassword ? 'fa-regular fa-eye-slash' : 'fa-regular fa-eye'" class="-ml-8 mt-5 cursor-pointer"></i>
                            </div>
                        </div>
                        <div class="w-screen px-4 -ml-10 mb-3 md:w-4/5 md:px-4 md:mx-auto">
                            <label for="newPassword" class="text-gray-100">New Password</label>
                            <div class="flex">
                                <input :type="showNewPassowrd ? 'text' : 'password'" v-model="newPassword" class="pl-2 w-5/6 h-10 mt-2 outline-none rounded-lg bg-white" />
                                <i @click="toggleNewPassowrd" :class="showNewPassowrd ? 'fa-regular fa-eye-slash' : 'fa-regular fa-eye'" class="-ml-8 mt-5 cursor-pointer"></i>
                            </div>
                        </div>
                        <div class="w-screen px-4 -ml-10 mb-3 md:w-4/5 md:px-4 md:mx-auto">
                            <label for="confirmPassword" class="text-gray-100">Confirm Password</label>
                            <div class="flex">
                                <input :type="showConfirmedPassword ? 'text' : 'password'" v-model="confirmPassword" class="pl-2 w-5/6 h-10 mt-2 outline-none rounded-lg bg-white" />
                                <i @click="toggleConfirmedPassowrd" :class="showConfirmedPassword ? 'fa-regular fa-eye-slash' : 'fa-regular fa-eye'" class="-ml-8 mt-5 cursor-pointer"></i>
                            </div>
                        </div>
                    </div>
                    <div class="flex mx-auto md:h-10 mt-6 lg:mt-2 w-11/12 lg:w-64 md:w-64 md:-mt-1 md:mx-auto">
                        <div class="flex bg-[#075E86] w-11/12 h-10 py- px-2 rounded-lg">
                            <button @click="changePassword" class="text-[14px] text-center px-13 font-normal text-white">Reset Password</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </UserLayout>
</template>

<script>
import UserLayout from '@/layout/UserLayout.vue'
import { getAuth, reauthenticateWithCredential, EmailAuthProvider, updatePassword } from 'firebase/auth'
import axios from 'axios';

export default {
    components: {
        UserLayout
    },
    data() {
        return {
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
            showCurrentPassword: false,
            showNewPassowrd: false,
            showConfirmedPassword: false,
            userInformations: {} // Assuming you have user information here
        }
    },
    methods: {
        toggleCurrentPassowrd() {
            this.showCurrentPassword = !this.showCurrentPassword;
        },
        toggleNewPassowrd() {
            this.showNewPassowrd = !this.showNewPassowrd;
        },
        toggleConfirmedPassowrd() {
            this.showConfirmedPassword = !this.showConfirmedPassword;
        },
        async changePassword() {
            const auth = getAuth();
            const user = auth.currentUser;

            if (this.newPassword !== this.confirmPassword) {
                alert("New password and confirmation do not match.");
                return;
            }

            try {
                // Re-authenticate user
                const credential = EmailAuthProvider.credential(user.email, this.currentPassword);
                await reauthenticateWithCredential(user, credential);

                // Update password
                await updatePassword(user, this.newPassword);
                alert("Password changed successfully!");

                // Update user information including the new password
                this.userInformations.password = this.newPassword; // Add the new password to user information
                await this.saveUserInfo(); // Call the existing method to save user info
            } catch (error) {
                console.error("Error changing password:", error);
                alert("Error changing password: " + error.message);
            }
        },
        async saveUserInfo() {
            try {
                const userId = localStorage.getItem('user_id');
                const response = await axios.put(`https://bizethio-backend-production.up.railway.app/api/users/${userId}`, this.userInformations, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                console.log('User Information updated:', response.data);
                alert('Profile updated successfully!');
            } catch (error) {
                console.error('Error updating user information:', error);
                alert('Failed to update profile.');
            }
        }
    }
}
</script>

<style></style>