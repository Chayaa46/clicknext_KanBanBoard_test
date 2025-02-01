<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const username = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')

const handleSubmit = async () => {
  if (password.value !== confirmPassword.value) {
    alert('รหัสผ่านไม่ตรงกัน')
    return
  }

  try {
    // ในอนาคตจะเพิ่มการเชื่อมต่อกับ API ตรงนี้
    console.log('Registering...', {
      username: username.value,
      email: email.value,
      password: password.value
    })
    router.push('/login')
  } catch (error) {
    console.error('Registration failed:', error)
  }
}
</script>

<template>
  <div class="register-container">
    <h2>ลงทะเบียน</h2>
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
        <label for="email">อีเมล:</label>
        <input 
          type="email"
          id="email"
          v-model="email"
          required
          placeholder="กรุณากรอกอีเมล"
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

      <div class="form-group">
        <label for="confirmPassword">ยืนยันรหัสผ่าน:</label>
        <input 
          type="password"
          id="confirmPassword"
          v-model="confirmPassword"
          required
          placeholder="กรุณายืนยันรหัสผ่าน"
        >
      </div>

      <button type="submit">ลงทะเบียน</button>
      <div class="login-link">
        มีบัญชีแล้ว? 
        <router-link to="/login">เข้าสู่ระบบ</router-link>
      </div>
    </form>
  </div>
</template>

<style scoped>
.register-container {
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

.login-link {
  margin-top: 15px;
  text-align: center;
}
</style>