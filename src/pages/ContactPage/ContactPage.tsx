import React, { useEffect, useState } from 'react'
import './ContactPage.css'
import { isValidEmail } from '../../utils/isValidEmail'
import emailjs from 'emailjs-com';


const ContactPage = (): JSX.Element => {
    const [userName, setUserName] = useState<string>('')
    const [userEmail, setUserEmail] = useState<string>('')
    const [userMsg, setUserMsg] = useState<string>('')

    const [isUserNameValid, setIsUserNameValid] = useState<boolean>(true)
    const [isUserEmailValid, setIsUserEmailValid] = useState<boolean>(true)
    const [isUserMsgValid, setIsUserMsgValid] = useState<boolean>(true)

    const [sentMsg, setSentMsg] = useState<boolean>(false)

    useEffect(() => { setIsUserNameValid(true) }, [userName])
    useEffect(() => { setIsUserEmailValid(true) }, [userEmail])
    useEffect(() => { setIsUserMsgValid(true) }, [userMsg])

    const isFormValid = () => {
        let dataValid: boolean = true

        if (userName.length < 2) {
            dataValid = false
            setIsUserNameValid(false)
        }
        if (!isValidEmail(userEmail)) {
            dataValid = false
            setIsUserEmailValid(false)
        }
        if (userMsg.length < 5) {
            dataValid = false
            setIsUserMsgValid(false)
        }
        return dataValid
    }


    const submitBtnHandler = (e: React.SyntheticEvent): void => {
        e.preventDefault()

        console.log(e.target)

        if (!isFormValid()) { return }

        const form: EventTarget = e.target

        // if (process.env.REACT_APP_TO_SERVICE_ID
        //     && process.env.REACT_APP_TO_TEMPLATE_ID
        //     && process.env.REACT_APP_TO_USER_ID
        //     && e.target) {
        //     emailjs.sendForm(process.env.REACT_APP_TO_SERVICE_ID, process.env.REACT_APP_TO_TEMPLATE_ID, form as HTMLFormElement, process.env.REACT_APP_TO_USER_ID)

        //         .then(() => {
        setSentMsg(true)

        setTimeout(() => {
            setSentMsg(false)
        }, 1000)

        setUserName('')
        setUserEmail('')
        setUserMsg('')
        setIsUserNameValid(true)
        setIsUserEmailValid(true)
        setIsUserMsgValid(true)
        // }, (error) => {
        //     console.log(error.text)
        // }
        // )
        // }
    }

    return (
        <div className='contactPage page'>
            <div className='contactPage__cntr'>
                <h1 className='page__title'>
                    Kontakt
                </h1>
                {sentMsg
                    ?
                    <div>
                        <h2 className='contactPage__sent_msg_confirmation'>Twoja wiadomość została wysłana!</h2>
                    </div>
                    :
                    <div className='contactPage__content page__content'>
                        <h2 className='page__content_title'>Formularz kontaktowy</h2>
                        <form className='contactPage__form_cntr'
                            onSubmit={e => submitBtnHandler(e)}>
                            <input className={isUserNameValid ? 'contactPage__form_el' : 'contactPage__form_el_error'}
                                type='text'
                                placeholder='Twoje imię'
                                onChange={e => setUserName(e.target.value)}
                            />
                            {!isUserNameValid
                                &&
                                <p className='contactPage__form_el_errMsg'>Podaj prawidłowe dane / Please enter the correct details</p>}

                            <input className={isUserEmailValid ? 'contactPage__form_el' : 'contactPage__form_el_error'}
                                type='email'
                                placeholder='Twój adres email'
                                onChange={e => setUserEmail(e.target.value)}
                            />
                            {!isUserEmailValid
                                &&
                                <p className='contactPage__form_el_errMsg'>Adres email jest nieprawidlowy / Email is invalid</p>}

                            <textarea className={isUserMsgValid ? 'contactPage__form_el' : 'contactPage__form_el_error'}
                                placeholder='Twoja wiadomość'
                                onChange={e => setUserMsg(e.target.value)}
                            />
                            {!isUserMsgValid
                                &&
                                <p className='contactPage__form_el_errMsg'>Twoja wiadomość musi zawierać przynajmniej 5 znaków / Your message must contain at least 5 characters</p>}

                            <button className='contactPage__form_button'
                                type='submit'
                            >Wyślij</button>
                        </form>
                    </div>
                }
                <div className='contactPage__content page__content'>
                    <h2 className='page__content_title'>Nasze dane</h2>
                    <div className='contactPage__details_el_cntr'>
                        <p className='contactPage__details_el'>
                            Alexa-Web
                        </p>
                        <p className='contactPage__details_el'>
                            Gdynia, PL
                        </p>
                        <div className='contactPage__details_el' style={{ paddingTop: "10px" }}>
                            <span>email: </span>
                            <a href='mailto:info@alexa-web.com?subject=Customer Request'
                                target='_blank'
                                rel='noreferrer'
                            >info@alexa-web.com</a>
                        </div>
                        <div className='contactPage__details_el'>
                            <span>www: </span>
                            <a href='https://alexa-web.com/'>alexa-web.com</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContactPage
