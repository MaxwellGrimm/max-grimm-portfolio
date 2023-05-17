import "./App.css";
import React, {useState, useRef} from "react";
import { Link } from "react-scroll";
import maxwell from "./assets/max.jpg";
import maxwell1 from "./assets/max1.jpg";
import $ from 'jquery';
import Hamburger from 'hamburger-react'
import {SiLinkedin, SiGithub} from 'react-icons/si';
import {IconContext} from 'react-icons';
import ScrollAnimation from 'react-animate-on-scroll';
import emailjs from '@emailjs/browser';


var words = ['Hi I\'m Max', 'I am a Web/Mobile Developer', 'Welcome to my Profile'],
    part,
    i = 0,
    offset = 0,
    len = words.length,
    forwards = true,
    skip_count = 0,
    skip_delay = 15,
    speed = 70;
var wordflick = function () {
  setInterval(function () {
    if (forwards) {
      if (offset >= words[i].length) {
        ++skip_count;
        if (skip_count == skip_delay) {
          forwards = false;
          skip_count = 0;
        }
      }
    }
    else {
      if (offset == 0) {
        forwards = true;
        i++;
        offset = 0;
        if (i >= len) {
          i = 0;
        }
      }
    }
    part = words[i].substr(0, offset);
    if (skip_count == 0) {
      if (forwards) {
        offset++;
      }
      else {
        offset--;
      }
    }
    $('.word').text(part);
  },speed);
};

$(document).ready(function () {
  wordflick();
});

$(".hamburger").on("click", function(){
  $("#nav").toggleClass('hide');
});

function App() {
  const Projects = {
    masonry: {
      img: 'url("https://i.postimg.cc/zvcpvSZG/Screenshot-2023-05-09-132945.png")',
      link: "https://grimm-masonry.com/",
      text: "masonry text"
    },
    star: {
      img: 'url("https://i.postimg.cc/4Nv1H9CP/Screenshot-2023-05-09-133224.png")',
      link: "https://replit.com/@cs346/Star-Properties-Final-Website#views/pages/signIn.ejs",
      text: "star text"
    }
  }

  const [isFull, setIsFull] = React.useState(false);

  React.useEffect(function () {
    const timeout = setTimeout(function () {
      setIsFull(false);
    }, 1000)

    return function () {
      clearTimeout(timeout)
    }
  }, [isFull])

  function handleClick(e){
    setTimeout(() => {
      setSelectedProject(e);
    }, 1000)
  }

  const[name, setName] = useState('');
  const[email, setEmail] = useState('');
  const[message, setMessage] = useState('');

  const form = useRef();
  const sendEmail = (e) =>{
    e.preventDefault();

    emailjs.sendForm('service_my9hoqb', 'template_jkhxo6h', form.current, '17NE5l31UL8OA0DA9')
      .then((result) => {
          console.log(result.text);
          console.log("message sent");
      }, (error) => {
          console.log(error.text);
      });

      setName('');
      setEmail('');
      setMessage('');
      alert('message sent');
  };

  const [open, setOpen] = React.useState(false);
  const [selectedProject, setSelectedProject] = React.useState();

  return (
    <div id="App">
      <header className="nav">
        <div className="hamburger" id="hamburger" onClick={() => {
          setOpen(!open);
        }}>
          <Hamburger />
        </div>
        <nav className={open ? "open" : null}>
          <ul>
            <li className="hover-underline-animation">
              <Link activeClass="active" smooth spy to="home">
                HOME
              </Link>
            </li>
            <li className="hover-underline-animation ">
              <Link activeClass="active" smooth spy to="about">
                ABOUT
              </Link>
            </li>
            <li className="hover-underline-animation">
              <Link activeClass="active" smooth spy to="projects">
                PROJECTS
              </Link>
            </li>
            <li className="hover-underline-animation">
              <Link activeClass="active" smooth spy to="resume">
                RESUME
              </Link>
            </li>
            <li className="hover-underline-animation">
              <Link activeClass="active" smooth spy to="contact">
                CONTACT ME
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <section id="home">
          <img className="profile-photo" src={maxwell} alt="headshot of me"/>
          <h1 className="head-info word"></h1>
          <ul className="social-links">
            <li><a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/maxwell-grimm-20007b205/"><IconContext.Provider value={{size: '3em', color: 'white'}}><SiLinkedin/></IconContext.Provider></a></li>
            <li><a target="_blank" rel="noopener noreferrer" href="https://github.com/MaxwellGrimm"><IconContext.Provider value={{size: '3em', color: 'white'}}><SiGithub/></IconContext.Provider></a></li>
          </ul>
          <p>Want to discuss a future project with me? Find my contact information at the bottom.</p>
      </section>
      <ScrollAnimation delay={300} animateIn='fadeIn' animateOut='fadeOut'>
        <section id="about">
          <h1 className="section-title">About</h1>
          <img className="graduation-photo" src={maxwell1} alt="birthday"/>
          <p className="about-me-text">I am a recent graduate from the University of Wisconsin Oshkosh. After 4 years of working towards my Bachelors of Science in Computer Science I am finally ready to start this new chapter in my life. I am a very easy going guy who can take critisim very well. I do genuinly enjoy creating splendid UI no matter what coding language however, I do tend to lean towards web technologies. I have interned at the Wisconsin Department of Revenue as a Web Developer and gained a lot of experience and knowledge. I am a very fast learner that puts 110% into whatever I am doing.</p>
        </section>
      </ScrollAnimation>
      
      
      <section id="projects">
        <h1 className="section-title">Projects</h1>
        <p className="projects-text">I have worked with a lot of differnt web development technologies. The one I am most proficient in are HTML, CSS, JS, React, Bootstrap, and Flutter. I have also used PHP, EJS, and Angular to make dynamic pages.</p>
        <div className="project-tabs">
          <ul>
            <li id="masonryLink"
              onClick={() => {handleClick(Projects.masonry); setIsFull(true);}}>Grimm Masonry LLC</li>
            <li id="starLink"
              onClick={() => {handleClick(Projects.star); setIsFull(true);}}>Star Proporties LLC</li>
          </ul>
        </div>
        <div className="slider-container">
          {selectedProject ?
          <a href={selectedProject.link}><div style={{backgroundImage: selectedProject.img}} className={isFull ? "full project-container" : "project-container"}>
          </div></a> 
          : null} 
        </div>
        
      </section>
      <section id="resume">
        <div className="front-end-resume">
          <h1>Frontend Developer</h1>
          <p>I enjoy building projects from design to development. I love creating sites to be proud of.</p>
          <h2 className="resume-title">Languages I Use:</h2>
          <p>HTML, CSS, JavaScript, jQuery, Node.js, PHP, Flutter, EJS</p>
          <h2 className="resume-title">My Development Tools:</h2>
          <ul className="front-end-tools">
            <li>VsCode</li>
            <li>Bootstrap</li>
            <li>Pen & Paper</li>
            <li>Figma</li>
            <li>Github</li>
          </ul>
        </div>
        <div className="professional-experience">
          <h1>Experience</h1>
          <p>I have 1 year of experience as a web developer but I would love to get some more. </p>
          <h2 className="resume-title">Education</h2>
          <h3 className="resume-subtitle">University of Wisconsin Oshkosh</h3>
          <p>Bachelors in Computer Science</p>
          <h2 className="resume-title">Work Experience</h2>
          <h3 className="resume-subtitle">Wisconsin Department of Revenue</h3>
          <ul className="dor-description">
            <li>Designed and developed internal and external web pages using HTML, JavaScript, and CSS</li>
            <li>Developed efficient REST services using Java and SQL</li>
            <li>Styled and formatted pages to match that of the current site using Bootstrap</li>
            <li>Communicated with stakeholders throughout project development, receiving feedback and making
updated given their specifications</li>
          </ul>

        </div>
          <a href="https://drive.google.com/file/d/1KP3ARpNTSrm-cWxbiTQ8dQaVm-WcapWF/view?usp=sharing"><h2 className="resume-link">Click here to view my resume!</h2></a>
      </section>
      <section id="contact">
        <h1>Thanks for taking the time to reach out. How can I help you?</h1>
        <form className="contact-form" ref={form} onSubmit={sendEmail}>
        <div className="small-inputs">
          <div className="small-input">
            <label for="user_name" className="email-label orange">Name</label><br/>
            <input id="email-form" type="text" name="user_name" required maxLength="100" onChange={event => setName(event.target.value)} value={name}></input>
          </div>
          <div className="small-input">
            <label for="user_email" className="email-label orange">Email</label><br/>
            <input id="email-form" type="text" name="user_email" required maxLength="100" onChange={event => setEmail(event.target.value)} value={email}></input>
          </div>
        </div>
          <div>
            <label for="message" className="message-label orange">Message</label><br/>
            <textarea id="message-form" name="message" required maxLength="1024" onChange={event => setMessage(event.target.value)} value={message}></textarea>
          </div>
          <div>
            <input type="submit" className="submit-button"value="Send"/>
          </div>
        </form>
        
      </section>
    </div>
  );
}

export default App;
