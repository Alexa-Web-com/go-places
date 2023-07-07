import './Footer.css'
import logoAlexaWeb from '../../assets/my_logo/logoAlexaWebTransparent25.png'


const Footer = (): JSX.Element => {
    return (
        <div className='footer'>
            <p>Copyright © 2023 </p>

            <a href='https://alexa-web.com'
                target='_blank'
                rel='noreferrer'
                className='footer_link'
            >
                <img src={logoAlexaWeb} alt='owner logo' className='footer_logo' />
                <p>Alexa-Web.com</p>
            </a>
        </div>
    )
}

export default Footer
