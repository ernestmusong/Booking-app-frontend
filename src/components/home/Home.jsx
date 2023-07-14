import React from 'react';
import NavigationPanel from '../NavigationPanel';
import ClassList from './ClassList';

function Home() {
  return (
    <div className="main-wrapper">
      <NavigationPanel />
      <ClassList />
    </div>
  );
}

export default Home;
