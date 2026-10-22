"use client";

import Link from "next/link";
import { useState } from "react";
import { poll } from "@/lib/activities";
import { ActivityCard, ChoiceButton, PrimaryButton, SaveStatus, useRecord } from "./shared";

type WhereId = (typeof poll.whereMath.options)[number]["id"];
type TopicId = (typeof poll.topic.options)[number]["id"];

export function MathPoll() {
  const [whereMath, setWhere] = useState<WhereId | null>(null);
  const [confidence, setConfidence] = useState<number | null>(null);
  const [knewFib, setKnewFib] = useState<boolean | null>(null);
  const [topic, setTopic] = useState<TopicId | null>(null);
  const { record, ...save } = useRecord();

  const complete = whereMath && confidence && knewFib !== null && topic;
  const sent = save.status === "saved";

  return (
    <ActivityCard id="poll" tag="Activity 4 · Survey" title="The Math-in-My-Life Poll" topic="A · Math in daily life" color="sun">
      <fieldset disabled={sent || save.pending} className="space-y-8">
        <div>
          <p className="text-lg font-bold">1. {poll.whereMath.prompt}</p>
          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            {poll.whereMath.options.map((o) => (
              <ChoiceButton key={o.id} selected={whereMath === o.id} onClick={() => setWhere(o.id)}>
                {o.label}
              </ChoiceButton>
            ))}
          </div>
        </div>

        <div>
          <p className="text-lg font-bold">2. {poll.confidence.prompt}</p>
          <div className="mt-3 grid grid-cols-5 gap-2">
            {poll.confidence.labels.map((label, i) => (
              <ChoiceButton key={label} selected={confidence === i + 1} onClick={() => setConfidence(i + 1)}>
                <span className="block text-center text-2xl font-extrabold">{i + 1}</span>
                <span className="block text-center text-[11px] leading-tight">{label}</span>
              </ChoiceButton>
            ))}
          </div>
        </div>

        <div>
          <p className="text-lg font-bold">3. {poll.knewFib.prompt}</p>
          <div className="mt-3 grid max-w-sm grid-cols-2 gap-3">
            <ChoiceButton selected={knewFib === true} onClick={() => setKnewFib(true)}>
              Yes, I knew
            </ChoiceButton>
            <ChoiceButton selected={knewFib === false} onClick={() => setKnewFib(false)}>
              No, that&apos;s new!
            </ChoiceButton>
          </div>
        </div>

        <div>
          <p className="text-lg font-bold">4. {poll.topic.prompt}</p>
          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            {poll.topic.options.map((o) => (
              <ChoiceButton key={o.id} selected={topic === o.id} onClick={() => setTopic(o.id)}>
                {o.label}
              </ChoiceButton>
            ))}
          </div>
        </div>
      </fieldset>

      <div className="mt-8 flex flex-wrap items-center gap-4">
        {!sent && (
          <PrimaryButton
            disabled={!complete || save.pending}
            onClick={() =>
              complete &&
              record({ activity: "math-poll", whereMath: whereMath!, confidence: confidence!, knewFib: knewFib!, topic: topic! })
            }
          >
            Submit my vote
          </PrimaryButton>
        )}
        <SaveStatus {...save} />
        {sent && (
          <Link href="/discover#poll" className="link font-bold uppercase">
            See how everyone voted →
          </Link>
        )}
      </div>
    </ActivityCard>
  );
}
