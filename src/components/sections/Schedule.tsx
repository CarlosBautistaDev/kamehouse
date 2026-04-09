"use client";

import { useState } from "react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { GlassCard } from "@/components/ui/GlassCard";
import { TabSelector } from "@/components/ui/TabSelector";
import {
  BOX_SCHEDULE,
  FUNCTIONAL_SCHEDULE,
  TKD_SCHEDULE,
} from "@/lib/constants";

function ScheduleSlot({
  time,
  period,
  note,
}: {
  time: string;
  period: string;
  note?: string;
}) {
  const periodIcon = period === "morning" ? "🌅" : "🌙";
  const periodColor =
    period === "morning" ? "text-amber-400" : "text-blue-400";

  return (
    <div className="flex items-center justify-between py-3 px-4 border-b border-white/5 last:border-0">
      <div className="flex items-center gap-3">
        <span className={`${periodColor} text-lg`}>{periodIcon}</span>
        <span className="text-white font-medium">{time}</span>
      </div>
      {note && <span className="text-text-tertiary text-sm">{note}</span>}
    </div>
  );
}

function BoxTab() {
  return (
    <div className="space-y-6">
      <GlassCard className="p-0 overflow-hidden" hover={false}>
        <div className="px-4 py-3 bg-white/5 border-b border-white/5">
          <h4 className="font-heading text-xl text-white">
            {BOX_SCHEDULE.weekdays.label}
          </h4>
        </div>
        {BOX_SCHEDULE.weekdays.slots.map((slot) => (
          <ScheduleSlot key={slot.time} {...slot} />
        ))}
      </GlassCard>

      <GlassCard className="p-0 overflow-hidden" hover={false}>
        <div className="px-4 py-3 bg-white/5 border-b border-white/5">
          <h4 className="font-heading text-xl text-white">
            {BOX_SCHEDULE.saturday.label}
          </h4>
        </div>
        {BOX_SCHEDULE.saturday.slots.map((slot) => (
          <ScheduleSlot key={slot.time} {...slot} />
        ))}
      </GlassCard>

      <div className="flex flex-wrap gap-4">
        {BOX_SCHEDULE.professors.map((prof) => (
          <div
            key={prof.name}
            className="glass px-4 py-3 flex items-center gap-2"
          >
            <span className="text-accent-primary font-bold">🥊</span>
            <div>
              <p className="text-white text-sm font-semibold">{prof.name}</p>
              <p className="text-text-tertiary text-xs">{prof.schedule}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FunctionalTab() {
  return (
    <div className="space-y-6">
      <GlassCard className="p-0 overflow-hidden" hover={false}>
        <div className="px-4 py-3 bg-white/5 border-b border-white/5">
          <h4 className="font-heading text-xl text-white">
            {FUNCTIONAL_SCHEDULE.weekdays.label}
          </h4>
        </div>
        {FUNCTIONAL_SCHEDULE.weekdays.slots.map((slot) => (
          <ScheduleSlot key={slot.time} {...slot} />
        ))}
      </GlassCard>

      <GlassCard className="p-0 overflow-hidden" hover={false}>
        <div className="px-4 py-3 bg-white/5 border-b border-white/5">
          <h4 className="font-heading text-xl text-white">
            {FUNCTIONAL_SCHEDULE.saturday.label}
          </h4>
        </div>
        {FUNCTIONAL_SCHEDULE.saturday.slots.map((slot) => (
          <ScheduleSlot key={slot.time} {...slot} />
        ))}
      </GlassCard>

      <div className="glass px-4 py-3 text-center">
        <p className="text-accent-primary font-semibold text-sm">
          🔥 Próximamente: CrossFit, Calistenia, Gym, HYROX
        </p>
      </div>
    </div>
  );
}

function TkdTab() {
  return (
    <div className="space-y-6">
      <GlassCard className="p-0 overflow-hidden" hover={false}>
        <div className="px-4 py-3 bg-white/5 border-b border-white/5">
          <h4 className="font-heading text-xl text-white">
            {TKD_SCHEDULE.evening.label}
          </h4>
        </div>
        {TKD_SCHEDULE.evening.groups.map((g) => (
          <div
            key={g.days}
            className="flex items-center justify-between py-3 px-4 border-b border-white/5 last:border-0"
          >
            <span className="text-white font-medium">{g.days}</span>
            <span className="text-text-secondary text-sm">{g.group}</span>
          </div>
        ))}
      </GlassCard>

      <GlassCard className="p-0 overflow-hidden" hover={false}>
        <div className="px-4 py-3 bg-white/5 border-b border-white/5">
          <h4 className="font-heading text-xl text-white">
            {TKD_SCHEDULE.morning.label}
          </h4>
        </div>
        <div className="py-3 px-4">
          <span className="text-white">{TKD_SCHEDULE.morning.group}</span>
        </div>
      </GlassCard>
    </div>
  );
}

export function Schedule() {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ["🥊 Box", "💪 Funcional", "🥋 Taekwondo"];

  return (
    <section id="horarios" className="py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <AnimatedSection>
          <h2 className="font-heading text-5xl md:text-6xl text-center text-white mb-4">
            HORARIOS
          </h2>
          <p className="text-text-secondary text-center text-lg mb-10">
            Encuentra el horario perfecto para ti
          </p>
        </AnimatedSection>

        <AnimatedSection delay={200}>
          <div className="flex justify-center mb-8">
            <TabSelector
              tabs={tabs}
              activeTab={activeTab}
              onChange={setActiveTab}
            />
          </div>
        </AnimatedSection>

        <AnimatedSection delay={300}>
          {activeTab === 0 && <BoxTab />}
          {activeTab === 1 && <FunctionalTab />}
          {activeTab === 2 && <TkdTab />}
        </AnimatedSection>
      </div>
    </section>
  );
}
