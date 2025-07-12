import { getCookie } from 'h3'
import {decrypt} from "../server/utils/session";
import type {Session} from "../types/session";

export default defineNuxtRouteMiddleware(async (to, _from)=>{
  const event = useRequestEvent()

  if(!event) return

  const cookie = getCookie(event,'session')
  const protectedRoutes = ['/events', '/']
  if(protectedRoutes.includes(to.fullPath)) {
    if (!cookie) {
      return navigateTo('/login')
    }

    const session = (await decrypt(cookie)) as Session

    if (!session?.user?.userId) {
      return navigateTo('/login')
    }


  }
})