import { Link } from 'react-router-dom';
import '../styles/style.css';
import '../styles/Footer.css';

function Footer() {
  return (
    <footer>
      <div id="footer">
        <div className="left25">
          <small>
            <ul>
              <li>
                <Link to="/disclaimer">Disclaimer</Link>
              </li>
              <li>
                <Link to="/sitemap">Sitemap</Link>
              </li>
            </ul>
          </small>
        </div>
        <div className="right25">
          <p>&copy; {new Date().getFullYear()} Ford Runners Club</p><br />
        </div>
      </div>
    </footer>
  );
}

export default Footer;