import './index.css'

function App() {
  return (
    <div className="gradation bg-[linear-gradient(284deg,#FFFFE5_-6.94%,#43CB62_92.53%,#51D8B1_170.32%)] absolute w-full top-0 h-full z-50 flex flex-col items-center">
      {/* 텍스트 묶음: 서로 가운데 정렬 (items-center), 전체는 왼쪽에 위치 */}
      <div className="mt-[140px] flex flex-col items-center">
        <p
          style={{
            color: '#1A1A1A',
            fontFamily: 'HSSanTokki',
            fontSize: '56px',
            fontWeight: 'normal',
          }}
        >
          메실
        </p>

        {/* 태그라인 + 오른쪽 이미지 (이미지는 absolute라 가운데정렬에 영향 없음) */}
        <div className="relative mt-[20px]">
          <p
            style={{
              color: '#1A1A1A',
              fontFamily: 'Pretendard',
              fontSize: '16px',
              fontWeight: 'normal',
            }}
          >
            디지털 타임 캡슐 메모리실
          </p>
          <div className="memorySealImage absolute left-full top-1/2 -translate-y-1/2" />
        </div>
      </div>
    </div>
  )
}

export default App
