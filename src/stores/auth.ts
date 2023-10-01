import { ref } from 'vue'
import { defineStore } from 'pinia'
import { supabase } from '../supabase'

import type {UserLogin, AuthUser, UserSignUp} from '../entities/Auth'
import {validateEmail} from '../utils/validateEmail.js'

const INITIAL_STATE = {
  id: '',
  name: '',
  email: ''
}

export const useAuthStore = defineStore('counter', () => {
  const user = ref<AuthUser>(INITIAL_STATE)
  const errorMessage = ref("")
  const isLoading = ref(false)

  const clearErrorMessage = () => {
    errorMessage.value = ''
  }

  const handleLogin = async (credentials: UserLogin) => {
    const {email, password } = credentials

    if(!validateEmail(email)) {
      return errorMessage.value = "Email is not valid"
    }

    if(password.length < 6) {
      return errorMessage.value = "Password length too short"
    }

    isLoading.value = true;

    const {error} = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if(error) {
      isLoading.value = false
      return errorMessage.value = error.message
    }

    const {data:existingUser} = await supabase.from('users').select().eq('email', email).single()

    user.value = {
      id: existingUser.id,
      email: existingUser.email,
      name: existingUser.name
    }

    isLoading.value = false
    errorMessage.value = ''
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

  const getUser = async () => {
    isLoading.value = true;

    const {data} =  await supabase.auth.getUser()

    if(!data.user) {
      isLoading.value = false
      return user.value = INITIAL_STATE;
    }

    const {data: userWithEmail} = await supabase.from('users').select().eq('email', data.user.email).single()

    user.value = {
      id: userWithEmail.id,
      name: userWithEmail.name,
      email: userWithEmail.email
    }

    isLoading.value = false
  };

  return { user, isLoading, handleLogin, handleSignUp, handleLogout, getUser, errorMessage, clearErrorMessage };
})
