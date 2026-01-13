import * as data from "../helpers/default_data.json"
import * as main_page from "../locators/main_page.json";
import * as recovery_password_page from "../locators/recovery_password_page.json"
import * as result_page from "../locators/result_page.json"

describe('Проверка авторизации', function () {

    beforeEach('Начало теста', function () {
        cy.visit('/') // Зашли на сайт
        });

    afterEach('Конец теста', function () {
        cy.get(result_page.close).should('be.visible'); // Иконка выхода (крестик) виден пользователю
        });

    it('Верный логин и верный пароль', function () {

        cy.get(main_page.email).type(data.login); // Нашли поле 'Логин' и ввели верный логин
        cy.get(main_page.password).type(data.password); // Нашли поле 'Пароль' и ввели верный пароль
        cy.get(main_page.login_button).click(); // Нашли кнопку 'Войти' и нажали на неё

        cy.get(result_page.title).contains('Авторизация прошла успешно'); // Проверяем текст на совпадение
        cy.get(result_page.title).should('be.visible'); // Проверяем, что текст виден пользователю
        })

    it('Восстановление пароля', function () {

        cy.get(main_page.forgot_pass_btn).click(); // Нашли кнопку 'Забыли пароль?' и нажали на неё

        cy.get(recovery_password_page.email).type('test@test.ru'); // Нашли поле 'Логин' и ввели любой email для восстановления пароля
        cy.get(recovery_password_page.send_button).click(); // Нашли кнопку 'Отправить код' и нажали на неё

        cy.get(result_page.title).contains('Успешно отправили пароль на e-mail'); // Проверяем текст на совпадение
        cy.get(result_page.title).should('be.visible'); // Проверяем, что текст виден пользователю
        })

    it('Верный логин и неверный пароль', function () {

        cy.get(main_page.email).type(data.login); // Нашли поле 'Логин' и ввели верный логин
        cy.get(main_page.password).type('qa_one_love13'); // Нашли поле 'Пароль' и ввели неверный пароль (qa_one_love13)
        cy.get(main_page.login_button).click(); // Нашли кнопку 'Войти' и нажали на неё

        cy.get(result_page.title).contains('Такого логина или пароля нет'); // Проверяем текст на совпадение
        cy.get(result_page.title).should('be.visible'); // Проверяем, что текст виден пользователю
        })

    it('Неверный логин и верный пароль', function () {

        cy.get(main_page.email).type('geerman@dolnikov.ru'); // Нашли поле 'Логин' и ввели неверный логин (geerman@dolnikov.ru)
        cy.get(main_page.password).type(data.password); // Нашли поле 'Пароль' и ввели верный пароль
        cy.get(main_page.login_button).click(); // Нашли кнопку 'Войти' и нажали на неё

        cy.get(result_page.title).contains('Такого логина или пароля нет'); // Проверяем текст на совпадение
        cy.get(result_page.title).should('be.visible'); // Проверяем, что текст виден пользователю
        })

    it('Проверка валидации', function () {

        cy.get(main_page.email).type('germandolnikov.ru'); // Нашли поле 'Логин' и ввели логин без @
        cy.get(main_page.password).type(data.password); // Нашли поле 'Пароль' и ввели верный пароль
        cy.get(main_page.login_button).click(); // Нашли кнопку 'Войти' и нажали на неё

        cy.get(result_page.title).contains('Нужно исправить проблему валидации'); // Проверяем текст на совпадение
        cy.get(result_page.title).should('be.visible'); // Проверяем, что текст виден пользователю
        })

    it('Проверка на приведение к строчным буквам в логине', function () {

        cy.get(main_page.email).type('GerMan@Dolnikov.ru'); // Нашли поле 'Логин' и ввели логин GerMan@Dolnikov.ru
        cy.get(main_page.password).type(data.password); // Нашли поле 'Пароль' и ввели верный пароль
        cy.get(main_page.login_button).click(); // Нашли кнопку 'Войти' и нажали на неё

        cy.get(result_page.title).contains('Авторизация прошла успешно'); // Проверяем текст на совпадение
        cy.get(result_page.title).should('be.visible'); // Проверяем, что текст виден пользователю
        })
    })
