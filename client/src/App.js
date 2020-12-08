
import './App.css';

function App() {
  return (
    <div className="App">
      <form action="/api/users/login" method="post">
        <label>Email</label>
        <input type="email" name="email" />
        <label>password</label>
        <input type="password" name="password" />
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default App;
