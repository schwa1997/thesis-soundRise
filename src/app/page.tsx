import { ProjectCard } from "@/components/component/appCard";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen gap-2 items-center justify-between px-0  sm:flex-row md:mx-20 my-8">
      <ProjectCard
        title={"Sound Rise"}
        link={"./soundRise/play"}
        imgUrl={"/app1.png"}
        description={
          "sunrise is an app for kids who have disablity for listing to practice speaking with the function to visualise the volumn"
        }
        keywords={["kids","volumn"]}
      />
      <ProjectCard
        title={"app2"}
        link={"./soundRise2"}
        imgUrl={"/app2.png"}
        description={
          "this app is for singing practice. Singers can visualize the pitch by the animation. so with this app, singers can practice the singing better "
        }
        keywords={["students","music"]}
      />
    </main>
  );
}
