
import { createClient } from '@supabase/supabase-js'
const URL = 'https://xncishludwcbcxqvwvim.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhuY2lzaGx1ZHdjYmN4cXZ3dmltIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTgxOTQ5MTEsImV4cCI6MjAxMzc3MDkxMX0.rtQ64FoeNyu9VR3-YR5vbpMA5Ckh0BoB-gSILp0NkdU';

export const supabase = createClient(URL, API_KEY);