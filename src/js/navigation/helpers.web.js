/**
 * Created by anton on 17/07/17.
 */

import React from "react";
import {MemoryRouter, Route, Link } from 'react-router-dom'

export function wrapWithLink(what, key, to) {
  return (
    <Link key={key} to={to}>{what}</Link>
  )
}

export function generateRoute(path, component) {
  return (<Route path={path} component={component}/>)
}