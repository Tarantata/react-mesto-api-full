import React from "react";
import { Link } from "react-router-dom";

function Register(props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleEmailChange(e) {setEmail(e.target.value)}
  function handlePasswordChange(e) {setPassword(e.target.value)}

  function handleSubmit(e) {
      e.preventDefault();
      props.onRegister(email, password);
  }

  return (
    <div className="signup">
      <h2 className="signup__heading">Регистрация</h2>
      <form onSubmit={handleSubmit} className="form form__signup" action="">
        <input
          onChange={handleEmailChange} value={email} name="email" className="signup__input" type="email" placeholder="Email" required
        />
        <input
          onChange={handlePasswordChange} value={password} name="password" className="signup__input" type="password" placeholder="Пароль" required
        />
        <button className="signup__button" type="submit">Зарегистрироваться</button>
      </form>
      <p className="signup__text">
        Уже зарегистрированы?
        <Link to="/sign-in" className="signup__link">Войти</Link>
      </p>
    </div>
  );
}

export default Register;