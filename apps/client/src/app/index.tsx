import { Header } from "../components/header";
import { Hero } from "../components/hero";
import { Widgets } from "../components/widgets";
import { BlogsAndReshares } from "../components/blogs-and-reshares";
import { Footer } from "../components/footer";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <Widgets />
        <BlogsAndReshares />
      </main>
      <Footer />
    </div>
  );
}

export default App;
