/// <reference types="cypress" />
import { INITIAL_TODOS } from '~/constants/entity';
import { TodoList } from '~/components/modules';

describe('test todo crud operation', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('displays three todo items by default', () => {
    cy.get('[data-testid="todoList"]').should('have.length', 3);
  });
  it('can add new todo items', () => {
    const newItem = 'Hello World!';
    cy.get('[data-testid="inputTask"]').type(`${newItem}{enter}`);
    cy.get('[data-testid="addTaskButton"]').click();
    cy.get('[data-testid="todoList"]').should('have.length', 4).last().should('have.text', newItem);
  });
  it('can update todo item', () => {
    const taskToUpdate = 'Good Afternoon!';
    cy.get('[data-testid="todoList"]').click();
    cy.get('[data-testid="todoTitle"]').eq(1).type(taskToUpdate);
    cy.get('[data-testid="todoList"]').should('have.length', 3).eq(1).find('[data-testid="todoTitle"]').should('have.text', taskToUpdate);
  });
  it('can delete item', () => {
    cy.get('[data-testid="todoCheckbox"]').eq(1).click();
    cy.get('[data-testid="todoList"]').should('have.length', 2);
    cy.get('[data-testid="todoList"]').first().contains(INITIAL_TODOS[0].title);
    cy.get('[data-testid="todoList"]').last().contains(INITIAL_TODOS[2].title);
  });
});
