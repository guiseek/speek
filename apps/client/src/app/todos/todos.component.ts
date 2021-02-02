import { Component, OnInit } from '@angular/core'
import { RemoteTodoStore, Todo } from '../store'
import { NetworkService } from '../network.service'

@Component({
  selector: 'speek-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
})
export class TodosComponent implements OnInit {
  todoStore: RemoteTodoStore
  newTodoText = ''

  upload$ = this.network.upload$
  download$ = this.network.download$
  connection$ = this.network.connection$

  constructor(todoStore: RemoteTodoStore, readonly network: NetworkService) {
    this.todoStore = todoStore
  }

  ngOnInit() {
    this.network.loadUp()
    this.network.loadDown()
  }

  ngAfterViewInit(): void {}

  stopEditing(todo: Todo, editedTitle: string) {
    todo.title = editedTitle
    todo.editing = false
  }

  cancelEditingTodo(todo: Todo) {
    todo.editing = false
  }

  updateEditingTodo(todo: Todo, editedTitle: string) {
    editedTitle = editedTitle.trim()
    todo.editing = false

    if (editedTitle.length === 0) {
      return this.todoStore.remove(todo)
    }

    todo.title = editedTitle
  }

  editTodo(todo: Todo) {
    todo.editing = true
  }

  removeCompleted() {
    this.todoStore.removeCompleted()
  }

  toggleCompletion(todo: Todo) {
    this.todoStore.toggleCompletion(todo)
  }

  remove(todo: Todo) {
    this.todoStore.remove(todo)
  }

  addTodo() {
    if (this.newTodoText.trim().length) {
      this.todoStore.add(this.newTodoText)
      this.newTodoText = ''
    }
  }
}
