import { ref } from 'vue'
import { defineStore } from 'pinia'
import { supabase } from '../supabase.js'

import type {UserLogin, UserSignUp} from '../entities/Auth'
import {validateEmail} from '../utils/validateEmail.js'

export const useAuthStore = defineStore('counter', () => {
  const user = ref(null)
  const errorMessage = ref("")
  const isLoading = ref(false)

  const clearErrorMessage = () => {
    errorMessage.value = ''
  }

  const handleLogin = (credentials: UserLogin) => {};
  const handleSignUp = async (credentials: UserSignUp) => {
    const {email, password, name} = credentials

    if(password.length < 6) {
      return errorMessage.value = "Password length too short"
    }

    if(name.length < 3) {
      return errorMessage.value = "Username length too short"
    }

    if(!validateEmail(email)) {
      return errorMessage.value = "Email is not valid"
    }

    errorMessage.value = '';

    isLoading.value = true;

    const {data: userWithName} = await supabase.from('users').select().eq('name', name).single()

    if(userWithName) {
      isLoading.value = false
      return errorMessage.value = 'Name already exists'
    }

    const {error} = await supabase.auth.signUp({
      email,
      password
    })

    if(error) {
      isLoading.value = false
      return errorMessage.value = error.message
    }

    await supabase.from('users').insert({
      name,
      email
    })

    isLoading.value = false
  };
  const handleLogout = () => {};
  const getUser = () => {};

  return { user, isLoading, handleLogin, handleSignUp, handleLogout, getUser, errorMessage, clearErrorMessage, isLoading };
})