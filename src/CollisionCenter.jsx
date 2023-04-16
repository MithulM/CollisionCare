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

  return (
    <div className="mainInterface">
      <h1>Collision Center</h1>
      <ul className="collisionCenter">
        <li>
          <div className="title">Collision Center 1</div>
          <div className="description">Description of Collision Center 1 goes here</div>
        </li>
        <li>
          <div className="title">Collision Center 2</div>
          <div className="description">Description of Collision Center 2 goes here</div>
        </li>
        <li>
          <div className="title">Collision Center 3</div>
          <div className="description">Description of Collision Center 3 goes here</div>
        </li>
      </ul>
    </div>
  )
}

export default CollisionCenter;
