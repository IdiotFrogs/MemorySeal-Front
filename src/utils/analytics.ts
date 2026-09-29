import { initializeApp, type FirebaseOptions } from 'firebase/app'
import { getAnalytics, isSupported, logEvent, type Analytics } from 'firebase/analytics'

const firebaseConfig: FirebaseOptions = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
}

// 환경변수가 없거나(로컬 등) Analytics 미지원 브라우저면 null로 두고 로깅을 건너뜀
const analyticsReady: Promise<Analytics | null> = (async () => {
  if (!firebaseConfig.apiKey || !firebaseConfig.appId) return null
  if (!(await isSupported().catch(() => false))) return null
  return getAnalytics(initializeApp(firebaseConfig))
})()

let visitLogged = false

// 공유 웹 페이지 방문 이벤트 (페이지 진입 시 1회)
export async function logVisitSharedWeb() {
  if (visitLogged) return
  visitLogged = true

  const analytics = await analyticsReady
  if (!analytics) return
  logEvent(analytics, 'visit_shared_web')
}
