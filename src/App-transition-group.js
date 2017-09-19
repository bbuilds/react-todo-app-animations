import React, { Component } from 'react';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import CSSTransition from 'react-transition-group/CSSTransition';
const uuid = require('uuid/v4');

class App extends Component {
	
	constructor (props) {
		super(props);
		
		this.handleAddTodoChange = this.handleAddTodoChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.getTodos = this.getTodos.bind(this);
		this.handleRemove = this.handleRemove.bind(this);
		this.state = {
			newTodo: '',
			todos: [
				{
					id: uuid(),
					text: "Buy Milk"	
				},
				{
					id: uuid(),
					text: "Sleep forever"	
				}
			]
		}
	}
	
	getTodos () {
		return this.state.todos.map((todo, index) => {
			return (
				<CSSTransition
					key={index}
					classNames="new-todo"
					timeout={{ enter: 550, exit: 550 }}
				>
					<li className="todo-list__item" key={todo.id}>
						{todo.text}
						<input type="checkbox" className="todo-list__checkbox" onClick={() => this.handleRemove(todo.id)} />
					</li>
				</CSSTransition>
			);
		})		
	}
	
	handleSubmit (e) {
        e.preventDefault();

        let todos = this.state.todos,
            newTodo = {
                id: uuid(),
                text: this.state.newTodo
            };

        todos.push(newTodo);

        this.setState({
            newTodo: '',
            todos: todos
        });
    }

    handleAddTodoChange (e) {
        this.setState({ newTodo: e.target.value })
    }	
    
   handleRemove (id) {
        let newTodos = this.state.todos.filter((todo) => {
            return todo.id !== id;
        })

        this.setState({todos: newTodos });
    }
	

  render() {
    return (
      <div className="container">
      	<h1 className="todo-header">To-dos</h1>
      	<TransitionGroup 
      	component = "ul" 
      	className="todo-list"
      	>
	      	{this.getTodos()}
      	</TransitionGroup>
      	<div className="todo-controls">
      		<form onSubmit={this.handleSubmit}>
      			<input className="todo-controls__input" 
      			placeholder="Add a todo" 
      			onChange={this.handleAddTodoChange} 
      			type="text"
      			value={this.state.newTodo}
      			/>
      			<button className="todo-controls__button">Add</button>
      			
      		</form>
      		
      	</div>
      </div>
    );
  }
}

export default App;
