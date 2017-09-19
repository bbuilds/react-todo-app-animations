import React, { Component } from 'react';
import { Motion, spring, presets } from 'react-motion';
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
				 <Motion defaultStyle={{left: -1000}} style={{left: spring(0, presets.gentle)}} key={todo.id}>
                    {interpolatingStyle => (
                        <li
                            className="todo-list__item"
                            key={todo.id}
                            ref={item => { this[todo.id] = item }}
                            style={interpolatingStyle}
                        >
                            <span>{todo.text}</span>
                            <input
                                className="todo-list__checkbox"
                                onChange={ () => this.handleRemove(todo.id) }
                                type="checkbox"
                            />
                        </li>
                    )}
                </Motion>
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
      	    <ul className="todo-list">
	      	{this.getTodos()}
		  	</ul>
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
