//? CUSTOM COMPONENTS
import NavBar from "../../components/navBar/NavBar";

//? SASS
import "./NotFound.scss";

const NotFound = () => {

  return (
    <>
      <NavBar />
      <span className="notFoundComponentText" style={{ color: "#ffffff" }}>
        4🤔4 Page Not Found
      </span>
    </>
  );
};

export default NotFound;
