import { FlipCard } from "@/components/component/flipCard";
import Footer from "@/components/layout/Footer/Footer";

export default function Home() {
  return (
    <>
      <main className="flex flex-col sm:flex-row min-h-screen items-center place-content-center  gap-6 sm:gap-20  md:mx-auto mb-8">
        <FlipCard
          title={"Sound Rise"}
          playLink={"./soundRise/play"}
          imgUrl={"/soundrise-logo.png"}
          description={
            "sunrise is an app for kids who have disablity for listing to practice speaking with the function to visualise the volumn"
          }
          keywords={["Vowel recognition", "Formants"]}
          link={"./soundRise"}
        />
        <FlipCard
          title={"SoundSpark"}
          playLink={"./soundSpark/play"}
          imgUrl={"/app2.png"}
          link={"./soundSpark"}
          description={
            "SoundSpark uses the CNN model to recognize the vowel sound."
          }
          keywords={["CNN", "Vowel recognition"]}
        />
      </main>
      <Footer />
    </>
  );
}
