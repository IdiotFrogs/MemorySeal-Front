import { useEffect, useState, type CSSProperties } from 'react'
import './index.css'
import { openAppOrStore, getLinkParams, getMobileOS } from './utils/deeplink'
import qrImage from './images/qr.png'
import googlePlayBadge from './images/google-play.png'
import appStoreBadge from './images/app-store.png'
import leafBottomLeft from './images/leaf-a.svg'
import leafTopRight from './images/leaf-c.svg'
import sparkleBigInner from './images/sparkle-a1.svg'
import sparkleBigOuter from './images/sparkle-a2.svg'
import sparkleSmallInner from './images/sparkle-b1.svg'
import sparkleSmallOuter from './images/sparkle-b2.svg'
import sparkleLeftInner from './images/sparkle-c1.svg'
import sparkleLeftOuter from './images/sparkle-c2.svg'

/** 티켓 박스(325x398) 안에서 회색 영역 기준으로 잰 좌표 */
const TICKET_WIDTH = 325
const TICKET_HEIGHT = 398
const CODE_BLOCK_TOP = 204.6
const COPY_BUTTON_TOP = 279

function App() {
  // URL 파라미터: code(UI 표시), action/capsuleId(앱에 전달)
  const linkParams = getLinkParams()
  const ticketCode = linkParams.code ?? '12D9W6'

  const goToApp = () =>
    openAppOrStore({
      action: linkParams.action,
      capsuleId: linkParams.capsuleId,
    })

  // 페이지 진입 시 자동 리다이렉트: 모바일이면 앱 열기 시도 → 미설치면 스토어
  // (데스크탑은 랜딩 화면/QR 카드를 그대로 보여줌)
  useEffect(() => {
    if (getMobileOS() !== 'other') {
      goToApp()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    // 잎/반짝임 장식이 티켓 밖으로 튀어나가므로, 좁은 화면에서 가로 스크롤이
    // 생겨 내용이 밀리지 않도록 잘라냅니다.
    <div className="pageGradient flex min-h-screen w-full flex-col items-center overflow-x-clip pt-[143px] pb-[126px]">
      <header className="flex w-[164px] flex-col items-center gap-[24px] text-center">
        {/* Figma는 텍스트 박스를 cap-height 기준으로 잘라내므로(text-box-trim),
            박스 높이(39px)와 글자 위치(line-height)를 분리해 같은 위치를 만듭니다. */}
        <h1
          className="h-[39px] text-[56px] leading-[32.2px] text-[#1A1A1A]"
          style={{ fontFamily: 'HSSanTokki' }}
        >
          메실
        </h1>
        <p className="text-[16px] leading-[1.6] font-bold text-black">
          디지털 타임 캡슐 메모리실
        </p>
      </header>

      {/* 티켓 + 주변 장식. 장식 좌표는 모두 티켓 좌상단 기준 */}
      <div
        className="relative mt-[36px]"
        style={{ width: TICKET_WIDTH, height: TICKET_HEIGHT }}
      >
        {/* 잎사귀는 티켓 뒤에 깔림 */}
        <Leaf src={leafBottomLeft} left={-63} top={268} />
        <Leaf src={leafTopRight} left={303} top={18} flipped />

        <div className="ticketImage absolute inset-0" />

        <div
          className="absolute left-1/2 flex w-[98px] -translate-x-1/2 flex-col items-center text-center text-black"
          style={{ top: CODE_BLOCK_TOP }}
        >
          <p className="text-[24px] leading-[1.6] font-bold">{ticketCode}</p>
          <p className="text-[14px] leading-[1.6] font-bold">티켓 참여코드</p>
        </div>

        <CopyButtonComponent code={ticketCode} />

        {/* 반짝임은 티켓 위에 올라옴 */}
        <Sparkle
          layers={[
            { src: sparkleBigInner, inset: [-1.08, -1.08, -4.51, -4.51] },
            { src: sparkleBigOuter, inset: [-14.61, -14.6, -18.03, -18.03] },
          ]}
          left={353}
          top={-21}
          box={37.46}
          inner={32.808}
          rotate={-8.84}
        />
        <Sparkle
          layers={[
            { src: sparkleSmallInner, inset: [-1.73, -1.72, -5.73, -5.73] },
            { src: sparkleSmallOuter, inset: [-23.29, -23.29, -27.3, -27.3] },
          ]}
          left={322}
          top={-43}
          box={24.46}
          inner={20.575}
          rotate={12.21}
        />
        <Sparkle
          layers={[
            { src: sparkleLeftInner, inset: [-1.08, -1.08, -4.51, -4.51] },
            { src: sparkleLeftOuter, inset: [-14.61, -14.61, -18.03, -18.03] },
          ]}
          left={-65}
          top={396}
          box={44.721}
          inner={32.808}
          rotate={29.55}
        />
      </div>

      <div className="mt-[35px] flex w-[325px] items-center gap-[20px] px-[4px]">
        <span className="lineImage h-[7px] flex-1" />
        <button
          type="button"
          onClick={goToApp}
          className="shrink-0 cursor-pointer text-[16px] leading-[1.6] font-bold whitespace-nowrap text-[#1A1A1A]"
        >
          메실 설치하러가기
        </button>
        <span className="lineImage h-[7px] flex-1" />
      </div>

      <div className="mt-[22px] flex w-[325px] items-center gap-[12px]">
        <QRCardComponent
          badge={googlePlayBadge}
          badgeAlt="Google Play에서 다운로드"
          badgeWidth={99}
          badgeHeight={22}
        />
        <QRCardComponent
          badge={appStoreBadge}
          badgeAlt="App Store에서 다운로드"
          badgeWidth={53}
          badgeHeight={30}
        />
      </div>
    </div>
  )
}

/**
 * Figma에서 회전된 레이어는 "회전 박스" 안에 이미지가 바깥으로 삐져나온 형태로
 * 내보내집니다. inset은 Figma가 준 [top, right, bottom, left] 퍼센트(음수)를 그대로 씁니다.
 */
type FigmaInset = [top: number, right: number, bottom: number, left: number]

const layerStyle = ([top, right, bottom, left]: FigmaInset): CSSProperties => ({
  position: 'absolute',
  left: `${left}%`,
  top: `${top}%`,
  width: `${100 - left - right}%`,
  height: `${100 - top - bottom}%`,
  maxWidth: 'none',
})

/** 티켓 좌우에 깔리는 잎사귀 장식 (좌표는 티켓 좌상단 기준) */
const Leaf = ({
  src,
  left,
  top,
  flipped = false,
}: {
  src: string
  left: number
  top: number
  flipped?: boolean
}) => (
  <div
    className="absolute flex items-center justify-center"
    style={{ left, top, width: 107.298, height: 114.474 }}
    aria-hidden
  >
    <div
      className="relative shrink-0"
      style={{
        width: 74.26,
        height: 90.65,
        transform: `rotate(${flipped ? 26.96 : -26.96}deg)${flipped ? ' scaleX(-1)' : ''}`,
      }}
    >
      <img
        src={src}
        alt=""
        style={layerStyle([-59.46, -95.14, -77.94, -91.02])}
      />
    </div>
  </div>
)

/** 반짝임 장식: 같은 자리에 안/바깥 두 레이어를 겹쳐 동일 각도로 회전 */
const Sparkle = ({
  layers,
  left,
  top,
  box,
  inner,
  rotate,
}: {
  layers: { src: string; inset: FigmaInset }[]
  left: number
  top: number
  box: number
  inner: number
  rotate: number
}) => (
  <div
    className="absolute flex items-center justify-center"
    style={{ left, top, width: box, height: box }}
    aria-hidden
  >
    <div
      className="relative shrink-0"
      style={{ width: inner, height: inner, transform: `rotate(${rotate}deg)` }}
    >
      {layers.map((layer) => (
        <img
          key={layer.src}
          src={layer.src}
          alt=""
          style={layerStyle(layer.inset)}
        />
      ))}
    </div>
  </div>
)

const QRCardComponent = ({
  badge,
  badgeAlt,
  badgeWidth,
  badgeHeight,
}: {
  badge: string
  badgeAlt: string
  badgeWidth: number
  badgeHeight: number
}) => {
  return (
    <div className="flex flex-1 flex-col items-center gap-[8px] rounded-[10px] bg-white py-[12px]">
      <img
        src={qrImage}
        alt="메실 앱 설치 QR 코드"
        width={143}
        height={143}
        className="size-[143px]"
      />
      <div className="flex h-[30px] items-center justify-center">
        <img
          src={badge}
          alt={badgeAlt}
          width={badgeWidth}
          height={badgeHeight}
          style={{ width: badgeWidth, height: badgeHeight }}
        />
      </div>
    </div>
  )
}

const CopyButtonComponent = ({ code }: { code: string }) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      style={{ top: COPY_BUTTON_TOP }}
      className="copyButtonImage absolute left-1/2 flex h-[32px] w-[66px] -translate-x-1/2 cursor-pointer items-center justify-center gap-[4px] pr-[4px]"
    >
      <span className="copyIcon shrink-0" />
      <span className="text-[12px] leading-[1.6] font-bold text-white">
        {copied ? '복사됨' : '복사'}
      </span>
    </button>
  )
}

export default App
