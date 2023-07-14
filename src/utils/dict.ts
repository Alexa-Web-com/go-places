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
        'Price Comparison': 'Price Comparison',
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

        'Compare': 'Compare',
        'Total costs:': 'Total costs:',


        'Your message has been sent!': 'Your message has been sent!',
        'Contact form': 'Contact form',
        'Your name': 'Your name',
        'Your email address': 'Your email address',
        'Your message': 'Your message',
        'Please enter the correct details': 'Please enter the correct details',
        'Email address is invalid': 'Email address is invalid',
        'Your message must contain at least 5 characters': 'Your message must contain at least 5 characters',
        'Our details': 'Our details',
        'Send': 'Send',

        'Meal in Inexpensive Restaurant': 'Meal in Inexpensive Restaurant',
        'Meal for 2 People, Mid-range Restaurant, Three-course': 'Meal for 2 People, Mid-range Restaurant, Three-course',
        'McMeal at McDonalds or Alternative Combo Meal': 'McMeal at McDonalds or Alternative Combo Meal',
        'Domestic Beer, 0.5 liter Draught': 'Domestic Beer, 0.5 liter Draught',
        'Imported Beer, 0.33 liter Bottle': 'Imported Beer, 0.33 liter Bottle',
        'Cappuccino': 'Cappuccino',
        'Coca-Cola, 0.33 liter Bottle': 'Coca-Cola, 0.33 liter Bottle',
        'Water, 0.33 liter Bottle': 'Water, 0.33 liter Bottle',
        'Milk, Regular,1 liter': 'Milk, Regular,1 liter',
        'Loaf of Fresh White Bread, 0.5 kg': 'Loaf of Fresh White Bread, 0.5 kg',
        'White Rice, 1 kg': 'White Rice, 1 kg',
        'Eggs, 12 pack': 'Eggs, 12 pack',
        'Local Cheese, 1 kg': 'Local Cheese, 1 kg',
        'Chicken Breasts, Boneless and Skinless, 1 kg': 'Chicken Breasts, Boneless and Skinless, 1 kg',
        'Beef Round or Equivalent Back Leg Red Meat, 1 kg': 'Beef Round or Equivalent Back Leg Red Meat, 1 kg',
        'Apples, 1 kg': 'Apples, 1 kg',
        'Banana, 1 kg': 'Banana, 1 kg',
        'Oranges, 1 kg': 'Oranges, 1 kg',
        'Tomato, 1 kg': 'Tomato, 1 kg',
        'Potato, 1 kg': 'Potato, 1 kg',
        'Onion, 1 kg': 'Onion, 1 kg',
        'Lettuce, 1 head': 'Lettuce, 1 head',
        'Water, 1.5 liter Bottle': 'Water, 1.5 liter Bottle',
        'Bottle of Wine, Mid-Range Price': 'Bottle of Wine, Mid-Range Price',
        'Domestic Beer, 0.5 liter Bottle': 'Domestic Beer, 0.5 liter Bottle',
        'Pack of Cigarettes': 'Pack of Cigarettes',
        'One-way Ticket, Local Transport': 'One-way Ticket, Local Transport',
        'Monthly Pass, Regular Price': 'Monthly Pass, Regular Price',
        'Taxi Start, Normal Tariff': 'Taxi Start, Normal Tariff',
        'Taxi, price for 1 km, Normal Tariff': 'Taxi, price for 1 km, Normal Tariff',
        'Taxi, price for 1 hour Waiting, Normal Tariff': 'Taxi, price for 1 hour Waiting, Normal Tariff',
        'Gasoline, 1 liter': 'Gasoline, 1 liter',
        'Volkswagen Golf 1.4 90 KW Trendline (Or Equivalent New Car)': 'Volkswagen Golf 1.4 90 KW Trendline (Or Equivalent New Car)',
        'Honda Civic 1.6 Or Alternative New Car': 'Honda Civic 1.6 Or Alternative New Car',
        'Basic utilities for 85 square meter Apartment including Electricity, Heating or Cooling, Water and Garbage': 'Basic utilities for 85 square meter Apartment including Electricity, Heating or Cooling, Water and Garbage',
        'Prepaid Mobile Tariff Local, price per 1 min, No Discounts or Plans': 'Prepaid Mobile Tariff Local, price per 1 min, No Discounts or Plans',
        'Internet, 60 Mbps or More, Unlimited Data, Cable/ADSL': 'Internet, 60 Mbps or More, Unlimited Data, Cable/ADSL',
        'Fitness Club, Monthly Fee for 1 Adult': 'Fitness Club, Monthly Fee for 1 Adult',
        'Tennis Court Rent, 1 Hour on Weekend': 'Tennis Court Rent, 1 Hour on Weekend',
        'Cinema ticket, 1 Seat': 'Cinema ticket, 1 Seat',
        'Average Monthly Net Salary, After Tax': 'Average Monthly Net Salary, After Tax',
        'Mortgage Interest Rate in Percentages for 20 Years Fixed-Rate, Yearly, Fixed-Rate': 'Mortgage Interest Rate in Percentages for 20 Years Fixed-Rate, Yearly, Fixed-Rate',
        'Private Preschool or Kindergarten, Monthly for 1 Child': 'Private Preschool or Kindergarten, Monthly for 1 Child',
        'International Primary School, Yearly for 1 Child': 'International Primary School, Yearly for 1 Child',
        'Pair of Jeans in a Chain Store Like George, H&M, Zara, etc.': 'Pair of Jeans in a Chain Store Like George, H&M, Zara, etc.',
        'Summer Dress in a Chain Store Like George, H&M, Zara, etc.': 'Summer Dress in a Chain Store Like George, H&M, Zara, etc.',
        'Pair of Running Shoes, Mid-Range Price': 'Pair of Running Shoes, Mid-Range Price',
        'Pair of Leather Business Shoes': 'Pair of Leather Business Shoes',
        'One bedroom apartment in city centre': 'One bedroom apartment in city centre',
        'One bedroom apartment outside of city centre': 'One bedroom apartment outside of city centre',
        'Three bedroom apartment in city centre': 'Three bedroom apartment in city centre',
        'Three bedroom apartment outside of city centre': 'Three bedroom apartment outside of city centre',
        'Price per square meter to Buy Apartment in City Center': 'Price per m2 to Buy Apartment in City Center',
        'Price per square meter to Buy Apartment Outside of City Center': 'Price per m2 to Buy Apartment Outside of City Center',
    },
    PL: {
        'Back': 'Wstecz',

        'Home': 'Główna',
        'Price Comparison': 'Porównanie cen',
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

        'Compare': 'Porównaj',
        'Total costs:': 'Koszty ogółem:',

        'Your message has been sent!': 'Twoja wiadomość została wysłana!',
        'Contact form': 'Formularz kontaktowy',
        'Your name': 'Twoje imię',
        'Your email address': 'Twoj adres email',
        'Your message': 'Twoja wiadomość',
        'Please enter the correct details': 'Podaj prawidłowe dane',
        'Email address is invalid': 'Adres email jest nieprawidlowy',
        'Your message must contain at least 5 characters': 'Twoja wiadomość musi zawierać przynajmniej 5 znaków',
        'Our details': 'Nasze dane',
        'Send': 'Wyślij',

        'Meal in Inexpensive Restaurant': 'Posiłek w niedrogiej restauracji',
        'Meal for 2 People, Mid-range Restaurant, Three-course': 'Posiłek dla 2 osób, restauracja średniej klasy, trzydaniowy',
        'McMeal at McDonalds or Alternative Combo Meal': "McMeal w McDonald's lub alternatywny zestaw",
        'Domestic Beer, 0.5 liter Draught': 'Piwo krajowe, 0,5 litra, beczka',
        'Imported Beer, 0.33 liter Bottle': 'Piwo importowane, 0,33 litra, butelka',
        'Cappuccino': 'Cappuccino',
        'Coca-Cola, 0.33 liter Bottle': 'Coca-Cola, 0,33 litra, butelka',
        'Water, 0.33 liter Bottle': 'Woda, 0,33 litra, butelka',
        'Milk, Regular,1 liter': 'Mleko, zwyczajne, 1 litr',
        'Loaf of Fresh White Bread, 0.5 kg': 'Bochenek świeżego białego chleba, 0,5 kg',
        'White Rice, 1 kg': 'Biały ryż, 1 kg',
        'Eggs, 12 pack': 'Jajka, 12 sztuk',
        'Local Cheese, 1 kg': 'Lokalny ser, 1 kg',
        'Chicken Breasts, Boneless and Skinless, 1 kg': 'Piersi z kurczaka, bez kości i skóry, 1 kg',
        'Beef Round or Equivalent Back Leg Red Meat, 1 kg': 'Wołowina z udźca lub równoważne czerwone mięso, 1 kg',
        'Beef Round or Equivalent Back Leg Red Meat, 1 kg ': 'Wołowina z udźca lub równoważne czerwone mięso, 1 kg',
        'Apples, 1 kg': 'Jabłka, 1 kg',
        'Banana, 1 kg': 'Banan, 1 kg',
        'Oranges, 1 kg': 'Pomarańcze, 1 kg',
        'Tomato, 1 kg': 'Pomidor, 1 kg',
        'Potato, 1 kg': 'Ziemniak, 1 kg',
        'Onion, 1 kg': 'Cebula, 1 kg',
        'Lettuce, 1 head': 'Sałata, 1 główka',
        'Water, 1.5 liter Bottle': 'Woda, 1,5 litra, butelka',
        'Bottle of Wine, Mid-Range Price': 'Butelka wina, średniej ceny',
        'Domestic Beer, 0.5 liter Bottle': 'Piwo krajowe, 0,5 litra, butelka',
        'Pack of Cigarettes': 'Paczka papierosów',
        'One-way Ticket, Local Transport': 'Bilet w jedną stronę, transport lokalny',
        'Monthly Pass, Regular Price': 'Miesięczna karta, normalna cena',
        'Taxi Start, Normal Tariff': 'Opłata początkowa taksówki, normalny taryfikator',
        'Taxi, price for 1 km, Normal Tariff': 'Taksówka, cena za 1 km, normalny taryfikator',
        'Taxi, price for 1 hour Waiting, Normal Tariff': 'Taksówka, cena za 1 godzinę oczekiwania, normalny taryfikator',
        'Gasoline, 1 liter': 'Benzyna, 1 litr',
        'Volkswagen Golf 1.4 90 KW Trendline (Or Equivalent New Car)': 'Volkswagen Golf 1.4 90 KW Trendline (lub równoważny nowy samochód)',
        'Honda Civic 1.6 Or Alternative New Car': 'Honda Civic 1.6 (lub równoważny nowy samochód)',
        'Basic utilities for 85 square meter Apartment including Electricity, Heating or Cooling, Water and Garbage': 'Podstawowe media dla mieszkania o powierzchni 85 metrów kwadratowych, w tym prąd, ogrzewanie lub chłodzenie, woda i śmieci',
        'Prepaid Mobile Tariff Local, price per 1 min, No Discounts or Plans': 'Opłata za usługę telefoniczną na kartę, lokalna, cena za 1 minutę, bez zniżek ani planów',
        'Internet, 60 Mbps or More, Unlimited Data, Cable/ADSL': 'Internet, 60 Mbps lub więcej, nielimitowane dane, kabel/ADSL',
        'Fitness Club, Monthly Fee for 1 Adult': 'Klub fitness, miesięczna opłata dla 1 dorosłej osoby',
        'Tennis Court Rent, 1 Hour on Weekend': 'Wynajem kortu tenisowego, 1 godzina w weekend',
        'Cinema ticket, 1 Seat': 'Bilet do kina, 1 miejsce',
        'Average Monthly Net Salary, After Tax': 'Średnie miesięczne wynagrodzenie netto, po opodatkowaniu',
        'Mortgage Interest Rate in Percentages for 20 Years Fixed-Rate, Yearly, Fixed-Rate': 'Stopa procentowa kredytu hipotecznego na 20 lat, roczna, o stałym oprocentowaniu',
        'Private Preschool or Kindergarten, Monthly for 1 Child': 'Prywatne przedszkole lub żłobek, miesięczna opłata za 1 dziecko',
        'International Primary School, Yearly for 1 Child': 'Międzynarodowa szkoła podstawowa, roczna opłata za 1 dziecko',
        'Pair of Jeans in a Chain Store Like George, H&M, Zara, etc.': 'Para jeansów w sklepie sieciowym takim jak George, H&M, Zara, itp.',
        'Summer Dress in a Chain Store Like George, H&M, Zara, etc.': 'Letnia sukienka w sklepie sieciowym takim jak George, H&M, Zara, itp.',
        'Pair of Running Shoes, Mid-Range Price': 'Para butów do biegania, cena średnia',
        'Pair of Leather Business Shoes': 'Para skórzanych butów biznesowych',
        'One bedroom apartment in city centre': 'Mieszkanie jednopokojowe w centrum miasta',
        'One bedroom apartment outside of city centre': 'Mieszkanie jednopokojowe poza centrum miasta',
        'Three bedroom apartment in city centre': 'Mieszkanie trzypokojowe w centrum miasta',
        'Three bedroom apartment outside of city centre': 'Mieszkanie trzypokojowe poza centrum miasta',
        'Price per square meter to Buy Apartment in City Center': 'Cena za metr kwadratowy kupna mieszkania w centrum miasta',
        'Price per square meter to Buy Apartment Outside of City Center': 'Cena za metr kwadratowy kupna mieszkania poza centrum miasta',
    },

}