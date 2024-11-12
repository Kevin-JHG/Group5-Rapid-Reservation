import { supabase } from './supabase'

export const getSessionUserId = async () => {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession()

  if (error || !session) throw new Error("Couldn't get session.")

  return session.user.id
}
