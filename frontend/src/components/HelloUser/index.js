//Styles
import './HelloUser.css';

const HelloUser = () => {
  let name = '';
  if (document.cookie) {
    name = JSON.parse(document.cookie.split('=')[1]).name;
  } else {
    name = JSON.parse(localStorage.getItem('user_info')).name;
  }
  return <div className="helloMsg">Hello {name}!</div>;
};

export default HelloUser;
