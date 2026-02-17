import { ChangeEvent, FC, MouseEvent, SubmitEvent, useState } from 'react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const App: FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState<string>('');

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>): void => {
    e.preventDefault(); // ページリロードを防ぐ

    const trimmedValue = inputValue.trim();
    if (trimmedValue === '') return;

    const newTodo: Todo = {
      id: Date.now(), // 一意なIDを生成
      text: trimmedValue,
      completed: false,
    };

    setTodos([newTodo, ...todos]);
    setInputValue('');
  };

  // 入力フィールドの変更時の処理
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void =>
    setInputValue(e.target.value);

  // チェックボックスの変更時の処理
  const handleToggle = (e: ChangeEvent<HTMLInputElement>): void => {
    const id: number = Number(e.currentTarget.dataset.id);
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // 削除ボタンクリック時の処理
  const handleDelete = (e: MouseEvent<HTMLButtonElement>): void => {
    const id: number = Number(e.currentTarget.dataset.id);
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="app">
      <form id="new-todo-form" onSubmit={handleSubmit}>
        <input
          id="new-todo"
          type="text"
          placeholder="What needs to be done?"
          value={inputValue}
          onChange={handleInputChange}
        />
        <button type="submit">Add</button>
      </form>
      <ul id="todo-list">
        {todos.map((todo) => (
          <li key={todo.id}>
            <div>
              <input
                type="checkbox"
                checked={todo.completed}
                data-id={todo.id}
                onChange={handleToggle}
              />
              <label
                style={{
                  textDecorationLine: todo.completed ? 'line-through' : 'none',
                }}
              >
                {todo.text}
              </label>
              <button data-id={todo.id} onClick={handleDelete}>
                ❌
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
