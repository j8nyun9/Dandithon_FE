import { Eye, MousePointerClick, UserCheck, CheckCircle2, AlertTriangle, Megaphone, Lock } from 'lucide-react';
import partners from '../../mocks/partners.json';
import type { ContributionType } from '../../types';
import { PageHeader, container } from '../../components/common/PageHeader';
import { DemoBadge, TypeChips } from '../../components/common/Badges';
import { typeLabel } from '../../utils/contribution';

type Row = (typeof partners.funnel)[number] & { types: ContributionType[] };
const pct = (a: number, b: number) => (b ? Math.round((a / b) * 100) : 0);

/** 진입장벽: 지원 클릭 대비 실제 참여 25% 미만 / 홍보 부족: 조회는 적지만 전환은 높음 */
const flag = (r: Row) => {
  if (pct(r.joined, r.clicks) < 25) return { label: '진입장벽 높음', icon: AlertTriangle, cls: 'bg-red-50 text-red-700' };
  if (r.views < 500 && pct(r.joined, r.clicks) >= 40)
    return { label: '홍보 부족 의심', icon: Megaphone, cls: 'bg-blue-50 text-blue-700' };
  return null;
};

const steps = [
  { key: 'views', label: '활동 조회', icon: Eye },
  { key: 'clicks', label: '지원 클릭', icon: MousePointerClick },
  { key: 'joined', label: '실제 참여', icon: UserCheck },
  { key: 'completed', label: '활동 완료', icon: CheckCircle2 },
] as const;

export function PartnersPage() {
  const rows = partners.funnel as Row[];
  const total = Object.fromEntries(steps.map(s => [s.key, rows.reduce((n, r) => n + r[s.key], 0)])) as Record<
    (typeof steps)[number]['key'],
    number
  >;

  return (
    <>
      <PageHeader
        eyebrow="FOR PARTNERS"
        title="기관·기업 파트너"
        desc="캠페인을 운영하고, 검증된 성과와 대학생 참여 인사이트를 받아 보세요. 모든 데이터는 익명·집계로만 제공합니다."
        right={<DemoBadge />}
      />

      <div className={`${container} flex flex-col gap-16 py-16`}>
        {/* 1. 검증된 성과 리포트 */}
        <section>
          <p className="text-xs font-semibold tracking-[0.3em] text-accent">VERIFIED REPORT</p>
          <h2 className="mt-1 font-serif text-3xl font-bold text-primary">검증된 성과 리포트</h2>
          <p className="mt-2 text-sm text-gray-500">1365·VMS 연동, 운영자 확인, 공식 실적 확인을 거친 활동만 집계합니다.</p>
          <dl className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {partners.kpis.map(k => (
              <div key={k.label} className="rounded-xl border border-gray-200 bg-white p-6">
                <dt className="text-xs text-gray-500">{k.label}</dt>
                <dd className="mt-2 font-serif text-3xl font-black text-primary">{k.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* 2. 참여 퍼널 */}
        <section>
          <p className="text-xs font-semibold tracking-[0.3em] text-accent">PARTICIPATION INSIGHT</p>
          <h2 className="mt-1 font-serif text-3xl font-bold text-primary">대학생은 어디서 멈추는가</h2>
          <p className="mt-2 text-sm text-gray-500">
            조회 → 지원 클릭 → 실제 참여 → 완료. 어떤 활동에 관심이 많고, 어디서 진입장벽을 느끼는지 보여줍니다.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-4">
            {steps.map(({ key, label, icon: Icon }, i) => (
              <div key={key} className={`rounded-xl p-6 ${i === 0 ? 'navy-texture text-paper' : 'border border-gray-200 bg-white'}`}>
                <Icon size={20} className={i === 0 ? 'text-accent' : 'text-accent-deep'} />
                <p className={`mt-2 text-xs ${i === 0 ? 'text-paper/60' : 'text-gray-500'}`}>{label}</p>
                <p className={`text-2xl font-bold ${i === 0 ? '' : 'text-primary'}`}>{total[key].toLocaleString('ko-KR')}</p>
                {i > 0 && <p className="text-xs text-gray-400">이전 단계의 {pct(total[key], total[steps[i - 1].key])}%</p>}
              </div>
            ))}
          </div>

          <div className="mt-6 overflow-x-auto rounded-xl border border-gray-200 bg-white">
            <table className="w-full min-w-[820px] text-sm">
              <thead className="bg-gray-50 text-left text-xs text-gray-500">
                <tr>
                  <th className="px-6 py-4">활동</th>
                  <th className="px-4 py-4">조회</th>
                  <th className="px-4 py-4">지원 클릭</th>
                  <th className="px-4 py-4">클릭 → 참여</th>
                  <th className="px-4 py-4">완료율</th>
                  <th className="px-6 py-4">진단</th>
                </tr>
              </thead>
              <tbody>
                {rows.map(r => {
                  const f = flag(r);
                  const conv = pct(r.joined, r.clicks);
                  return (
                    <tr key={r.activity} className="border-t border-gray-100">
                      <td className="px-6 py-4">
                        <p className="font-semibold text-gray-800">{r.activity}</p>
                        <TypeChips types={r.types} />
                      </td>
                      <td className="px-4 py-4 text-gray-600">{r.views.toLocaleString('ko-KR')}</td>
                      <td className="px-4 py-4 text-gray-600">{r.clicks.toLocaleString('ko-KR')}</td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-20 rounded-full bg-gray-100">
                            <div
                              className={`h-full rounded-full ${conv < 25 ? 'bg-red-400' : 'bg-primary-soft'}`}
                              style={{ width: `${conv}%` }}
                            />
                          </div>
                          <span className="text-xs text-gray-600">{conv}%</span>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-xs text-gray-600">{pct(r.completed, r.joined)}%</td>
                      <td className="px-6 py-4">
                        {f && (
                          <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold ${f.cls}`}>
                            <f.icon size={12} /> {f.label}
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* 3. 도입 전후 */}
        <section className="grid gap-6 lg:grid-cols-[1fr_1.3fr]">
          <div>
            <p className="text-xs font-semibold tracking-[0.3em] text-accent">BEFORE & AFTER</p>
            <h2 className="mt-1 font-serif text-3xl font-bold text-primary">도입 전후 유형별 참여율</h2>
            <p className="mt-4 text-sm leading-relaxed text-gray-600">
              서비스 도입 후 참여율이 크게 오른 활동은 수요가 없던 게 아니라 <b className="text-primary">알려지지 않았던</b>
              것입니다. 새 활동을 기획할 때 어떤 유형에 홍보가 필요한지 판단하는 근거가 됩니다.
            </p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <div className="mb-4 flex gap-4 text-xs text-gray-500">
              <span className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-gray-300" /> 도입 전
              </span>
              <span className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-accent" /> 도입 후
              </span>
            </div>
            <ul className="flex flex-col gap-4">
              {partners.beforeAfter.map(b => (
                <li key={b.type} className="grid grid-cols-[110px_1fr_56px] items-center gap-4 text-sm">
                  <span className="text-gray-600">{typeLabel(b.type as ContributionType)}</span>
                  <div className="flex flex-col gap-1">
                    <div className="h-2 rounded-full bg-gray-300" style={{ width: `${b.before * 2.5}%` }} />
                    <div className="h-2 rounded-full bg-accent" style={{ width: `${b.after * 2.5}%` }} />
                  </div>
                  <span className="text-right text-xs font-semibold text-accent-deep">+{b.after - b.before}%p</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 4. 제공 방식 */}
        <section className="grid gap-6 md:grid-cols-3">
          {[
            { t: '캠페인 운영', d: '기관·기업이 리그 안에서 사회공헌 캠페인을 열고, 대학생 참여를 모읍니다.' },
            { t: '성과 관리 리포트', d: '인증 등급별 참여 인원·시간·횟수와 달성률, 승인·취소 이력 요약을 제공합니다.' },
            { t: '참여 인사이트', d: '활동별 관심도, 진입장벽, 홍보 효과를 익명 집계로 제공해 다음 활동 기획을 돕습니다.' },
          ].map(x => (
            <div key={x.t} className="paper-texture rounded-xl border border-paper-deep p-6">
              <p className="font-serif text-xl font-bold text-ink">{x.t}</p>
              <p className="mt-2 text-sm text-ink/80">{x.d}</p>
            </div>
          ))}
        </section>

        <p className="flex items-start gap-2 rounded-xl bg-white p-4 text-xs text-gray-500">
          <Lock size={14} className="mt-px shrink-0" />
          개인 식별 정보, 개인별 참여 이력, 증빙 파일은 어떤 파트너에게도 제공하지 않습니다. 모든 지표는 학교·활동 단위
          익명 집계입니다.
        </p>
      </div>
    </>
  );
}
