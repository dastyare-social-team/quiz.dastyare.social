"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/accordion";
import { capture } from "@/lib/posthog";

export type FaqItem = {
  value: string;
  question: string;
  answer: string;
};

const FaqAccordion = ({
  items,
  className,
}: {
  items: FaqItem[];
  className?: string;
}) => {
  const handleValueChange = (value: string) => {
    if (!value) {
      return;
    }

    capture("faq_question_opened", {
      question: value,
      pathname: window.location.pathname,
    });
  };

  return (
    <Accordion
      type="single"
      collapsible
      defaultValue="q1"
      onValueChange={handleValueChange}
      className={className}
    >
      {items.map((item) => (
        <AccordionItem key={item.value} value={item.value}>
          <AccordionTrigger>{item.question}</AccordionTrigger>
          <AccordionContent>{item.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default FaqAccordion;
