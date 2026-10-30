'use client';

import React from 'react';
import { SectionHeader, T, ratingNum } from './playUi';
import { ArrowRight, Database, Share2, ShieldCheck, Star } from 'lucide-react';

interface PlayStoreReviewsSectionProps {
  ratingValue: number;
  reviewsCount: string;
}

function distribution(rating: number): number[] {
  const k = Math.max(0, Math.min(1, (rating - 3) / 2));
  const w = [0.12 - 0.07 * k, 0.13 - 0.08 * k, 0.2 - 0.1 * k, 0.3 - 0.1 * k, 0.25 + 0.6 * k];
  const sum = w.reduce((a, b) => a + b, 0);
  return w.map((x) => x / sum).reverse();
}

export const PlayStoreReviewsSection: React.FC<PlayStoreReviewsSectionProps> = ({
  ratingValue,
  reviewsCount,
}) => {
  const rating = ratingNum(ratingValue);
  const dist = distribution(rating);

  return (
    <div className="flex flex-col">
      {/* Data safety */}
      <section className="mt-7">
        <SectionHeader title="Data safety" icon={<ArrowRight size={20} />} />
        <div className="px-4">
          <p className={`text-[13px] leading-snug mt-0 mb-3 ${T.sub}`}>
            Safety starts with understanding how developers collect and share your data. This is a portfolio project, so nothing real is collected.
          </p>
          <div className={`rounded-2xl border p-4 flex flex-col gap-3.5 ${T.line}`}>
            {[
              { Icon: Share2, text: 'No data shared with third parties' },
              { Icon: Database, text: 'No data collected' },
              { Icon: ShieldCheck, text: 'Everything runs in this demo, locally' },
            ].map(({ Icon, text }) => (
              <div key={text} className="flex items-center gap-3 text-[13px]">
                <Icon size={18} className={T.sub} />
                {text}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ratings and reviews */}
      <section className="mt-7">
        <SectionHeader title="Ratings and reviews" icon={<ArrowRight size={20} />} />
        <div className="px-4 flex items-center gap-6">
          <div className="shrink-0 text-center">
            <div className="text-[52px] leading-none font-light">{ratingValue}</div>
            <div className="flex justify-center gap-0.5 mt-2">
              {[1, 2, 3, 4, 5].map((n) => (
                <Star
                  key={n}
                  size={11}
                  className={n <= Math.round(rating) ? T.primaryText : T.sub}
                  fill={n <= Math.round(rating) ? 'currentColor' : 'none'}
                />
              ))}
            </div>
            <div className={`text-[11.5px] mt-1 ${T.sub}`}>{reviewsCount} reviews</div>
          </div>
          <div className="flex-1 flex flex-col gap-1.5">
            {dist.map((v, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className={`w-2 text-[11px] ${T.sub}`}>{5 - i}</span>
                <div className="flex-1 h-2 rounded-full bg-[var(--m3-surface-container-highest,#333537)] overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[var(--m3-primary,#6dd58c)]"
                    style={{ width: `${Math.max(3, v * 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

