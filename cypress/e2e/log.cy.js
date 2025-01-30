import * as data from '../helpers/default_data.json'
import * as main_page from '../locators/main_page.json'
import * as result_page from '../locators/result_page.json'
import * as recovery_password_page from '../locators/recovery_password_page.json'

describe('Проверка авторизации', function () {
  beforeEach('Начало теста', function () {
    cy.visit('https://login.qa.studio'); // Зашли на сайт
    cy.get(main_page.forgot_pass_btn).should('have.css', 'color', 'rgb(0, 85, 152)'); // Проверяю цвет кнопки восст. пароля
      });

  afterEach('Конец теста', function () {
    cy.get(result_page.close).should('be.visible'); // Есть крестик и он виден для пользователя
       });

    it('Верный пароль и верный логин', function () {
      cy.get(main_page.email).type(data.login); // Ввели верный логин
      cy.get(main_page.password).type(data.password); // Ввели верный пароль
      cy.get(main_page.login_button).click(); // Нажал войти
      cy.get(result_page.title).should('be.visible'); // Проверяю, что после авт. вижу текст
      cy.get(result_page.title).contains('Авторизация прошла успешно'); // Текст виден пользователю
    })
    it('Верный логин и неверный пароль', function () {
      cy.get(main_page.email).type(data.login); // Ввели верный логин
      cy.get(main_page.password).type('iLoveqastudio7'); // Ввели неверный пароль
      cy.get(main_page.login_button).click(); // Нажал войти
      cy.get(result_page.title).should('be.visible'); // Текст виден пользователю
      cy.get(result_page.title).contains('Такого логина или пароля нет'); // Проверяю, что после авт. вижу текст
  })
  it('Верный неверный логин и верный пароль', function () {
    cy.get(main_page.email).type('germannn@dolnikov.ru'); // Ввели неверный логин
    cy.get(main_page.password).type(data.password); // Ввели верный пароль
    cy.get(main_page.login_button).click(); // Нажал войти
    cy.get(result_page.title).should('be.visible'); // Текст виден пользователю
    cy.contains('Такого логина или пароля нет').should('be.visible'); // Проверяю, что после авт. вижу текст
})
    it('Валидация на наличие @', function () {
      cy.get(main_page.email).type('germandolnikov.ru'); // Ввели логин без @
      cy.get(main_page.password).type(data.password); // Ввели верный пароль
      cy.get(main_page.login_button).click(); // Нажал войти
      cy.get(result_page.title).should('be.visible'); // Текст виден пользователю
      cy.get(result_page.title).contains('Нужно исправить проблему валидации'); // Проверяю, что после авт. вижу текст
  })
     it('Восстановление пароля', function () {
      cy.get(main_page.forgot_pass_btn).click(); //  Нажимаю восстановить пароль
      cy.get(recovery_password_page.email).type(data.login); // Ввели почту для восстановления пароля
      cy.get(recovery_password_page.send_button).click(); // Нажал отправить код
      cy.get(result_page.title).contains('Успешно отправили пароль на e-mail'); // Проверяю на совпадение текст
      cy.get(result_page.title).should('be.visible'); // Текст виден пользователю
  })   
  it('Приведение строчных букв в логине', function () {
    cy.get(main_page.email).type('GerMAn@dolNIkoV.ru'); // Ввели верный логин разным шрифтом
    cy.get(main_page.password).type(data.password); // Ввели верный пароль
    cy.get(main_page.login_button).click(); // Нажал войти
    cy.get(result_page.title).should('be.visible'); // Проверяю, что после авт. вижу текст
    cy.get(result_page.title).contains('Авторизация прошла успешно'); // Проверяю на совпадение текст  
  })
})

// запуск через теринал: npx cypress run --spec cypress/e2e/poke.cy.js --browser chrome