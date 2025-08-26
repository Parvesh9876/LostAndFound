import { Carousel } from "react-bootstrap";
import img1 from '../assets/firstimg.jpg';
import '../css/slider.css';

function Slider() {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100 carousel-img"
          src={img1}
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>Welcome to Lost & Found</h3>
          <p>Helping you find what’s lost and return what’s found.</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100 carousel-img"
          src={img1}
          alt="Second slide"
        />
        <Carousel.Caption>
          <h3>Post Lost Items</h3>
          <p>Quickly post and track your lost items securely.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Slider;
