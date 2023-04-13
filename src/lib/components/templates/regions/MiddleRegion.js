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
import { loopInNestedObject } from '../../helpers';
import { loopInNestedAsyncObject } from '../../helpers/async';

export default function MiddleRegion(props) {
  // eslint-disable-next-line react/prop-types
  const { data, openCollapse, theme, resolved, spectype } = props;
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 100);
  }, [data, openCollapse]);
  return loading ? (
    <div className="container">
      <i className="fa-solid fa-sync fa-spin"></i>
    </div>
  ) : (
    <div id="middle-region" className="text-start ">
      {data ? (
        spectype === 'openapi' ? (
          loopInNestedObject(resolved, openCollapse ? openCollapse : false, theme)
        ) : (
          loopInNestedAsyncObject(resolved, openCollapse ? openCollapse : false, theme)
        )
      ) : (
        <div className="alert alert-danger">
          {`ApiDocPro UI render only support OS 2.x, 3.x and Async 2.x, the spec been passed is none
          of them, or having syntax's problems`}
        </div>
      )}
    </div>
  );
}
MiddleRegion.propTypes = {
  data: propTypes.any,
  openCollapse: propTypes.bool,
  theme: propTypes.object,
  resolved: propTypes.any,
  spectype: propTypes.string
};
