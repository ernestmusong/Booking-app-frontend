import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { CiFacebook } from 'react-icons/ci';

function Car({ item }) {
  if (!item) {
    return null;
  }
  return (
    <article className="article">
      <div className="img-wrap">
        <NavLink to={`/detail/${item.id}`}>
          <img src={item.fields.image[0].url} alt="car" className="car-img" />
        </NavLink>
      </div>
      <div className="article-name-wrap">
        <h6 className="article-name">{item.fields.name}</h6>
        <h6 className="article-name">
          $
          {item.fields.price}
        </h6>
      </div>
      <div className="article-description">
        <p className="text-muted">Ltatum soluta mollitia nostrum tempora eveniet aut, ratione.</p>
      </div>
      <div className="article-socials">
        <p className="text-muted">
          <CiFacebook />
        </p>
        <p className="text-muted">
          <CiFacebook />
        </p>
        <p className="text-muted">
          <CiFacebook />
        </p>
      </div>
    </article>
  );
}

Car.propTypes = {
  item: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default Car;
