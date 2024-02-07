import Image from "next/image";
import './page.css'
import Grid from "./Components/Grid";

export default function Home() {
  return (
   <>
   <h1>The Toni</h1>
   <Grid gridLength={5} gridWidth ={5}/>
   </>
  );
}
