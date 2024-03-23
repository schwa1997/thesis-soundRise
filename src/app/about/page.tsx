"use client";

import { DescriptionCard } from "@/components/component/descriptionCard";
import { DescriptionCard2 } from "@/components/component/descriptionCard2";

export default function About() {
  return (
    <main className="text-black dark:text-white flex min-h-screen flex-col items-center text-neutral-content">
      <div className="min-h-screen min-w-screen">
        <div className="hero-content text-center">
          <div className="max-w-full">
            <section>
              <h1 className="font-extrabold mt-[20vh] mb-10 leading-none tracking-tight text-3xl sm:text-md md:text-3xl lg:text-4xl xl:text-5xl">
                About
              </h1>
              <p className="mt-10 mb-3 mx-auto max-w-[80%] leading-none tracking-tight text-xl">
                Depending on some characteristic of the voice captured by the
                microphone, the sun will change.
              </p>
              <p className="mb-10 mx-auto max-w-[80%] leading-none tracking-tight text-xl">
                But, <b>how does it do?</b> Lets see it together!
              </p>
            </section>
            <section className="p-10">
              <h2 className="font-bold mb-5 text-left leading-none tracking-tight text-xl sm:text-md md:text-2xl lg:text-2xl xl:text-2xl">
                First of all...
              </h2>
              <div className="my-10 grid grid-cols-1 p-8 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4">
                <DescriptionCard
                  textBefore={"The sun is"}
                  highlightedText={"asleep"}
                  textAfter={
                    "when the microphone does not recognize any voice sound, and it appears as it follows"
                  }
                  icon={"SunSleep"}
                  icoColor={"yellow"}
                />
                <DescriptionCard
                  textBefore={"The sun is"}
                  highlightedText={"awake"}
                  textAfter={
                    "when the microphone does not recognize any voice sound, and it appears as it follows"
                  }
                  icon={"SunAwake"}
                  icoColor={"yellow"}
                />
              </div>
            </section>
            <section className="p-10">
              <h2 className="font-bold mb-5 text-left leading-none tracking-tight text-xl sm:text-md md:text-2xl lg:text-2xl xl:text-2xl">
                Depending on the <b>sound intensity</b>...
              </h2>
              <div className="my-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4">
                <DescriptionCard
                  textBefore={"The sun is"}
                  highlightedText={"get smaller"}
                  textAfter={"as the sound becomes softer"}
                  icon={"SunAwake"}
                  icoColor={"yellow"}
                />
                <DescriptionCard
                  textBefore={"The sun is"}
                  highlightedText={"get bigger"}
                  textAfter={"as the sound becomes softer"}
                  icon={"SunAwake"}
                  icoColor={"yellow"}
                />
              </div>
            </section>
            <section className="p-10">
              <h2 className="font-bold mb-5 text-left leading-none tracking-tight text-xl sm:text-md md:text-2xl lg:text-2xl xl:text-2xl">
                Depending on the <b>pitch</b> of the sound...
              </h2>
              <div className="my-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4">
                <DescriptionCard
                  textBefore={"The sun is"}
                  highlightedText={"rises"}
                  textAfter={
                    "as the value of the emitted frequency becomes greater"
                  }
                  icon={"SunAwake"}
                  icoColor={"yellow"}
                />
                <DescriptionCard
                  textBefore={"The sun is"}
                  highlightedText={"sets"}
                  textAfter={
                    "as the value of the emitted frequency becomes lower"
                  }
                  icon={"SunAwake"}
                  icoColor={"yellow"}
                />
              </div>
            </section>
            <section className="p-10">
              <h2 className="font-bold mt-[10vh] mb-5 text-left leading-none tracking-tight text-xl sm:text-md md:text-2xl lg:text-2xl xl:text-2xl">
                Depending on the <b>timbre</b> of the voice, the sun could be...
              </h2>
              <div className="mt-10 mb-[10vh] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
                <DescriptionCard2
                  title={"red"}
                  textBefore={" if the sound of the"}
                  highlightedText={"vowel A"}
                  textAfter={"is recognized"}
                  icon={"SunAwake"}
                  icoColor={"red"}
                />
                <DescriptionCard2
                  title={"green"}
                  textBefore={" if the sound of the"}
                  highlightedText={"vowel E"}
                  textAfter={"is recognized"}
                  icon={"SunAwake"}
                  icoColor={"green"}
                />
                <DescriptionCard2
                  title={"blue"}
                  textBefore={" if the sound of the"}
                  highlightedText={"vowel I"}
                  textAfter={"is recognized"}
                  icon={"SunAwake"}
                  icoColor={"blue"}
                />
                <DescriptionCard2
                  title={"orange"}
                  textBefore={" if the sound of the"}
                  highlightedText={"vowel O"}
                  textAfter={"is recognized"}
                  icon={"SunAwake"}
                  icoColor={"orange"}
                />
                <DescriptionCard2
                  title={"gray"}
                  textBefore={" if the sound of the"}
                  highlightedText={"vowel U"}
                  textAfter={"is recognized"}
                  icon={"SunAwake"}
                  icoColor={"gray"}
                />
              </div>
            </section>
          </div>
        </div>
      </div>
      <div className="flex p-6 ">
        <a
          href="https://www.gnu.org/licenses/gpl-3.0.txt"
          className="text-sm font-mono underline hover:text-gray-500"
        >
          GNU General Public License v3.0
        </a>
      </div>
    </main>
  );
}
