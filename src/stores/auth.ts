import { ref } from 'vue'
import { defineStore } from 'pinia'
import { supabase } from '../supabase'

import type {UserLogin, AuthUser, UserSignUp} from '../entities/Auth'
import {validateEmail} from '../utils/validateEmail.js'

export const useAuthStore = defineStore('counter', () => {
  const user = ref<AuthUser>({
    id: '',
    name: '',
    email: 'dsdsds'
  })
  const errorMessage = ref("")
  const isLoading = ref(false)

  const clearErrorMessage = () => {
    errorMessage.value = ''
  }

  const handleLogin = (credentials: UserLogin) => {
    const {email, password } = credentials

    if(!validateEmail(email)) {
      return errorMessage.value = "Email is not valid"
    }

    if(password.length < 6) {
      return errorMessage.value = "Password length too short"
    }

    const {data: userWithName} = await supabase.from('users').select().eq('name', name).single()

    if(userWithName) {
      isLoading.value = false
      return errorMessage.value = 'Name already exists'
    }
  };

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

    const {data:newUser} = await supabase.from('users').select().eq('email', email).single()

    user.value = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email
    }

    isLoading.value = false
  };
  const handleLogout = () => {};
  const getUser = () => {};

  return { user, isLoading, handleLogin, handleSignUp, handleLogout, getUser, errorMessage, clearErrorMessage };
})
