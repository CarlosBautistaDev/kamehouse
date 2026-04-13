"use client";

import { useState } from "react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
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

  return (
    <div className="flex items-center justify-between py-3.5 px-5 border-b border-black/5 last:border-0">
      <div className="flex items-center gap-3">
        <span className="text-lg">{periodIcon}</span>
        <span className="text-text-primary font-medium">{time}</span>
      </div>
      {note && <span className="text-text-tertiary text-sm">{note}</span>}
    </div>
  );
}

function BoxTab() {
  return (
    <div className="space-y-6">
      <div className="glass p-0 overflow-hidden">
        <div className="px-5 py-3.5 bg-black/[0.02] border-b border-black/5">
          <h4 className="font-heading text-xl text-text-primary">
            {BOX_SCHEDULE.weekdays.label}
          </h4>
        </div>
        {BOX_SCHEDULE.weekdays.slots.map((slot) => (
          <ScheduleSlot key={slot.time} {...slot} />
        ))}
      </div>

      <div className="glass p-0 overflow-hidden">
        <div className="px-5 py-3.5 bg-black/[0.02] border-b border-black/5">
          <h4 className="font-heading text-xl text-text-primary">
            {BOX_SCHEDULE.saturday.label}
          </h4>
        </div>
        {BOX_SCHEDULE.saturday.slots.map((slot) => (
          <ScheduleSlot key={slot.time} {...slot} />
        ))}
      </div>

      <div className="flex flex-wrap gap-4">
        {BOX_SCHEDULE.professors.map((prof) => (
          <div
            key={prof.name}
            className="glass px-5 py-3.5 flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-full bg-accent-primary/10 flex items-center justify-center">
              <span className="text-accent-primary text-lg">🥊</span>
            </div>
            <div>
              <p className="text-text-primary text-sm font-semibold">{prof.name}</p>
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
      <div className="glass p-0 overflow-hidden">
        <div className="px-5 py-3.5 bg-black/[0.02] border-b border-black/5">
          <h4 className="font-heading text-xl text-text-primary">
            {FUNCTIONAL_SCHEDULE.weekdays.label}
          </h4>
        </div>
        {FUNCTIONAL_SCHEDULE.weekdays.slots.map((slot) => (
          <ScheduleSlot key={slot.time} {...slot} />
        ))}
      </div>

      <div className="glass p-0 overflow-hidden">
        <div className="px-5 py-3.5 bg-black/[0.02] border-b border-black/5">
          <h4 className="font-heading text-xl text-text-primary">
            {FUNCTIONAL_SCHEDULE.saturday.label}
          </h4>
        </div>
        {FUNCTIONAL_SCHEDULE.saturday.slots.map((slot) => (
          <ScheduleSlot key={slot.time} {...slot} />
        ))}
      </div>

      <div className="glass px-5 py-3.5 text-center">
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
      <div className="glass p-0 overflow-hidden">
        <div className="px-5 py-3.5 bg-black/[0.02] border-b border-black/5">
          <h4 className="font-heading text-xl text-text-primary">
            {TKD_SCHEDULE.evening.label}
          </h4>
        </div>
        {TKD_SCHEDULE.evening.groups.map((g) => (
          <div
            key={g.days}
            className="flex items-center justify-between py-3.5 px-5 border-b border-black/5 last:border-0"
          >
            <span className="text-text-primary font-medium">{g.days}</span>
            <span className="text-text-secondary text-sm">{g.group}</span>
          </div>
        ))}
      </div>

      <div className="glass p-0 overflow-hidden">
        <div className="px-5 py-3.5 bg-black/[0.02] border-b border-black/5">
          <h4 className="font-heading text-xl text-text-primary">
            {TKD_SCHEDULE.morning.label}
          </h4>
        </div>
        <div className="py-3.5 px-5">
          <span className="text-text-primary">{TKD_SCHEDULE.morning.group}</span>
        </div>
      </div>
    </div>
  );
}

export function Schedule() {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ["🥊 Box", "💪 Funcional", "🥋 Taekwondo"];

  return (
    <section id="horarios" className="py-24 md:py-32 px-4 bg-bg-secondary">
      <div className="max-w-3xl mx-auto">
        <AnimatedSection animation="blur-scale">
          <p className="text-accent-primary font-semibold text-sm tracking-[0.2em] uppercase text-center mb-3">
            Horarios
          </p>
          <h2 className="font-heading text-5xl md:text-7xl text-center text-text-primary mb-4">
            ENTRENA A TU RITMO
          </h2>
          <p className="text-text-secondary text-center text-lg mb-12">
            Encuentra el horario perfecto para ti
          </p>
        </AnimatedSection>

        <AnimatedSection delay={200} animation="fade-up">
          <div className="flex justify-center mb-10">
            <TabSelector
              tabs={tabs}
              activeTab={activeTab}
              onChange={setActiveTab}
            />
          </div>
        </AnimatedSection>

        <AnimatedSection delay={300} animation="blur-up">
          {activeTab === 0 && <BoxTab />}
          {activeTab === 1 && <FunctionalTab />}
          {activeTab === 2 && <TkdTab />}
        </AnimatedSection>
      </div>
    </section>
  );
}
