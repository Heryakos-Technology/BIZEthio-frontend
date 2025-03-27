<template>
    <div class="mt-5">
        <input 
            type="file" 
            class="hidden" 
            @change="handleFileUpload" 
            accept="image/*" 
            id="fileInput"
        >
        <label 
            for="fileInput" 
            class="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer"
            style="display: inline-block;"
        >
            Browse
        </label>
        <p class="text-gray-500 mt-2">or drag a file here</p>

        <div 
            class="border-dashed border-2 border-gray-300 h-32 mt-4 flex items-center justify-center cursor-pointer"
            @dragover.prevent="handleDragOver" 
            @drop="handleFileDrop" 
            @click="triggerFileInput" 
        >
            <p class="text-gray-400">Drop your files here</p>
        </div>

        <div v-if="userPhoto" class="mt-4">
            <img :src="userPhoto" alt="Uploaded Image" class="max-w-full h-auto rounded-md" />
        </div>

        <p v-if="uploaded">{{ uploaded }}</p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            file: null, // To store the uploaded file
            uploaded: '', // Status message
            userPhoto: null, // To store the uploaded image URL
            uploadPreset: 'your_upload_preset', // Replace with your actual upload preset
            cloudName: 'your_cloud_name' // Replace with your Cloudinary cloud name
        };
    },
    methods: {
        handleFileUpload(event) {
            this.file = event.target.files[0]; // Get the selected file
            if (this.file) {
                this.uploadFile(); // Automatically upload the file after selection
            }
        },
        async uploadFile() {
            this.uploaded = 'Uploading...'; // Set upload status
            if (!this.file) return;

            const timestamp = Math.floor(Date.now() / 1000);
            const params = {
                timestamp,
                upload_preset: this.uploadPreset,
            };

            const { signature } = this.generateSignature(params); // Ensure this method is defined

            const formData = new FormData();
            formData.append('file', this.file);
            formData.append('upload_preset', this.uploadPreset);
            formData.append('timestamp', timestamp);
            formData.append('signature', signature);
            formData.append('api_key', '734174595538154');

            try {
                const response = await axios.post(`https://api.cloudinary.com/v1_1/${this.cloudName}/upload`, formData);
                this.uploaded = 'Photo Uploaded Successfully'; // Update upload status
                this.userPhoto = response.data.secure_url; // Store image URL for display
                console.log('Upload response:', this.userPhoto);
                // Update model if necessary
            } catch (error) {
                this.uploaded = 'Failed to upload photo'; // Handle upload error
                console.error('Error uploading file:', error.response.data);
            }
        },
        handleFileDrop(event) {
            event.preventDefault(); // Prevent default behavior
            const files = event.dataTransfer.files; // Get dropped files
            if (files.length) {
                this.file = files[0]; // Use the first file
                this.uploadFile(); // Automatically upload the file after drop
            }
        },
        handleDragOver(event) {
            event.preventDefault(); // Prevent default behavior to allow dropping
        },
        triggerFileInput() {
            document.getElementById('fileInput').click(); // Trigger file input on click
        },
        generateSignature(params) {
            // Your signature generation logic here
            return { signature: 'your_generated_signature' }; // Placeholder
        },
        validate() {
            // Your validation logic here
        }
    }
};
</script>

<style>
/* Add any necessary styles here */
</style>