import { ProjectCard } from "@/components/component/appCard";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen gap-12 items-center justify-between px-20  sm:flex-row md:mx-20 my-8">
      <ProjectCard
        title={"app1"}
        link={"./soundRise"}
        imgUrl={"/app1.png"}
        description={
          "sunrise is an app for kids who have disablity for listing to practice speaking with the function to visualise the volumn"
        }
      />
      <ProjectCard
        title={"app2"}
        link={"./soundRise2"}
        imgUrl={"/app2.png"}
        description={
          "this app is for singing practice. Singers can visualize the pitch by the animation. so with this app, singers can practice the singing better "
        }
      />
    </main>
  );
}
