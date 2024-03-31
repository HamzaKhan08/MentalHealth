import React from 'react'
import { Link } from 'react-router-dom'


const Footer = () => {
  return (
    <footer>
      <ul className='footer_categories'>
      <li><Link to="/posts/categories/Uncategorize">Uncategorize</Link></li>
       <li><Link to="/posts/categories/MoodDisorders">Mood Disorders</Link></li>
       <li><Link to="/posts/categories/AnxietyDisorders">Anxiety Disorders</Link></li>
       <li><Link to="/posts/categories/PsychoticDisorders">Psychotic Disorders</Link></li>
       <li><Link to="/posts/categories/PersonalityDisorders">Personality Disorders</Link></li>
       <li><Link to="/posts/categories/SubstanceUseDisorders">Substance Use Disorders</Link></li>
      </ul>
      <ul className='footer_categories'>
      <li><Link to="/posts/categories/EatingDisorders">Eating Disorders</Link></li>
      </ul>
      <div className="footer__copyright">
        <small>All Rights Reserved &copy; Copyrights, <Link to="https://hamzaayazkhan.netlify.app">Hamza Ayaz Khan</Link> & <Link to="http://healing-horizons">Healing Horizons</Link></small>
      </div>
    </footer>
  )
}

export default Footer
