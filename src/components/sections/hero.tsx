"use client"

import { Button } from "@/components/button";
import { useRouter } from "next/navigation";

const Hero = () => {
const router = useRouter()

    return ( 
        <section className="flex flex-col justify-center items-center py-25 bg-primary/1 border-b border-primary/5">
        <div className="flex flex-col gap-y-3 justify-center items-center">
          <h1 className="text-3xl tracking-[-1.5px]">
            Feeling Fraustrated&nbsp;
            <span className="bg-selection-background text-selection-foreground">
              <span className="font-medium">NOT</span>&nbsp;Getting More&nbsp;
              <span className="font-medium">SALES</span>&nbsp;—&nbsp;?
            </span>
          </h1>

          {/* <h1 className="text-3xl tracking-[-1.5px]">
            Are You&nbsp;
            <span className="bg-selection-background text-selection-foreground">
              <span className="font-medium">Ready</span> To Get More&nbsp;
              <span className="font-medium">SALES</span> — ?
            </span>
          </h1> */}

          <p className="text-xl opacity-90">
            — Answer 15 Questions to Find Out —
          </p>
        </div>
        <div className="flex flex-col justify-center items-center gap-y-2 mb-30">
          <Button
            onClick={() => router.push("/Qs")}
            className="text-xl md:text-xl py-1.5 mt-10"
          >
            Take Quiz&nbsp;<span className="font-medium">Now To Know Why</span>
          </Button>
          <p className="text-sm opacity-80">Only Takes — 5min</p>
        </div>
      </section>
     );
}
 
export default Hero;