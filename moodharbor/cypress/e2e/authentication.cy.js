const { redirect } = require("react-router-dom");
import Chance from 'chance';
const chance = new Chance();


describe('User Login', () => {
  // create random user details for the test
  const username1 = chance.name();
  const email1 = chance.email();
  let password1 = chance.word({ length: 7 });
  password1 = password1 + 'A1a@';

  //login with known user details
  // const username = "Ina Roy"
  // const email = "inaRo@email.com"
  // const password = "admin123?Q"; //chance.word + chance.integer({ min: 0, max: 10 });


  it('should register a new user', () => {
    cy.visit('http://localhost:5173/register');
    cy.get('input[name="username"]').type(username1);
    cy.get('input[name="email"]').type(email1);
    cy.get('input[name="password"]').type(password1);
    cy.get('button[type="submit"]').click();
    cy.contains('.success-message', 'Registered successfully!').should('be.visible');

    cy.url().should('include', '/');
  }
  );

  //block unauthenticated users
  it('blocks unauthenticated users', () => {
    cy.visit('http://localhost:5173/home');
    cy.url().should('include', '/');
    cy.contains('You must log in first!').should('be.visible');

  });

  it('should login a registered user', () => {
    cy.visit('http://localhost:5173/');
    cy.get('input[name="username"]').type(`${username1}{enter}`);
    cy.wait(1000);
    cy.get('input[name="password"]').type(`${password1}{enter}`);
    
    cy.get('button[type="submit"]').click();
    cy.contains('.success-message', 'Logged in successfully!').should('be.visible');
    cy.wait(1000);
    // check that it redirects to the home page
    cy.url().should('include', '/home');
    cy.contains('Your Daily Refresh Quote');
    cy.wait(2000);
    cy.contains('HOW DO YOU FEEL?');
    cy.contains('DESIRED MOOD?');
    cy.wait(2000);
    cy.contains('WHAT HAVE YOU BEEN UP TO?');
    cy.contains('Date');

    cy.get('#login').should('not.exist');
    cy.get('#register').should('not.exist');

    cy.scrollTo('bottom', { ensureScrollable: false });
    cy.wait(2000);
    cy.scrollTo('top', { ensureScrollable: false });

    // open the sidebar
    cy.get('.openbtn', { timeout: 10000 }).should('be.visible');

    // cy.get('.sidebar').should('exist');
    cy.get('button').contains('☰').click();

    cy.contains('#home', 'Home').should('exist');
    cy.contains('#moodboost', 'MoodBoost').should('exist');
    cy.wait(2000);
    cy.contains('#dash', 'Logs').should('exist');
    cy.contains('#contact', 'Contact').should('exist');
    cy.wait(2000);
    cy.contains('#connect', 'Connect').should('exist');
  

    // Find and click the logout link
    cy.get('.logout-link').should('be.visible');
    cy.get('.logout-link').click();
  

    // Check if the user is logged out after clicking the logout button
    cy.get('body').should('not.contain', 'Logout');
    cy.contains('Login').should('exist');

  });
  

})


