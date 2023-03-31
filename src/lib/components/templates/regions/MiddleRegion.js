import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import { loopInNestedObject } from '../../helpers';

export default function MiddleRegion(props) {
  // eslint-disable-next-line react/prop-types
  const { data, openCollapse, theme, resolved } = props;
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 50);
  }, [openCollapse]);
  useEffect(() => {
    setLoading(false);
  }, []);
  return loading ? (
    <div className="container">
      <i className="fa-solid fa-sync fa-spin"></i>
    </div>
  ) : (
    <div id="middle-region" className="text-start">
      {data ? (
        loopInNestedObject(resolved, openCollapse ? openCollapse : false, theme)
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
  resolved: propTypes.any
};
