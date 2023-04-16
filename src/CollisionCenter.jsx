import "./collisionCenter.css"
import axios from 'axios';

function CollisionCenter() {

  async function getEmail() {
    try {
      const response = await axios.get('https://hackai-utd.herokuapp.com/get_email/210002');
      console.log(response.data);
      return response.data;
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      } else {
        console.log(`Error: ${err.message}`);
      }
    }
  }
  const generateEmail = (name) => {
    // Generate a fake email based on the collision center name
    const domain = "example.com";
    const email = name.replace(/\s+/g, '-').toLowerCase() + "@" + domain;
    return email;
  }

  return (
    <div className="mainInterface">
      <h1>Collision Center</h1>
      <ul className="collisionCenter">
        <li>
          <div className="title">Texas Collision Center</div>
          <div className="description">
            <img src="/assets/phone.jpg" alt="phone icon" className="icon" />
            (469) 209-6356
            <button className="emailButton">Email</button>
          </div>
        </li>
        <li>
          <div className="title">AutoNation Collision Center Plano</div>
          <div className="description">
            <img src="/assets/phone.jpg" alt="phone icon" className="icon" />
            (972) 465-9587
            <button className="emailButton">Email</button>
          </div>
        </li>
        <li>
          <div className="title">Park Place Bodywerks Plano</div>
          <div className="description">
            <img src="/assets/phone.jpg" alt="phone icon" className="icon" />
            (469) 202-5584
            <button className="emailButton">Email</button>
          </div>
        </li>
      </ul>
    </div>
  )
}
export default CollisionCenter;
