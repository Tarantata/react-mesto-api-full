import React from "react";

function LogIn(props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  function handleEmailChange(e) {setEmail(e.target.value)}
  function handlePasswordChange(e) {setPassword(e.target.value)}
  function handleAuthorize(e) {
    e.preventDefault();
    props.onAuthorize(email, password);
  }

  return (
    <div className="signup">
      <h2 className="signup__heading">Вход</h2>
      <form action="" className="form form__signup" onSubmit={handleAuthorize}>
        <input onChange={handleEmailChange} className="signup__input" type="email" required placeholder="E-mail"/>
        <input onChange={handlePasswordChange} className="signup__input" type="password" required placeholder="Пароль"/>
        <button className="signup__button" type="submit">Войти</button>
      </form>
    </div>
  );
}

export default LogIn;