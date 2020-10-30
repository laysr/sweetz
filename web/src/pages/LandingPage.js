import landingPage from '../assets/landing-page.png';
import '../styles/landingPage.css';

function LandingPage() {
  return (
    <div className='LandingPage'>
      <div className='main'>
        <header className='App-header'>
          <div className='botoes'>
            <button className="btn cadastrar">Cadastrar</button>
            <button className="btn login">Login</button>
          </div>
          <img src={landingPage} className='App-logo' alt='logo' />
        </header>
        <body>
          <div className='content'>
            <p>
              Crie uma conta para salvar seus produtos ou clique no botão
              abaixo para apenas calcular seus custos:
            </p>
            <button>Calcular custos</button>
          </div>
        </body>
      </div>
    </div>
  );
}

export default LandingPage;
