<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const username = ref('')
const password = ref('')

const handleSubmit = async () => {
  try {
    // ในอนาคตจะเพิ่มการเชื่อมต่อกับ API ตรงนี้
    console.log('Logging in...', username.value, password.value)
    // ชั่วคราว: ไปยังหน้า board หลังจากกดปุ่ม login
    router.push('/board')
  } catch (error) {
    console.error('Login failed:', error)
  }
}
</script>

<template>
  <div class="login-container">
    <h2>เข้าสู่ระบบ</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="username">ชื่อผู้ใช้:</label>
        <input 
          type="text"
          id="username"
          v-model="username"
          required
          placeholder="กรุณากรอกชื่อผู้ใช้"
        >
      </div>

      <div class="form-group">
        <label for="password">รหัสผ่าน:</label>
        <input 
          type="password"
          id="password"
          v-model="password"
          required
          placeholder="กรุณากรอกรหัสผ่าน"
        >
      </div>

      <button type="submit">เข้าสู่ระบบ</button>
      <div class="register-link">
        ยังไม่มีบัญชี? 
        <router-link to="/register">ลงทะเบียน</router-link>
      </div>
    </form>
  </div>
</template>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 40px auto;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
}

input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

.register-link {
  margin-top: 15px;
  text-align: center;
}
</style>