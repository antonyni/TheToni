import Image from "next/image";
import './page.css'
import Grid from "./Components/Grid";
import Block from "./Components/Block";
const Home = () => {

  return (
    <>
      <h1>The Toni</h1>
      <div style = {{display:"flex"}}>
        <Grid gridLength={5} gridWidth={9} />
        <div>
        <h1>clues</h1>
        <h2>down</h2>
        <p>2. A song by Jimmy Brown</p>
        <p>3." __ love is mine all mine" </p>
        <h2>across</h2>
        <p>1. My Cousin</p>
        <p>5. Yu__e</p>
        <p>4. ___ & Me</p>
        <p>6. 3rd Century Roman Saint</p>
        </div>
        

      </div>
    </>
  );
}


export default Home;