import React, { useEffect, useState } from 'react'
import './ContactPage.css'
import { isValidEmail } from '../../utils/isValidEmail'
import emailjs from 'emailjs-com';
import { translate } from '../../utils/dict';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';


const ContactPage = (): JSX.Element => {

    const lang: string = useSelector((state: RootState) => state.lang.langState)

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

        if
            (process.env.REACT_APP_TO_SERVICE_ID
            && process.env.REACT_APP_TO_TEMPLATE_ID
            && process.env.REACT_APP_TO_USER_ID
            && e.target) {
            emailjs.sendForm(process.env.REACT_APP_TO_SERVICE_ID, process.env.REACT_APP_TO_TEMPLATE_ID, form as HTMLFormElement, process.env.REACT_APP_TO_USER_ID)

                .then(() => {
                    setSentMsg(true)

                    setTimeout(() => {
                        setSentMsg(false)
                    }, 1200)

                    setUserName('')
                    setUserEmail('')
                    setUserMsg('')
                    setIsUserNameValid(true)
                    setIsUserEmailValid(true)
                    setIsUserMsgValid(true)
                }, (error) => {
                    console.log(error.text)
                }
                )
        }
    }


    return (
        <div className='contactPage page'>
            <div className='contactPage__cntr'>
                <h1 className='page__title'>
                    {translate('Contact', lang)}
                </h1>
                {sentMsg
                    ?
                    <div>
                        <h2 className='contactPage__sent_msg_confirmation'>{translate('Your message has been sent!', lang)}</h2>
                    </div>
                    :
                    <div className='contactPage__content page__content'>
                        <h2 className='page__content_title'>{translate('Contact form', lang)}</h2>
                        <form className='contactPage__form_cntr'
                            name='contact'
                            onSubmit={e => submitBtnHandler(e)}>
                            <input className={isUserNameValid ? 'contactPage__form_el' : 'contactPage__form_el_error'}
                                type='text'
                                placeholder={translate('Your name', lang)}
                                onChange={e => setUserName(e.target.value)}
                                name='name'
                            />
                            {!isUserNameValid
                                &&
                                <p className='contactPage__form_el_errMsg'>{translate('Please enter the correct details', lang)}</p>}

                            <input className={isUserEmailValid ? 'contactPage__form_el' : 'contactPage__form_el_error'}
                                type='email'
                                placeholder={translate('Your email address', lang)}
                                onChange={e => setUserEmail(e.target.value)}
                                name='email'
                            />
                            {!isUserEmailValid
                                &&
                                <p className='contactPage__form_el_errMsg'>{translate('Email address is invalid', lang)}</p>}

                            <textarea className={isUserMsgValid ? 'contactPage__form_el' : 'contactPage__form_el_error'}
                                placeholder={translate('Your message', lang)}
                                onChange={e => setUserMsg(e.target.value)}
                                name='message'
                            />
                            {!isUserMsgValid
                                &&
                                <p className='contactPage__form_el_errMsg'>{translate('Your message must contain at least 5 characters', lang)}</p>}

                            <input type='hidden' name="page" value="GoPlaces" ></input>
                            <button className='contactPage__form_button'
                                type='submit'
                            >{translate('Send', lang)}</button>
                        </form>
                    </div>
                }
                <div className='contactPage__content page__content'>
                    <h2 className='page__content_title'>{translate('Our details', lang)}</h2>
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
