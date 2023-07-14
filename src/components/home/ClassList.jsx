import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getClasses } from 'redux/classes/classesSlice';
import Class from './Class';
import Title from './Tittle';

function ClassList() {
  const dispatch = useDispatch();
  const { classes, isLoading, error } = useSelector((store) => store.classes);

  useEffect(() => {
    dispatch(getClasses('CLASSES'));
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="loading">
        <h1>Loading...</h1>
      </div>
    );
  }
  if (error) {
    return (
      <div className="error">
        <h1>{error}</h1>
      </div>
    );
  }
  if (classes.length === 0) {
    return (
      <div className="empty list">
        <h1>Your cars list is currently empty!</h1>
      </div>
    );
  }
  return (
    <>
      <div className="classes-wrapper">
        <Title title="all cars" subTitle="Please select a car" />
        <div className="classes mx-auto">
          { classes.map((item) => <Class key={item.id} item={item} />)}
        </div>
      </div>
    </>
  );
}

export default ClassList;
