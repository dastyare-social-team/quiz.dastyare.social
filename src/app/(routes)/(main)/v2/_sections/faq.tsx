import SectionWrapper from "@/components/section-wrapper";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/accordion";
import { Button } from "@/components/button";
import { getTranslations } from "next-intl/server";

const LandingFAQSectionV2 = async () => {
  const t = await getTranslations("faq");
  const faqItems = Object.keys(t.raw("items") ?? {});

  return (
    <SectionWrapper className="justify-center items-center md:pb-10">
      <div className="max-w-2xl w-full flex flex-col items-center gap-y-2.5">
        <div className="flex flex-col gap-y-1.5 pb-5 max-w-xl">
          <h2 className="text-center">
            {t("heading.prefix")}{" "}
            <span className="text-primary">{t("heading.highlight")}</span>
          </h2>
          <p className="text-center">{t("description")}</p>
        </div>

        <Accordion
          type="single"
          collapsible
          defaultValue="q1"
          className="max-w-5xl w-full"
        >
          {faqItems.map((item) => (
            <AccordionItem key={item} value={item}>
              <AccordionTrigger>{t(`items.${item}.question`)}</AccordionTrigger>
              <AccordionContent>{t(`items.${item}.answer`)}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="max-w-md text-center pt-5 flex flex-col gap-y-2.5 items-center">
          <h3>
            {t("contact.title.prefix")}{" "}
            <span className="text-primary">{t("contact.title.highlight")}</span>
          </h3>
          <p className="text-[18px]">{t("contact.description")}</p>

          <div className="pt-5">
            <Button variant="secondary" className="text-[18px] px-3.5 border">
              {t("contact.button")}
            </Button>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default LandingFAQSectionV2;
