import React, { useEffect } from 'react';
import Navigation from "../Navigation/Navigation";
import { Routes } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { isLoggedIn } from '../../Redux/Actions/UserActions';
import { getMenu } from '../../Redux/Actions/EnvActions';

export default function External(){
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(isLoggedIn())
    dispatch(getMenu())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <div>
    <Navigation/>
  <Routes>
  </Routes>
  </div>;
}
