import { BrowserRouter } from "react-router-dom";

import {
  About,
  Contact,
  Experience,
  Hero,
  Navbar,
  Tech,
  Works,
  StarsCanvas,
  Awards,
  Footer,
  CustomCursor,
} from "./components";

const App = () => {
  return (
    <BrowserRouter>
      <CustomCursor />
      <div className="relative z-0 w-full overflow-x-clip bg-primary">
        <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
          <Navbar />
          <Hero />
        </div>
        <About />
        <Experience />
        <Tech />
        <Works />
        <Awards />
        <div className="relative z-0 overflow-hidden">
          <Contact />
          <Footer />
          <StarsCanvas />
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
