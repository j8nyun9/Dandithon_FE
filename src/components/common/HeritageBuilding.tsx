/** 근대 석조 은행 건물 일러스트 (국채보상운동 시기 대구 근대건축 분위기) */
const s = (v: string) => ({ stopColor: `var(--color-${v})` });

export function HeritageBuilding({ className = '' }: { className?: string }) {
  const W = 520;
  const upperWins = [70, 120, 170, 350, 400, 450];
  const lowerArches = [70, 120, 170, 350, 400, 450];
  const posts = [40, 100, 150, 200, 320, 370, 420, 480];

  return (
    <svg viewBox={`0 0 ${W} 380`} className={className} aria-hidden="true">
      <defs>
        <linearGradient id="hb-stone" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" style={s('paper')} />
          <stop offset="1" style={s('paper-deep')} />
        </linearGradient>
        <linearGradient id="hb-side" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.18" />
        </linearGradient>
        <linearGradient id="hb-glass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" style={s('primary-soft')} />
          <stop offset="1" style={s('primary-deep')} />
        </linearGradient>
      </defs>

      {/* 본체 */}
      <rect x="30" y="130" width="460" height="240" fill="url(#hb-stone)" />

      {/* 1층 러스티케이션 */}
      <g className="stroke-gray-400" strokeWidth="0.7" opacity="0.6">
        {[262, 278, 294, 310, 326, 342, 358].map(y => (
          <line key={y} x1="30" x2="490" y1={y} y2={y} />
        ))}
      </g>
      {/* 층 구분 띠 */}
      <rect x="24" y="238" width="472" height="12" className="fill-paper-deep" />
      <rect x="24" y="248" width="472" height="3" className="fill-gray-400" opacity="0.5" />

      {/* 2층 기둥 */}
      <g className="fill-paper">
        {[45, 95, 145, 195, 325, 375, 425, 475].map(x => (
          <rect key={x} x={x - 5} y="140" width="10" height="98" />
        ))}
      </g>
      <g className="stroke-gray-400" strokeWidth="0.6" opacity="0.5">
        {[45, 95, 145, 195, 325, 375, 425, 475].map(x => (
          <line key={x} x1={x + 5} x2={x + 5} y1="140" y2="238" />
        ))}
      </g>

      {/* 2층 창 + 창머리 */}
      {upperWins.map(x => (
        <g key={x}>
          <path d={`M${x - 16} 166 L${x} 154 L${x + 16} 166 Z`} className="fill-paper-deep" />
          <rect x={x - 12} y="170" width="24" height="54" fill="url(#hb-glass)" />
          <line x1={x} x2={x} y1="170" y2="224" className="stroke-paper" strokeWidth="1.5" />
          <line x1={x - 12} x2={x + 12} y1="192" y2="192" className="stroke-paper" strokeWidth="1.5" />
          <rect x={x - 15} y="224" width="30" height="5" className="fill-paper-deep" />
        </g>
      ))}

      {/* 1층 아치 창 */}
      {lowerArches.map(x => (
        <g key={x}>
          <path d={`M${x - 15} 350 v-62 a15 15 0 0 1 30 0 v62 z`} fill="url(#hb-glass)" />
          <path d={`M${x - 19} 288 a19 19 0 0 1 38 0`} className="fill-none stroke-paper-deep" strokeWidth="5" />
          <rect x={x - 3} y="265" width="6" height="8" className="fill-paper-deep" />
        </g>
      ))}

      {/* 코니스 + 덴틸 */}
      <rect x="20" y="118" width="480" height="14" className="fill-paper-deep" />
      <rect x="16" y="112" width="488" height="7" className="fill-paper" />
      <g className="fill-gray-400" opacity="0.55">
        {Array.from({ length: 48 }, (_, i) => (
          <rect key={i} x={24 + i * 10} y="132" width="5" height="5" />
        ))}
      </g>

      {/* 난간 */}
      <rect x="22" y="88" width="476" height="5" className="fill-paper" />
      <g className="fill-paper-deep">
        {Array.from({ length: 46 }, (_, i) => (
          <rect key={i} x={28 + i * 10.2} y="93" width="4" height="19" rx="2" />
        ))}
      </g>
      {posts.map(x => (
        <g key={x}>
          <rect x={x - 6} y="84" width="12" height="28" className="fill-paper" />
          <rect x={x - 3} y="72" width="6" height="12" className="fill-paper-deep" />
          <circle cx={x} cy="66" r="7" className="fill-paper" />
          <circle cx={x} cy="58" r="2.5" className="fill-paper-deep" />
        </g>
      ))}

      {/* 중앙 돌출부 */}
      <rect x="208" y="96" width="104" height="274" fill="url(#hb-stone)" />
      <rect x="208" y="96" width="104" height="274" fill="url(#hb-side)" opacity="0.4" />
      <path d="M198 100 L260 46 L322 100 Z" className="fill-paper" />
      <path d="M212 96 L260 56 L308 96 Z" className="fill-paper-deep" />
      <circle cx="260" cy="80" r="10" className="fill-paper stroke-gray-400" strokeWidth="1" />
      <circle cx="260" cy="32" r="9" className="fill-paper" />
      <rect x="256" y="38" width="8" height="10" className="fill-paper-deep" />
      {[214, 306].map(x => (
        <rect key={x} x={x - 6} y="104" width="12" height="266" className="fill-paper" />
      ))}
      {/* 중앙 창 */}
      <path d="M244 230 v-56 a16 16 0 0 1 32 0 v56 z" fill="url(#hb-glass)" />
      <rect x="236" y="230" width="48" height="6" className="fill-paper-deep" />
      {/* 정문 */}
      <path d="M238 370 v-72 a22 22 0 0 1 44 0 v72 z" className="fill-primary-deep" />
      <path d="M232 298 a28 28 0 0 1 56 0" className="fill-none stroke-paper-deep" strokeWidth="6" />
      <rect x="226" y="362" width="68" height="8" className="fill-gray-400" />

      {/* 오른쪽 그림자 */}
      <rect x="400" y="84" width="104" height="286" fill="url(#hb-side)" />

      {/* 기단 */}
      <rect x="10" y="366" width="500" height="14" className="fill-gray-500" />
    </svg>
  );
}
