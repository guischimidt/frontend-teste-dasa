import '../../styles/components/layout/footer.sass';
import Logo from '../../../img/logo.png'

function Footer() {
    return (
        <footer className='footer'>
            <div className='footer_logo'>
                <img src={Logo} alt='Dasa' />
            </div>
            <p>
                © Dasa. Todos os direitos reservados. O conteúdo deste website é de uso interno. Proibida a divulgação e reprodução sem a expressa autorização dos proprietários.
            </p>
        </footer>
    )
}

export default Footer;