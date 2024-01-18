import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate()
  return (
    <div>
      <a href="#" onClick={() => navigate('/')} className="link-info">Accounts</a>
    </div>
  )
}

export default Header;
