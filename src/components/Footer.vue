<template>
  <footer class="w-full flex flex-col justify-center items-center space-y-2 text-center text-muted-foreground text-xs self-end p-4">
    <span>Have a new question in mind? Feel free to share it <a href="https://forms.gle/TR2KACsHtELi5FfXA" target="_blank" rel="noopener noreferrer">here</a></span>
    <span>Made by <a href="https://www.ptsionis.com/" target="_blank" rel="noopener noreferrer">Panagiotis Tsionis</a> &copy; {{ new Date().getFullYear() }}</span>
    <div class="flex justify-center items-center gap-x-2">
      <router-link :to="{ name: 'privacy-policy' }" target="_blank" rel="noopener noreferrer">
        Privacy Policy
      </router-link>
      <router-link :to="{ name: 'tos' }" target="_blank" rel="noopener noreferrer">
        Terms of Service
      </router-link>
    </div>
  </footer>
</template>
