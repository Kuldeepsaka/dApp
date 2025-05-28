import { useEffect } from "react";
import { useAppSelector } from "./store/hooks";

import Layout from "./components/Layout";
import About from "./sections/About";
import OurSolutions from "./sections/OurSolutions";
import Technology from "./sections/Technology";
import Tokenomics from "./sections/Tokenomics";
import Roadmap from "./sections/Roadmap";
import { Providers } from "./providers";
import { Toaster } from 'react-hot-toast';


function App() {
  const mode = useAppSelector((state) => state.theme.mode);
  const wallet = useAppSelector((state) => state.wallet);
  console.log(wallet, 'APPwallet');


  useEffect(() => {
    document.body.classList.remove("light", "dark");
    document.body.classList.add(mode);
  }, [mode]);


  return (
    <>
      <Providers >
        <Layout>
          <Toaster position="top-right" reverseOrder={false} />
          <About />
          <OurSolutions />
          <Technology />
          <Tokenomics />
          <Roadmap />
        </Layout>
      </Providers>
    </>
  );
}

export default App;
