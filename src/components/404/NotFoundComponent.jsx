//? REACT
import { useEffect } from "react";

//? BACKGROUND SVGs
import bgWaves from "../../assets/bg-svg/layered-waves-haikei-orange.svg";

//? SASS
import "./NotFoundComponent.scss";

const NotFound = () => {

  useEffect(() => {
    document.body.style.backgroundImage = `url(${bgWaves})`;
  }, []);

  return (
    <span className='notFoundComponentText' style={{color: '#ffffff'}}>4🤔4 Page Not Found</span>
  )
}

export default NotFound