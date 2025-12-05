<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/entities/user/model/userStore'

const email = ref('')
const router = useRouter()
const userStore = useUserStore()

const handleSubmit = () => {
  if (userStore.login(email.value)) {
    router.push('/')
  }
}
</script>

<template>
  <div class="login-page">
    <div class="card">
      <h2>Войти в JobTrack</h2>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <input v-model="email" type="email" placeholder="Email" required />
        </div>
        <button type="submit" class="btn">Продолжить</button>
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: white;
}

.card {
  width: 100%;
  max-width: 400px;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 16px;
  input {
    width: 100%;
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 16px;
  }
}

.btn {
  width: 100%;
  padding: 12px;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
}
</style>
