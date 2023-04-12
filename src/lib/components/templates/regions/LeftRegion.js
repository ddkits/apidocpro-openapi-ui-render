/**
 * ApiDocPro UI render, for AsyncAPI, Swagger and OpenApi
 * Built by Sam Ayoub, DDKits.com
 * https://github.com/ddkits
 * APIdocPro UI render based on React and Bootstrap, with the ability to contribute, modify and create different themes to be used.
 * Important: To use this code please leave the copyright in place
 * Reallexi LLC, https://reallexi.com
 */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import { createAsyncMenuItems, createMenuItems } from '../../core/leftside';
import {
  Link,
  Button,
  Element,
  Events,
  animateScroll as scroll,
  scrollSpy,
  scroller
} from 'react-scroll';

// eslint-disable-next-line no-unused-vars
export default function LeftRegion(props) {
  const { data, spectype, theme } = props;
  const [menuData, setMenuData] = useState([]);

  useEffect(() => {
    if (data && spectype !== 'asyncapi') {
      const final = createMenuItems(data);
      setMenuData(final);
    } else {
      setMenuData([]);
    }
    // else {
    //   if (data && spectype !== 'asyncapi') {
    //     const final = createAsyncMenuItems(data);
    //     setMenuData(final);
    //   }
    // }
  }, [data]);
  return (
    <div className=" pt-5 mt-5" id="nav-bar">
      <nav className={`sidenav ${theme?.styles?.apinav} ${theme?.styles?.apinavtext}`}>
        <ul className="main-buttons ">
          {menuData &&
            Object.keys(menuData).map((key) => {
              return (
                <li key={key}>
                  {theme?.styles?.icon ? (
                    <i
                      className="fa fa-circle active-icon"
                      id={key}
                      title={`${key}`}
                      data-bs-original-title={`${key}`}></i>
                  ) : (
                    ''
                  )}
                  {key}
                  <ul
                    className={`hidden ${theme?.styles?.apinavsmc} ${theme?.styles?.apinavsmctext}`}>
                    {Object.keys(menuData[key]).map((menuItem, xds) => {
                      const idLabel =
                        menuData[key][menuItem]?.summary ||
                        menuData[key][menuItem]?.description ||
                        menuData[key][menuItem]?.operationId ||
                        key;

                      const href = idLabel
                        .replaceAll(' ', '_')
                        .replaceAll('.', '')
                        .replaceAll('{', '')
                        .replaceAll('}', '')
                        .replaceAll('/', '_');
                      return (
                        <Link
                          activeClass="active"
                          className={`${theme?.styles?.apinavsmc} ${theme?.styles?.apinavsmctext}`}
                          smooth
                          spy
                          to={`${href}`}
                          key={menuData[key][menuItem] + xds}>
                          <li id={`${href}-link`}>
                            {menuData[key][menuItem].method} - {menuData[key][menuItem].summary}
                          </li>{' '}
                        </Link>
                      );
                    })}
                  </ul>
                </li>
              );
            })}
        </ul>
      </nav>
    </div>
  );
}
LeftRegion.propTypes = {
  data: propTypes.any,
  spectype: propTypes.string,
  resolved: propTypes.any,
  theme: propTypes.object
};
