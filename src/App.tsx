import React, { useState } from "react";
import { Authorization } from "./components/Authorization";
import { HouseList } from "./components/HouseList";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./styles.scss";

const App: React.FC = () => {
  const [token, setToken] = useState<any>({});

  function setTokens(token: object) {
    setToken(token);
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
              token={{
                refresh: token.refresh,
                access: token.access,
              }}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
