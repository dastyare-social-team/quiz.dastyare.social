import SectionWrapper from "@/components/section-wrapper";
import FaqAccordion from "@/components/faq-accordion";
import { Button } from "@/components/button";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

const LandingFAQSectionV2 = async () => {
  const t = await getTranslations("faq");
  const faqItems = Object.keys(t.raw("items") ?? {});

  const items = faqItems.map((item) => ({
    value: item,
    question: t(`items.${item}.question`),
    answer: t(`items.${item}.answer`),
  }));

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

        <FaqAccordion items={items} className="max-w-5xl w-full" />

        <div className="max-w-md text-center pt-5 flex flex-col gap-y-2.5 items-center">
          <h3>
            {t("contact.title.prefix")}{" "}
            <span className="text-primary">{t("contact.title.highlight")}</span>
          </h3>
          <p className="text-[18px]">{t("contact.description")}</p>

          <div className="pt-5">
            <Link
              href="https://dastyare.social"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="secondary" className="text-[18px] px-3.5 border">
                {t("contact.button")}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default LandingFAQSectionV2;
