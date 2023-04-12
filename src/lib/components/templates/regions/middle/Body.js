/**
 * ApiDocPro UI render, for AsyncAPI, Swagger and OpenApi
 * Built by Sam Ayoub, DDKits.com
 * https://github.com/ddkits
 * APIdocPro UI render based on React and Bootstrap, with the ability to contribute, modify and create different themes to be used.
 * Important: To use this code please leave the copyright in place
 * Reallexi LLC, https://reallexi.com
 */
import React from 'react';
import propTypes from 'prop-types';
export default function Body(props) {
  const { data, theme } = props;
  return (
    <>
      <div
        className={`p-3 ${theme?.styles?.body} ${theme?.styles?.bodytext}`}
        dangerouslySetInnerHTML={{ __html: data }}
      />
    </>
  );
}
Body.propTypes = {
  /** Data is where the spec we are going to use, must be string, can include HTML tags */
  data: propTypes.string,
  theme: propTypes.object
};
