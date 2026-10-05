import React, { useState } from 'react';
import { CheckCircle2, RotateCcw, ArrowRight, AlertCircle, Sparkles } from 'lucide-react';
import { AUDIT_QUESTIONS } from '../data/ormocData';

interface AuditToolProps {
  onCompleteAudit: (score: number, report: string) => void;
}

export const AuditTool: React.FC<AuditToolProps> = ({ onCompleteAudit }) => {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [currentStep, setCurrentStep] = useState(0);

  const isCompleted = Object.keys(answers).length === AUDIT_QUESTIONS.length;

  const handleSelectOption = (questionId: number, optionIndex: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
    if (currentStep < AUDIT_QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const totalScore = Object.entries(answers).reduce((sum, [qId, optIdx]) => {
    const q = AUDIT_QUESTIONS.find((item) => item.id === Number(qId));
    return sum + (q ? q.options[optIdx].score : 0);
  }, 0);

  const resetAudit = () => {
    setAnswers({});
    setCurrentStep(0);
  };

  const getScoreAssessment = (score: number) => {
    if (score < 40) {
      return {
        level: 'Critical Growth Opportunity',
        color: 'text-amber-400',
        summary: 'Your business is largely invisible to digital-first buyers in Ormoc City. You are relying almost entirely on old word-of-mouth and foot traffic, while competitors are capturing high-intent online searches.',
        priority: 'Claim and optimize your Google Maps profile + launch an automated Facebook Messenger responder.',
      };
    } else if (score < 75) {
      return {
        level: 'Emerging Local Contender',
        color: 'text-amber-300',
        summary: 'You have foundational online pieces set up, but significant friction in inquiry speed, visual presentation, and paid ad targeting is capping your monthly revenue in Leyte.',
        priority: 'Upgrade to high-energy on-site vertical reels (TikTok/Reels) and switch from random Boost Posts to targeted Meta Ads.',
      };
    } else {
      return {
        level: 'Ormoc Market Leader',
        color: 'text-emerald-400',
        summary: 'Your digital presence is in the top 10% of Ormoc City businesses! Your main leverage now is expanding market reach across neighboring Leyte towns and optimizing customer lifetime value.',
        priority: 'Scale regional ad campaigns toward Cebu commuters and launch seasonal holiday gift-box packaging.',
      };
    }
  };

  const assessment = getScoreAssessment(totalScore);

  return (
    <section id="audit" className="border-b border-white/10 bg-[#0c0d10] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-amber-400 uppercase">
            <span>Free Diagnostic Tool</span>
            <span aria-hidden="true" className="text-white/30">·</span>
            <span>Self-Assessment</span>
          </div>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white font-display sm:text-4xl [text-wrap:balance]">
            The Ormoc MSME Market Readiness Audit.
          </h2>
          <p className="mt-3 text-base text-neutral-400 leading-relaxed">
            Answer 5 quick questions to pinpoint exactly where your business is losing potential customers in Ormoc City and get an immediate action roadmap.
          </p>
        </div>

        {/* Audit Container */}
        <div className="mt-12 rounded-2xl border border-white/10 bg-[#121419] p-6 sm:p-10">
          {!isCompleted ? (
            <div>
              {/* Progress Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <span className="text-xs font-mono text-amber-400 font-bold uppercase">
                  Question {currentStep + 1} of {AUDIT_QUESTIONS.length}
                </span>
                <span className="text-xs text-neutral-400">
                  {Math.round(((currentStep + 1) / AUDIT_QUESTIONS.length) * 100)}% Complete
                </span>
              </div>

              {/* Active Question */}
              <div className="mt-8">
                <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
                  {AUDIT_QUESTIONS[currentStep].question}
                </h3>

                {/* Options List */}
                <div className="mt-6 space-y-3">
                  {AUDIT_QUESTIONS[currentStep].options.map((option, idx) => {
                    const isSelected = answers[AUDIT_QUESTIONS[currentStep].id] === idx;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleSelectOption(AUDIT_QUESTIONS[currentStep].id, idx)}
                        className={`w-full text-left p-4 sm:p-5 rounded-xl border transition-all ${
                          isSelected
                            ? 'border-amber-400 bg-amber-400/10 text-white'
                            : 'border-white/10 bg-white/[0.02] text-neutral-300 hover:border-white/20 hover:bg-white/[0.05]'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`mt-0.5 h-4 w-4 rounded-full border flex items-center justify-center shrink-0 ${
                              isSelected ? 'border-amber-400 bg-amber-400' : 'border-neutral-500'
                            }`}
                          >
                            {isSelected && <div className="h-1.5 w-1.5 rounded-full bg-neutral-950" />}
                          </div>
                          <div>
                            <div className="text-sm font-medium">{option.text}</div>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step Navigation */}
              <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                <button
                  type="button"
                  disabled={currentStep === 0}
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="text-xs font-medium text-neutral-400 hover:text-white disabled:opacity-30 disabled:pointer-events-none"
                >
                  Previous Question
                </button>

                <div className="flex items-center gap-1.5">
                  {AUDIT_QUESTIONS.map((_, i) => (
                    <div
                      key={i}
                      className={`h-1.5 rounded-full transition-all ${
                        i === currentStep
                          ? 'w-6 bg-amber-400'
                          : answers[AUDIT_QUESTIONS[i].id] !== undefined
                          ? 'w-2 bg-neutral-500'
                          : 'w-2 bg-neutral-700'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* Results Screen */
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
                  <Sparkles className="h-4 w-4" />
                  <span>Audit Completed</span>
                </div>
                <button
                  type="button"
                  onClick={resetAudit}
                  className="inline-flex items-center gap-1 text-xs text-neutral-400 hover:text-white transition-colors"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>Retake Audit</span>
                </button>
              </div>

              {/* Score Showcase */}
              <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
                <div className="lg:col-span-4 rounded-xl border border-white/10 bg-[#0c0d10] p-6 text-center flex flex-col justify-center items-center">
                  <div className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                    Your Readiness Score
                  </div>
                  <div className="mt-2 text-5xl sm:text-6xl font-extrabold font-display text-white tabular-nums">
                    {totalScore}
                    <span className="text-xl text-neutral-500 font-normal">/100</span>
                  </div>
                  <div className={`mt-3 text-sm font-bold ${assessment.color}`}>
                    {assessment.level}
                  </div>
                </div>

                <div className="lg:col-span-8 flex flex-col justify-center">
                  <h4 className="text-lg font-bold font-display text-white">
                    Executive Diagnosis:
                  </h4>
                  <p className="mt-2 text-sm text-neutral-300 leading-relaxed">
                    {assessment.summary}
                  </p>
                  <div className="mt-4 p-4 rounded-xl border border-amber-400/20 bg-amber-400/5">
                    <div className="text-xs font-bold uppercase tracking-wider text-amber-300">
                      Recommended 30-Day Focus:
                    </div>
                    <div className="mt-1 text-xs sm:text-sm text-neutral-200">
                      {assessment.priority}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Breakdown of User's Responses */}
              <div className="mt-10 border-t border-white/10 pt-8">
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                  Channel-by-Channel Insights
                </h4>
                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {AUDIT_QUESTIONS.map((q) => {
                    const optIdx = answers[q.id];
                    const opt = q.options[optIdx];
                    return (
                      <div key={q.id} className="p-3.5 rounded-lg border border-white/5 bg-white/[0.02]">
                        <div className="flex items-center justify-between text-xs text-neutral-400 font-medium">
                          <span>{q.question.split(' ')[0]} {q.question.split(' ')[1]} Channel</span>
                          <span className="font-mono text-amber-300">+{opt.score} pts</span>
                        </div>
                        <p className="mt-1 text-xs text-neutral-300">
                          {opt.tip}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Next Step Action */}
              <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-neutral-400 text-center sm:text-left">
                  We can walk through these exact points during your complimentary strategy session.
                </div>
                <button
                  type="button"
                  onClick={() =>
                    onCompleteAudit(
                      totalScore,
                      `Audit Score: ${totalScore}/100 (${assessment.level}) - Focus: ${assessment.priority}`
                    )
                  }
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-amber-400 px-6 py-3 text-xs font-bold text-neutral-950 hover:bg-amber-300 transition-colors shadow-md shadow-amber-400/20"
                >
                  <span>Discuss Your Audit Results with Us</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
