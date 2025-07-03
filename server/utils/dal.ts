import {H3Event} from "h3";
import {decrypt} from "./session";

export const verifySession = async (event: H3Event): Promise<{
  isAuth: boolean,
  userId: string,
  userName: string,
}> => {
  const cookie = getCookie(event, 'session');
    const session = await decrypt(cookie);

  if(!session?.user?.userId){
    return sendRedirect(event, '/login');
  };

  return {
    isAuth: true,
    userId: session.user.userId,
    userName: session.user.name,
  }
}

export const isAuth = async (event: H3Event)=>{
  const cookie = getCookie(event, 'session');

  if(!cookie){
    return false
  }

  const session = await decrypt(cookie);

  if(!session?.user?.userId){
    return false
  }
  return true
}