<script setup>
import HeroImage from "/images/Hero_Image.png";
</script>

<template>
  <div class="min-h-screen">
    <div
      class="text-center text-2xl space-y-2 font-semibold px-2 xs:text-3xl max-w-[425px] mx-auto sm:max-w-[640px] sm:text-5xl md:mt-6 lg:max-w-[900px] lg:text-6xl lg:space-y-3 xl:max-w-[1120px] xl:text-7xl xl:mt-8 2xl:mt-10 2xl:text-8xl 2xl:space-y-5"
    >
      <h1 class="">Empower Your Business Discovery With</h1>
      <div
        class="relative border-2 border-primaryColor w-fit mx-auto p-2 lg:p-3"
      >
        <h1 class="text-primaryColor">Artificial Intelligence</h1>
        <div class="absolute top-0 left-0 bg-[#2178AC]/20 w-full h-full"></div>
        <div
          class="bg-white size-2 border-2 border-[#4F46E5] absolute top-[-5px] left-[-5px] xl:size-3 xl:border-3 2xl:border-4 2xl:size-4"
        ></div>
        <div
          class="bg-white size-2 border-2 border-[#4F46E5] absolute top-[-5px] right-[-5px] xl:size-3 xl:border-3 2xl:border-4 2xl:size-4"
        ></div>
        <div
          class="bg-white size-2 border-2 border-[#4F46E5] absolute bottom-[-5px] left-[-5px] xl:size-3 xl:border-3 2xl:border-4 2xl:size-4"
        ></div>
        <div
          class="bg-white size-2 border-2 border-[#4F46E5] absolute bottom-[-5px] right-[-5px] xl:size-3 xl:border-3 2xl:border-4 2xl:size-4"
        ></div>
      </div>
      <p
        class="text-sm mt-4 text-gray-700 mx-auto xs:max-w-[350px] sm:max-w-[450px] md:max-w-[550px] md:text-base xl:text-lg xl:max-w-[650px]"
      >
        Join AI-powered local directories that help you discover businesses,
        connect with owners, and other companies.
      </p>
    </div>

    <div class="w-fit bg-[#1B7590]/80 p-1.5 mt-6 rounded-4xl mx-auto">
      <div
        class="innerShadow innerShadow2 w-full bg-primaryColor py-2 px-4 text-white rounded-4xl xl:px-5 2xl:px-7 2xl:py-3"
      >
        Start Your Journey
      </div>
    </div>

    <div
      class="w-[90%] mx-auto h-fit aspect-video bg-no-repeat bg-left bg-cover lg:rounded-[35px] mt-1 max-w-[430px] sm:max-w-[660px] lg:max-w-[950px] xl:max-w-[1200px] xl:max-h-[550px]"
      :style="{ backgroundImage: `url(${HeroImage})` }"
    ></div>

    <p class="">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati, maxime
      voluptatem ex tempore aut harum. Esse iste magnam excepturi ducimus
      dolore! Alias soluta at eum obcaecati vitae consequatur molestiae? Nobis?
      Enim quidem ullam quo harum culpa corporis rerum, nostrum neque sint! Amet
      recusandae, delectus, eveniet laudantium qui est optio mollitia quia alias
      suscipit, repudiandae beatae quas? Voluptatem blanditiis accusamus
      temporibus! Culpa fuga facilis minima tempore qui laboriosam iure ipsa
      veritatis, sapiente temporibus omnis officia aperiam sequi debitis,
      placeat dicta facere nesciunt quasi doloribus quia fugiat nostrum quod ex.
      Vero, sapiente? Accusamus minus corporis nostrum natus animi ipsam nam
      deleniti saepe ea velit facilis magni cum autem voluptate in laborum
      magnam doloribus, impedit nesciunt! Perferendis consequatur sed tempore
      animi, placeat explicabo. Quam consequatur explicabo hic aspernatur
      voluptatibus, dolore praesentium ea est perspiciatis, repellendus magnam
      numquam totam maiores maxime non modi iusto porro aperiam impedit
      provident adipisci laboriosam laudantium reiciendis? Possimus, esse?
    </p>
  </div>
</template>
<style scoped>
.innerShadow {
  box-shadow: inset 0 4px 6px rgba(79, 70, 229, 0.25); /* Matches #4F46E5 with 50% opacity */
}
.innerShadow2 {
  box-shadow: inset 0 4px 5px rgba(0, 0, 0, 0.3); /* Matches #4F46E5 with 50% opacity */
}
</style>
