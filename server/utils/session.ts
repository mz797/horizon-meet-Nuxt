import { SignJWT, jwtVerify } from "jose";
import {H3Event} from "h3";

const getSecretKey = () => {
  const secretKey = process.env.SESSION_SECRET;
  return new TextEncoder().encode(secretKey);
}

export const encrypt = async ( payload: {
  user: { userId: string; userRole: string; name: string };
  expiresAt: Date;
})=>{
  return new SignJWT(payload).setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getSecretKey());
}

export const decrypt = async (session: string | undefined = "") => {
  try {
    const {payload} = await jwtVerify(session, getSecretKey(), {
      algorithms: ['HS256']
    })

    return payload;
  } catch(err) {
    console.log('decrypt',err);
    console.log("Failed to verify session");
  }
}

export const createSession = async (
  event: H3Event,
  userId: string,
  userRole: string,
  name: string
) => {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const session = await encrypt({
    user: { userId, userRole, name },
    expiresAt,
  });

  setCookie(event, 'session', session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: 'lax',
    path: '/'
  })
}

export const deleteSession = (event: H3Event) => {
  deleteCookie(event, 'session')
}

