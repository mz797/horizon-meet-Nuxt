import { getCookie } from 'h3'
import {decrypt} from "../server/utils/session";

export default defineNuxtRouteMiddleware(async (to, from)=>{
  const event = useRequestEvent()

  if(!event) return

  const cookie = getCookie(event,'session')
  const protectedRoutes = ['/events', '/']
  if(protectedRoutes.includes(to.fullPath)) {
    if (!cookie) {
      console.log(1)
      return navigateTo('/login')
    }

    const session = await decrypt(cookie);

    if (!session?.user?.userId) {
      console.log(2)
      return navigateTo('/login')
    }


  }
})