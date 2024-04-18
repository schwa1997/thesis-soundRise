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
          keywords={["kids", "volumn"]}
          link={"./soundRise"}
        />
        <FlipCard
          title={"app2"}
          playLink={"./soundRise2/play"}
          imgUrl={"/app2.png"}
          link={"./soundRise2"}
          description={
            "this app is for singing practice. Singers can visualize the pitch by the animation. so with this app, singers can practice the singing better "
          }
          keywords={["students", "music"]}
        />
      </main>
      <Footer />
    </>
  );
}
