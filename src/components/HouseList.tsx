import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import NativeSelect from "@material-ui/core/NativeSelect";
import { HouseListHandler } from "./HouseListHandler";

type HouseListProps = {
  token: Token;
};
type Token = {
  refresh: string;
  access: string;
};
type Links = {
  currentPage: number;
  nextPage: number;
  prevPage: number;
  lastPage: number;
  objectsCount: number;
};
type Data = {
  data: [];
  links: Links;
};
type Companys = {
  data: [];
};
type Company = {
  id: number;
  name: string;
};
type House = {
  id: number;
  address: string;
  reestrFlatCount: number;
  createdAt: string;
};

export const HouseList: React.FC<HouseListProps> = ({ token }) => {
  const [companies, setCompanies] = useState<Array<Company>>([]);
  const [houses, setHouses] = useState<Array<House>>([]);
  const [links, setLinks] = useState<Links>({
    currentPage: 0,
    nextPage: 0,
    prevPage: 0,
    lastPage: 0,
    objectsCount: 0,
  });
  const [curCompany, setCurCompany] = useState<Company>();

  async function updateCompany(data: React.ChangeEvent<HTMLSelectElement>) {
    const company: any = companies.find(
      (item: Company) => item.name === data.currentTarget.value
    );
    setCurCompany(company);
    getObjects(company, 1);
  }

  async function getObjects(company: Company, curPage: number) {
    try {
      const response = await fetch(
        "http://test-alpha.reestrdoma.ru/api/reestrdoma/company/houses/" +
          `${company.id}` +
          "/?page=" +
          `${curPage}` +
          "&perPage=" +
          `${10}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
            Authorization: "Bearer " + token.access,
          },
        }
      );
      const result: Promise<Data> = response.json();
      result.then((value) => {
        if (value.data.length !== 0) {
          setHouses(value.data);
          setLinks(value.links);
        }
      });
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async function getCompanies() {
    try {
      const response = await fetch(
        "http://test-alpha.reestrdoma.ru/api/reestrdoma/companies/",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
            Authorization: "Bearer " + token.access,
          },
        }
      );
      const result: Promise<Companys> = response.json();
      result.then((value) => {
        if (value.data.length !== 0) {
          setCompanies(value.data);
        }
      });
    } catch (error) {
      console.error("Error:", error);
    }
  }

  useEffect(() => {
    if (token.access.trim()) {
      getCompanies();
    }
  }, []);

  return (
    <div className="house-list__container">
      {!token.access.trim() ? (
        <div className="house-list__container__auth-placeholder">
          <h1>Пожалуйста авторизуйтесь</h1>
          <NavLink to="/">Войти</NavLink>
        </div>
      ) : (
        <div className="house-list__container__view">
          <div className="house-list__container__house-list">
            <h2>Список компаний</h2>
            <NativeSelect
              defaultValue={1}
              id="demo-controlled-open-select"
              onChange={(value) => updateCompany(value)}
            >
              <option value={1} disabled>
                Выберите компанию...
              </option>
              {companies.map((item: Company) => {
                return (
                  <option key={item.id} value={item.name}>
                    {item.name}
                  </option>
                );
              })}
            </NativeSelect>
          </div>
          <HouseListHandler
            houses={houses}
            getObjects={getObjects}
            curCompany={curCompany}
            links={links}
          />
        </div>
      )}
    </div>
  );
};
