import "../pages/Home/home.css";
import logo from "../assets/Logo Workonnection.png";

type Props = {
  pesquisa: string;
  setPesquisa: (valor: string) => void;
};

export function Topbar({ pesquisa, setPesquisa }: Props) {
  return (
    <div className="topbar">
      <div className="logo">
        <img src={logo} />
      </div>

      <div className="search-bar">
        <input placeholder="Pesquisar" />
      </div>

      <div className="top-icons">
        <i className="fas fa-home"></i>
        <i className="fas fa-bell"></i>
        <i className="fas fa-briefcase"></i>
        <i className="fas fa-users"></i>
        <i className="fas fa-user"></i>
        <i className="fas fa-question-circle"></i>
        <i className="fas fa-info-circle"></i>
        <i className="fas fa-cog"></i>
      </div>
    </div>
  );
}
