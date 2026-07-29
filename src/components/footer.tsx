"use client";

import Link from "next/link";
import SectionWrapper from "./section-wrapper";

const Footer = () => {
  return (
    <SectionWrapper className="text-center select-none justify-center md:items-center md:pt-10 md:pb-10">
      <div className="flex flex-col gap-y-3.5">
        <div className="flex flex-col md:flex-row gap-x-5 items-center justify-center">
          <p className="flex flex-wrap justify-center items-center md:flex-row">
            copyright&nbsp;<span className="text-[20px]">@</span>&nbsp;
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href="https://dastyare.social"
              className="text-primary hover:opacity-60"
            >
              dastyare.social
            </Link>
          </p>

          <div className="flex flex-wrap justify-center items-center gap-x-1.5 text-[20px]">
            <p className="hidden md:block text-[16px]">/</p>
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/dastyare-social"
              className="hover:text-primary"
            >
              github
            </Link>
            .
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href="https://instagram.com/omidshabab_channel"
              className="hover:text-primary"
            >
              instagram
            </Link>
            .
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href="https://tiktok.com/omidshabab_channel"
              className="hover:text-primary"
            >
              tiktok
            </Link>
            .
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href="https://x.com/omidshabab_channel"
              className="hover:text-primary"
            >
              twitter
            </Link>
            .
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href="https://youtube.com/omidshabab_channel"
              className="hover:text-primary"
            >
              youtube
            </Link>
            .
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href="https://linkedin.com/omidshabab-channel"
              className="hover:text-primary"
            >
              linkedin
            </Link>
          </div>
        </div>
        <p className="text-lg text-secondary/60">
          This website is operated by Dastyare Social — ORG ("Company," "we," or
          "us"). By using this Website, you agree to comply with this Disclaimer
          and our Terms of Use. The material provided is for educational and
          informational purposes only and is not a substitute for professional
          advice. No guarantees or warranties are made regarding the Website’s
          performance or the accuracy of its content. Use of this Website does
          not establish a professional-client relationship. We are not liable
          for any damages resulting from the use of this Website. Please consult
          a professional for advice tailored to your specific situation. ​We
          strive to accurately represent our programmes, but there is no
          guarantee of earning money using the techniques and ideas in these
          materials. Your results may vary and depend on numerous factors beyond
          our control. Past results do not guarantee future outcomes.
        </p>
      </div>
    </SectionWrapper>
  );
};

export default Footer;
