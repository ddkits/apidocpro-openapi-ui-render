/**
 * ApiDocPro UI render, for AsyncAPI, Swagger and OpenApi
 * Built by Sam Ayoub, DDKits.com
 * https://github.com/ddkits
 * APIdocPro UI render based on React and Bootstrap, with the ability to contribute, modify and create different themes to be used.
 * Important: To use this code please leave the copyright in place
 * Reallexi LLC, https://reallexi.com
 */
import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
export default function Header(props) {
  const [loading, setLoading] = useState(true);
  const {
    spectitle,
    specversion,
    specdescription,
    specType,
    specsummary,
    speccontact,
    specservers,
    specexternaldocs
  } = props;
  //   const { data, type, contact, spec } = props;

  useEffect(() => {
    setLoading(false);
  }, [props]);
  return loading ? (
    <div className="container">
      <i className="fa-solid fa-sync fa-spin"></i>
    </div>
  ) : (
    <>
      <div className="m-0 p-3 bg-light text-dark">
        <div className="d-flex justify-space-between p-3">
          <div className="col-8 content-main">
            <h1 className="h3">{spectitle || ''} </h1>
          </div>
          <div className="col  content-secondary text-end">
            <span className="badge rounded-pill bg-warning text-dark">{specType || ''}</span>
            <span className="badge rounded-pill bg-primary">{specversion || ''}</span>
          </div>
        </div>
        <div className="row  p-3 small">{specdescription || ''}</div>
        <div className="row  p-3 small">{specsummary || ''}</div>
        {specexternaldocs ? (
          <div className=" row col ">
            <a
              className="badge rounded-pill col bg-dark text-light"
              href={specexternaldocs.url}
              key={specexternaldocs.url}>
              {specexternaldocs.title ||
                specexternaldocs.name ||
                specexternaldocs.description ||
                `External Link`}
            </a>
            {speccontact
              ? Object.keys(speccontact).map((key) => (
                  <div className="badge rounded-pill col bg-dark text-light" key={`${key}-key`}>
                    {`${key}:  ${speccontact[key]}`}
                  </div>
                ))
              : ''}
          </div>
        ) : (
          ''
        )}
        {specservers ? (
          <div className="row  p-3 small">
            <select value={specservers[0]} onChange={(e) => console.log(e.target.value)}>
              {specservers.map((x) => (
                <option value={x.url} key={x.url}>
                  {x.url}
                </option>
              ))}
            </select>
          </div>
        ) : (
          ''
        )}
      </div>
    </>
  );
}
Header.propTypes = {
  /** specdata props, spec contents/string/object */
  specdata: propTypes.any,
  /** spec summary */
  specsummary: propTypes.string,
  /** spec contact info */
  speccontact: propTypes.any,
  /** spec contact title */
  spectitle: propTypes.string,
  /** spec version info */
  specversion: propTypes.string,
  /** spec description info */
  specdescription: propTypes.string,
  /** spec type info */
  specType: propTypes.string,
  /** spec info */
  spec: propTypes.any,
  /** spec servers array */
  specservers: propTypes.array,
  /** spec externaldocs or links info */
  specexternaldocs: propTypes.any
};
