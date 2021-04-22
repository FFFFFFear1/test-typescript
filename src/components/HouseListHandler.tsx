import React from "react";
import Moment from "moment";

type Links = {
  currentPage: number;
  nextPage: number;
  prevPage: number;
  lastPage: number;
  objectsCount: number;
};
type House = {
  id: number;
  address: string;
  reestrFlatCount: number;
  createdAt: string;
};
type HouseListHandlerProps = {
  houses: Array<House>;
  getObjects: Function;
  curCompany: Object | undefined;
  links: Links;
};

export const HouseListHandler: React.FC<HouseListHandlerProps> = ({
  houses,
  getObjects,
  curCompany,
  links,
}) => {
  const getDate = (date: string, format: string) => {
    return Moment(date).format(format);
  };

  return (
    <div className="house-list__container__items-handler">
      <div className="house-list__container__table">
        {houses.length !== 0 ? (
          <table className="house-list__container__item">
            <thead className="house-list__container__table__header">
              <tr>
                <th>
                  <p>id</p>
                </th>
                <th>
                  <p>Адрес</p>
                </th>
                <th>
                  <p>Кол-во квартир</p>
                </th>
                <th>
                  <p>Дата добавления</p>
                </th>
              </tr>
            </thead>
            <tbody className="house-list__container__item__info">
              {houses.map((house: House) => (
                <tr key={house.id}>
                  <td>{house.id}</td>
                  <td>{house.address}</td>
                  <td>{house.reestrFlatCount}</td>
                  <td>{getDate(house.createdAt, "DD.MM.YYYY")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <h1 style={{ textAlign: "center" }}>Объектов нет</h1>
        )}
        <div className="house-list__container__items-handler__btns">
          {houses.length !== 0 && links && (
            <div style={{ display: "flex", flexDirection: "row" }}>
              <button
                onClick={() => {
                  getObjects(curCompany, links.prevPage);
                }}
              >
                1 ←
              </button>
              <p>{links.currentPage}</p>
              <button
                onClick={() => {
                  if (links.nextPage !== null)
                    getObjects(curCompany, links.nextPage);
                }}
              >
                → {links.lastPage}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
