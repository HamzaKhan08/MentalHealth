import React, { useState, useContext } from 'react' //useState एक React हुक है जो React कंपोनेंट में स्थिति (state) को रखने के लिए उपयोग होता है। इसका उपयोग किसी भी स्थिति को प्रतिस्थापित करने और उसे अपडेट करने के लिए किया जाता है।
// useContext एक और React हुक है जो कंपोनेंट्स के बीच में डेटा को साझा करने के लिए उपयोग होता है। यह विशिष्ट कंपोनेंट से उपयोगकर्ता की सत्ता तक पहुंचने में मदद करता है, जिससे विशेष कंपोनेंट्स उस सत्ता को उपयोग कर सकते हैं।
import { Link } from 'react-router-dom';
import logo from '../images/logo/logo.jpeg';
import { FaBarsStaggered } from "react-icons/fa6";
import { AiOutlineCloseSquare } from "react-icons/ai";
import { UserContext } from '../context/userContext';   

const Header = () => {   // header component
  
  const [isNavShowing, setIsNavShowing] = useState(window.innerWidth > 800 ? true : false);  // State to track whether the navigation is showing or not
  const {currentUser} = useContext(UserContext)  // Accessing current user information using useContext from UserContext


  const closeNavHandler = () => {    // Function to handle closing the navigation based on window width/size
    if(window.innerWidth < 800 ) {   // agar window ki size 800px se kam hogi then Navshowing will be false else true
      setIsNavShowing(false);
    } else {
      setIsNavShowing(true);
    }
  }

  return (
    <nav>
      <div className="container nav__container">
        <Link to="/" className='nav__logo' onClick={closeNavHandler}>
        <img src={logo} alt='nav logo' />
          </Link>
          {currentUser?.id && isNavShowing && <ul className="nav__menu">   {/* Conditional rendering of navigation menu based on the existence of currentUser */}
            <li><Link to={`/profile/${currentUser.id}`} onClick={closeNavHandler}>{currentUser?.name}</Link></li>
            <li><Link to="/create" onClick={closeNavHandler}>Create Post</Link></li>
            <li><Link to="/authors" onClick={closeNavHandler}>Authors</Link></li>
            <li><Link to="/logout" onClick={closeNavHandler}>Logout</Link></li>
          </ul>}
          {!currentUser?.id && isNavShowing && <ul className="nav__menu">
            <li><Link to="/login" onClick={closeNavHandler}>Login</Link></li>
            <li><Link to="/register" onClick={closeNavHandler}>Sign Up</Link></li>
            <li></li>
          </ul>}
          <button className='nav__toggle-btn' onClick={() => setIsNavShowing(!isNavShowing)}>    {/* Toggle button to show/hide navigation */}
            {
              isNavShowing ? <AiOutlineCloseSquare /> : <FaBarsStaggered />
            }
          </button>
      </div>
    </nav>
  )
}

export default Header
