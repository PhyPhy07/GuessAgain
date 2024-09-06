import React, { useState } from 'react';
import { Button, Drawer as AntDrawer } from 'antd';
import eightBallImage from '../images/eightBall.png';
import '../components/LoginDrawer.css';


const LoginDrawer = ({ user, onChange, onSubmit, onLogin, onLogout, isLoggedIn }) => {
  const [open, setOpen] = useState(false);

  const handleLoginClick = (event) => {
    event.preventDefault();
    console.log('Login button clicked');
    onLogin();
  };



const handleLogoutClick = async (event) => {
  event.preventDefault();
  console.log('Logout button clicked');
  await onLogout();
  window.location.href = '/'; // Redirect to the starting page
};

  const showDrawer = () => setOpen(true);
  const onClose = () => setOpen(false);

  const shake = () => {
    const ball = document.getElementById('ball');
    const messageText = document.getElementById('message');
    
    // Remove previous message if it exists
    if (messageText) {
      messageText.remove();
    }

    // Shake the ball
    ball.classList.add('shake');
    setTimeout(() => ball.classList.remove('shake'), 1500);

    // Get and display a new fortune
    setTimeout(getFortune, 1500);
  };

  const getFortune = () => {
    const fortunes = [
      "Take On Me - a-ha", "Tainted Love - Soft Cell", "I'm Too Sexy - Right Said Fred",
      "Macarena - Los Del Rio", "Gangnam Style - Psy", "Mambo No. 5 - Lou Bega",
      "Bitter Sweet Symphony - The Verve", "Ice Ice Baby - Vanilla Ice", "Achy Breaky Heart - Billy Ray Cyrus",
      "Who Let the Dogs Out - Baha Men", "You Get What You Give - New Radicals", "Barbie Girl - Aqua",
      "Steal My Sunshine - Len", "Walking on Sunshine - Katrina and the Waves", "Don't You (Forget About Me) - Simple Minds",
      "I Want Candy - Bow Wow Wow", "Tubthumping - Chumbawamba", "Everything Is Awesome - Tegan and Sara",
      "What Is Love - Haddaway", "Dancing in the Moonlight - Toploader", "Come on Eileen - Dexys Midnight Runners",
      "The Safety Dance - Men Without Hats", "Major Tom (Coming Home) - Peter Schilling", "She's So High - Tal Bachman",
      "I'm Gonna Be (500 Miles) - The Proclaimers", "No Rain - Blind Melon", "Creep - Radiohead",
      "Nothing Compares 2 U - Sinéad O'Connor", "Spice Up Your Life - Spice Girls", "The Wild Boys - Duran Duran",
      "Funky Town - Lipps Inc.", "The Sign - Ace of Base", "I Touch Myself - Divinyls",
      "How Bizarre - OMC", "Don't Speak - No Doubt", "Torn - Natalie Imbruglia",
      "Unbelievable - EMF", "Groove Is in the Heart - Deee-Lite", "I Want You Back - The Jackson 5",
      "Bust A Move - Young MC", "Bizarre Love Triangle - New Order", "Pump Up The Jam - Technotronic",
      "Wake Me Up Before You Go-Go - Wham!", "Lump - The Presidents of the United States of America",
      "Kiss Me - Sixpence None the Richer", "Beautiful - Christina Aguilera", "More Than Words - Extreme",
      "Witch Doctor - David Seville", "Sugar Sugar - The Archies", "Macarena (Bayside Boys Remix) - Los Del Rio",
    ];

    const fortune = fortunes[Math.floor(Math.random() * fortunes.length)];
    const parent = document.getElementById('fortune');
    const newMessage = document.createElement('div');
    newMessage.setAttribute('id', 'message');
    newMessage.innerHTML = `"${fortune}"`;
    parent.appendChild(newMessage);
  };

  return (
    <>
      <Button type="primary" onClick={showDrawer} style={{ position: 'absolute', top: 0, right: 0 }}>
        Click ME!
      </Button>
      <AntDrawer
        title="Ask Yourself: Am I Shane? If not, then login isn't for you!"
        placement="right"
        onClose={onClose}
        open={open}
        footer={
          <div style={{ textAlign: 'right' }}>
            <Button onClick={onClose}>Close</Button>
          </div>
        }
      >
        <form onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="Add Player"
            name="Player"
            value={user.Player || ''}
            onChange={onChange}
            style={{ marginBottom: '10px', padding: '5px' }}
          />
          <Button type="primary" htmlType="submit" style={{ marginRight: '10px' }}>
            Add Player
          </Button>
        </form>
        <Button type="default" onClick={handleLoginClick} style={{ marginTop: '10px' }}>
          Login
        </Button>
        {isLoggedIn && (
          <Button type="default" onClick={handleLogoutClick} style={{ marginTop: '10px' }}>
            Logout
          </Button>
        )}
        <div className="center">
          <h1>Go Ahead, Shake it!</h1>
          <h2>*then spend the next 5 minutes debating internally on whether this song suits your personality*</h2>
          <Button className="btn btn-primary" onClick={shake}>SHAKE ME!</Button>
        </div>
        <div className="row">
          <img id="ball" src={eightBallImage} alt="Magic 8 Ball" />
          <div id="fortune"></div>
        </div>
      </AntDrawer>
    </>
  );
};

export default LoginDrawer;



