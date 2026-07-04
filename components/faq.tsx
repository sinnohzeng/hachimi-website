"use client";

import { useState, type ReactNode } from "react";
import { Plus, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import type { Translations } from "@/lib/i18n";

const ease = [0.16, 1, 0.3, 1] as const;

function FAQAccordionItem({
  question,
  answer,
  isOpen,
  onToggle,
  index,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}): ReactNode {
  const answerId = `faq-answer-${index}`;
  const questionId = `faq-question-${index}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1, ease }}
      className="border-foreground/10 border-b"
    >
      <button
        type="button"
        id={questionId}
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={answerId}
        className="group flex w-full cursor-pointer items-center justify-between py-6 text-left"
      >
        <span className="text-foreground pr-8 text-base font-medium sm:text-lg">
          {question}
        </span>
        <div className="flex h-6 w-6 shrink-0 items-center justify-center">
          <motion.div
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.2, ease }}
          >
            <Plus
              className="text-foreground/60 group-hover:text-foreground h-5 w-5 transition-colors"
              aria-hidden="true"
            />
          </motion.div>
        </div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={answerId}
            role="region"
            aria-labelledby={questionId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease }}
            className="overflow-hidden"
          >
            <p className="text-foreground/60 max-w-2xl pb-6 leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FAQ({ t }: { t: Translations }): ReactNode {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      id="faq"
      className="bg-background relative w-full scroll-mt-28 overflow-hidden py-24 sm:py-32"
    >
      <div className="relative mx-auto max-w-7xl px-0 xl:px-12">
        <div className="px-8 sm:px-12">
          <div className="mb-12 max-w-2xl">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease }}
              className="text-foreground font-serif text-3xl leading-tight font-medium sm:text-4xl lg:text-5xl"
            >
              {t.faq.title}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1, ease }}
              className="text-foreground/60 mt-4"
            >
              {t.faq.subtitle}
            </motion.p>
          </div>

          <div className="border-foreground/10 border-t">
            {t.faq.items.map((faq, index) => (
              <FAQAccordionItem
                key={faq.question}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === index}
                onToggle={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
                index={index}
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2, ease }}
            className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center"
          >
            <p className="text-foreground/60">{t.faq.stillHaveQuestions}</p>
            <a
              href="mailto:support@hachimi.ai"
              className="group text-foreground inline-flex items-center gap-2 font-medium transition-opacity hover:opacity-70"
            >
              {t.faq.contact}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
