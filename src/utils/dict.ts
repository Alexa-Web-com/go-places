export const languages: string[] = ['EN', 'PL',]

export const currencies: string[] = ['USD', 'EUR', 'AUD', 'CAD', 'CHF', 'CNY', 'CZK', 'DKK', 'GBP', 'HKD', 'JPY', 'KRW', 'NOK', 'NZD', 'RUB', 'SEK', 'UAH']

interface ILang {
    [key: string]: string
}

interface IDict {
    [key: string]: ILang;
}

export const translate = (phrase: string, lang: string): string => {
    return DICT[lang][phrase] ? DICT[lang][phrase] : phrase
}

export const DICT: IDict = {
    EN: {
        'Back': 'Back',

        'Home': 'Home',
        'Price Comparision': 'Price Comparision',
        'Contact': 'Contact',
        'Choose a location': 'Choose a location',

        'Cost of living and prices for cities around the world, prices of food, rent, shopping etc.': 'Cost of living and prices for cities around the world, prices of food, rent, shopping etc.',
        'Countires': 'Countires',

        'Cities': 'Cities',

        'Prices': 'Prices',

        'Buy Apartment': 'Buy Apartment',
        'Childcare': 'Childcare',
        'Clothing And Shoes': 'Clothing And Shoes',
        'Markets': 'Markets',
        'Rent Per Month': 'Rent Per Month',
        'Restaurants': 'Restaurants',
        'Salaries And Financing': 'Salaries And Financing',
        'Sports And Leisure': 'Sports And Leisure',
        'Transportation': 'Transportation',
        'Utilities Per Month': 'Utilities Per Month',
        'local currency': 'local currency',
        'default currency': 'default currency',
    },
    PL: {
        'Back': 'Wstecz',

        'Home': 'Główna',
        'Price Comparision': 'Porównanie cen',
        'Contact': 'Kontakt',
        'Choose a location': 'Wybierz lokalizację',

        'Cost of living and prices for cities around the world, prices of food, rent, shopping etc.': 'Koszty życia i ceny w miastach na całym świecie, ceny żywności, wynajmu, zakupów itp.',
        'Countires': 'Kraje',

        'Cities': 'Miasta',

        'Prices': 'Ceny',

        'Buy Apartment': 'Zakup mieszkania',
        'Childcare': 'Opieka nad dziećmi',
        'Clothing And Shoes': 'Odzież i obuwie',
        'Markets': 'Targi i rynki',
        'Rent Per Month': 'Czynsz miesięczny',
        'Restaurants': 'Restauracje',
        'Salaries And Financing': 'Wynagrodzenia i finanse',
        'Sports And Leisure': 'Sport i rekreacja',
        'Transportation': 'Transport',
        'Utilities Per Month': 'Usługi publiczne miesięcznie',
        'local currency': 'lokalna waluta',
        'default currency': 'domyślna waluta',
    },

}