import React from 'react';
import propTypes from 'prop-types';
export default function Body(props) {
  // const { title, version, description, type, contact, spec} = props;
  const { data } = props;
  return (
    <>
      <div className="p-3" dangerouslySetInnerHTML={{ __html: data }} />
    </>
  );
}
Body.propTypes = {
  data: propTypes.string,
  title: propTypes.string,
  version: propTypes.string,
  description: propTypes.string,
  type: propTypes.string,
  contact: propTypes.any,
  spec: propTypes.any
};
