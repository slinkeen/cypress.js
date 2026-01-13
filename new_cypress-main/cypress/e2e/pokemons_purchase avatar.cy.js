describe('Покупка нового аватара в Покемонах', function () {

   it('Покупка нового аватара', function () {
        cy.visit('https://pokemonbattle.ru/login'); // Заходим на сайт
        cy.get('#k_email').type('Login'); // Нашли поле 'Логин' и ввели верный логин
        cy.get('#k_password').type('Password'); // Нашли поле 'Пароль' и ввели верный пароль

        cy.wait(2000); // Подождать, пока кнопка 'Войти' станет доступной

        cy.get('.MuiButton-root').click(); // Нашли кнопку 'Войти' и нажали на неё

        cy.wait(2000); // Подожать, пока клиент отрисует страницу

        cy.get('.header_card_trainer_id_num').click(); // Найти кнопку 'Профиль тренера' и кликнуть по ней
        cy.get('[data-qa="shop"] > .k_trainer_in_button_wrapper > .k_trainer_in_button_title_no_desc').click(); // Найти кнопку 'Смена аватара' и кликнуть по ней 

        cy.get('.available > button').first().click();   // Находим первый доступный аватар и кликаем 'Купить'
      
        cy.get('.card_number').type('4620869113632996'); // Вводим номер карты

        cy.wait(1000); // Подождать заполнение формы
        cy.get('.card_csv').type('125'); // Вводим CVV карты

        cy.wait(1000); // Подождать заполнение формы
        cy.get('.card_date').type('1227'); // Вводим срок действия карты

        cy.wait(1000); // Подождать заполнение формы
        cy.get('.card_name').type('NAME'); // Вводим имя владельца карты

        cy.get('.style_1_base_button_payment_body > .style_1_base_button_payment').click();     // Нажимаем кнопку 'Оплатить'
        cy.get('.threeds_number').type('56456');                            // Вводим код подтверждения СМС
        cy.get('.style_1_base_button_payment_body > .style_1_base_button_payment').click();   // Нажимаем кнопку 'Оплатить'
        cy.contains('Покупка прошла успешно').should('be.visible');     // Проверяем наличие и видимость сообщения об успешной покупке
    })
})   