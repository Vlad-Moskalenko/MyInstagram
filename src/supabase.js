import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://vhuwoggcvtrqkjktqzyj.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZodXdvZ2djdnRycWtqa3RxenlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTYwNzA4OTYsImV4cCI6MjAxMTY0Njg5Nn0.CC1hsatI7l1cIgvrQvN68TFql7xa1R2L2z5hsLle3Ss'

export const supabase = createClient(supabaseUrl, supabaseKey)