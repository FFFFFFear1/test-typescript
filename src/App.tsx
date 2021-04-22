import React, { useState } from "react";
import { Authorization } from "./components/Authorization";
import { HouseList } from "./components/HouseList";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./styles.scss";

type Token = {
  refresh: string;
  access: string;
};

const App: React.FC = () => {
  const [token, setToken] = useState<Token>({
    refresh: "",
    access: "",
  });

  function setTokens(refreshToken: string, accessToken: string) {
    setToken({
      refresh: refreshToken,
      access: accessToken,
    });
  }

  return (
    <div className="conteiner">
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Authorization setTokens={setTokens} />
          </Route>
          <Route path="/houseList">
            <HouseList
              token={token}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
