import LoginForm from "./loginForm";
import image1 from "../../assets/img/Bard_Generated_Image (1).jpeg";
import image2 from "../../assets/img/Bard_Generated_Image (2).jpeg";
import image3 from "../../assets/img/Bard_Generated_Image (3).jpeg";
import image4 from "../../assets/img/Bard_Generated_Image (4).jpeg";

function loopImages() {
  const listOfImages = [image1, image2, image3, image4];
  const pickRandImage = Math.floor(Math.random() * (listOfImages.length - 1));

  return listOfImages[pickRandImage];
}

export default function AuthForm() {
  return (
    <div className="container">
      <div className="row m-5 p-2">
        <div className="col-6 border  border-1 rounded mx-1 bg-body-secondary">
          <img
            src={loopImages()}
            className="img-fluid rounded "
            alt="..."
          ></img>
        </div>
        <div className="col-4 border  border-1 rounded mx-1 bg-body-secondary ">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
