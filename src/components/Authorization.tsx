import React, { useState } from "react";
import { Input, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";

type AuthProps = {
  setTokens: Function;
};

export const Authorization: React.FC<AuthProps> = ({ setTokens }) => {
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const history = useHistory();

  const updateLogin = (data: React.ChangeEvent<HTMLInputElement>) =>
    setLogin(data.currentTarget.value);
  const updatePassword = (data: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(data.currentTarget.value);

  async function sendUserData(data: React.FormEvent<HTMLFormElement>) {
    data.preventDefault();

    try {
      const response = await fetch(
        "http://test-alpha.reestrdoma.ru/api/login/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
          body: JSON.stringify({
            username: login.toString(),
            password: password.toString(),
          }),
        }
      );
      const result: Promise<any> = response.json();

      result.then((value) => {
        if (value.success) {
          setTokens(value.data.token);
          history.push("/houseList");
        }
      });
    } catch (error) {
      console.error("Ошибка:", error);
    }
  }

  return (
    <form className="auth" onSubmit={sendUserData}>
      <h1 className="auth__title">Вход</h1>
      <Input
        type="email"
        value={login}
        autoFocus={true}
        placeholder="Введите email..."
        onChange={updateLogin}
        inputProps={{ pattern: "^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$" }}
        required
      />
      <Input
        type="password"
        value={password}
        placeholder="Введите пароль..."
        onChange={updatePassword}
        required
      />
      <Button type="submit" variant="contained" color="primary">
        Войти
      </Button>
    </form>
  );
};
