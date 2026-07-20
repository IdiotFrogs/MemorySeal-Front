import { useState } from 'react'
import './index.css'

function App() {
  const ticketCode = '12D9W6'

  return (
    <div className="gradation bg-[linear-gradient(284deg,#FFFFE5_-6.94%,#43CB62_92.53%,#51D8B1_170.32%)] relative w-full min-h-screen h-[1080px] z-50 flex flex-col items-center">
      <div className="mt-[140px] flex flex-col items-center">
        <TitleTextComponent message="메실" />
        <div className="relative mt-[20px]">
          <DescriptionTextComponent message="디지털 타임 캡슐 메모리실" />
          <div className="topMemorySealImage absolute left-full top-1/2" />
          <div className="bottomMemorySealImage absolute top-full mt-[211px] right-[127px]" />
          <div className="ticketImage absolute left-1/2 -translate-x-1/2 top-full mt-[37px]">
            {/* 티켓 내용: 참여코드 + 복사 버튼 */}
            <div className="absolute left-1/2 top-0 mt-[191px] flex -translate-x-1/2 flex-col items-center gap-[12px]">
              <p
                className="text-[24px] font-bold text-[#000000]"
                style={{ fontFamily: 'Pretendard' }}
              >
                {ticketCode}
              </p>
              <p
                className="text-[14px] font-bold text-[#000000]"
                style={{ fontFamily: 'Pretendard' }}
              >
                티켓 참여코드
              </p>
              <CopyButtonComponent code={ticketCode} />
            </div>

            <div className="lineImage absolute left-0 top-full mt-[52px] w-[82px] h-[7px]" />
            <DescriptionTextComponent
              message="메실 설치하러가기"
              className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 top-full mt-[55.5px]"
            />
            <div className="lineImage absolute right-0 top-full mt-[52px] w-[82px] h-[7px]" />

            <div className="absolute left-1/2 top-full mt-[82px] -translate-x-1/2 flex flex-row gap-6">
              <QRCardComponent store="googleStoreImage" />
              <QRCardComponent store="appleStoreImage" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const TitleTextComponent = ({ message }: { message: string }) => {
  return (
    <p
      style={{
        color: '#1A1A1A',
        fontFamily: 'HSSanTokki',
        fontSize: '56px',
        fontWeight: 'normal',
      }}
    >
      {message}
    </p>
  )
}

const DescriptionTextComponent = ({
  message,
  className,
}: {
  message: string
  className?: string
}) => {
  return (
    <p
      className={className}
      style={{
        color: '#1A1A1A',
        fontFamily: 'Pretendard',
        fontSize: '16px',
        fontWeight: 'normal',
      }}
    >
      {message}
    </p>
  )
}

const QRCardComponent = ({ store }: { store: string }) => {
  return (
    <div className="flex min-h-[205px] w-[156px] flex-col items-center gap-[8px] rounded-[10px] bg-white px-[6.75px] pt-[12px] shadow-md">
      {/* QR 코드 자리 (앱 배포 후 qrcode.react 등으로 교체) */}
      <div className="flex h-[143px] w-[143px] shrink-0 items-center justify-center rounded-lg bg-gray-200 text-xs text-gray-400">
        QR 준비중
      </div>
      <div className={`${store} shrink-0`} />
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
      className="copyButtonImage flex w-fit items-center gap-[4px] pl-[8px] pr-[12px] py-[5px]"
    >
      <div className="copyIcon" />
      <span
        className="text-[12px] font-bold text-white"
        style={{ fontFamily: 'Pretendard' }}
      >
        {copied ? '복사됨' : '복사'}
      </span>
    </button>
  )
}

export default App
