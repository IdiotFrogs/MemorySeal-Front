// 앱 딥링크 / 스토어 폴백 유틸
// - App Link(안드로이드) / Universal Link(iOS)는 OS가 자동 처리(앱 설치 시 앱이 열림)
// - 이 유틸은 "앱이 안 열렸을 때(미설치 등) 스토어로 안내"하는 폴백 역할

export type MobileOS = 'ios' | 'android' | 'other'

export function getMobileOS(): MobileOS {
  const ua = navigator.userAgent || ''
  if (/android/i.test(ua)) return 'android'
  // iPadOS 13+ 는 Mac 으로 보고되므로 터치 여부까지 확인
  const isIOS =
    /iphone|ipad|ipod/i.test(ua) ||
    (ua.includes('Mac') && 'ontouchend' in document)
  if (isIOS) return 'ios'
  return 'other'
}

// 스토어 URL
// 안드로이드: 패키지명으로 바로 생성 가능
const ANDROID_STORE_URL =
  'https://play.google.com/store/apps/details?id=com.idiotfrogs.memoryseal'
// iOS: 앱스토어 등록 후 실제 앱 ID(idXXXXXXXXXX)로 교체하세요
const IOS_STORE_URL = 'https://apps.apple.com/app/idXXXXXXXXXX'
// 데스크탑 등 기타 환경에서 기본으로 보낼 스토어(원하면 변경)
const DEFAULT_STORE_URL = ANDROID_STORE_URL

// 앱 커스텀 스킴 (앱이 지원하는 스킴으로 교체, 예: 'memoryseal://')
const APP_SCHEME = 'memoryseal://'

/** 플랫폼에 맞는 스토어로 이동 */
export function goToStore() {
  const os = getMobileOS()
  if (os === 'android') window.location.href = ANDROID_STORE_URL
  else if (os === 'ios') window.location.href = IOS_STORE_URL
  else window.location.href = DEFAULT_STORE_URL
}

/**
 * 앱 열기를 시도하고, 일정 시간 안에 안 열리면(=미설치) 스토어로 안내.
 * @param path 앱 내부 경로 (예: 'ticket/12D9W6')
 */
export function openAppOrStore(path = '') {
  const os = getMobileOS()
  if (os === 'other') {
    goToStore()
    return
  }

  const start = Date.now()
  // 앱 스킴으로 열기 시도 (설치돼 있으면 앱이 뜸)
  window.location.href = `${APP_SCHEME}${path}`

  // 앱이 떴으면 페이지가 백그라운드로 가서 타이머가 지연/중단됨.
  // 여전히 화면이 보이면(=앱 안 열림) 스토어로 보냄.
  setTimeout(() => {
    if (Date.now() - start < 2000 && !document.hidden) {
      goToStore()
    }
  }, 1200)
}
