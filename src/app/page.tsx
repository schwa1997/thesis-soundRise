import { FlipCard } from "@/components/component/flipCard";

export default function Home() {
  return (
    <main className="flex flex-col sm:flex-row min-h-screen items-center place-content-center  gap-6 sm:gap-20  md:mx-auto mb-8">
      <FlipCard
        title={"Sound Rise"}
        link={"./soundRise/play"}
        imgUrl={"/app1.png"}
        description={
          "sunrise is an app for kids who have disablity for listing to practice speaking with the function to visualise the volumn"
        }
        keywords={["kids", "volumn"]}
      />
      <FlipCard
        title={"app2"}
        link={"./soundRise2"}
        imgUrl={"/app2.png"}
        description={
          "this app is for singing practice. Singers can visualize the pitch by the animation. so with this app, singers can practice the singing better "
        }
        keywords={["students", "music"]}
      />
    </main>
  );
}
