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
import { jsonExample, yamlExample, yamlToJson } from '../helpers';
import LeftRegion from './regions/LeftRegion';
import MiddleRegion from './regions/MiddleRegion';
import RightRegion from './regions/RightRegion';
import { resolveRefs } from '../core/resolver';
import FileUploadPage from '../core/FileUploadPage';
import ErrorBoundary from '../core/ErrorBoundary';
import FileUrl from '../core/FileUrl';
import '../core/assets/styles.scss';

export default function ApiDocPro(props) {
  // eslint-disable-next-line react/prop-types
  //   collapse, search, codesnippet
  const [left, setLeft] = useState();
  const [right, setRight] = useState();
  // eslint-disable-next-line no-unused-vars
  const [obj, setObj] = useState();
  const [resolved, setResolved] = useState();
  const { title = '', spec, collapse, theme, leftregion, rightregion, header } = props;
  const [openCollapse, setopenCollapse] = useState(false);
  const [head, setHead] = useState(true);
  const [spectype, setspectype] = useState('');
  const [loading, setLoading] = useState(true);
  const [specification, setSpecification] = useState(yamlExample);

  const rebuild = async (e = false) => {
    setopenCollapse(collapse || false);
    setResolved(null);
    setObj(null);
    setspectype('');
    let finE;
    if (e) {
      try {
        finE = JSON.parse(e);
      } catch (error) {
        finE = e;
      }
    }
    const newSpec = finE
      ? finE
      : localStorage.getItem('spec') && localStorage.getItem('spec') !== ''
      ? JSON.parse(localStorage.getItem('spec'))
      : yamlExample;
    if (newSpec && (newSpec.asyncapi || newSpec['asyncapi'])) {
      setspectype('asyncapi');
    } else if (newSpec && (newSpec.openapi || newSpec['openapi'])) {
      setspectype('openapi');
    } else if (newSpec && (newSpec.swagger || newSpec['swagger'])) {
      setspectype('swagger');
    } else {
      setspectype('openapi');
    }

    if (newSpec) {
      try {
        setSpecification(JSON.parse(newSpec));
      } catch (error) {
        setSpecification(newSpec);
      }
    } else {
      setSpecification(jsonExample);
    }
    const ob = yamlToJson(newSpec) ? yamlToJson(newSpec) : newSpec;
    setObj(ob);
    const reso = resolveRefs(newSpec);
    // Check Openapi or Async
    setResolved(reso);

    setTimeout(() => {
      try {
        const test = JSON.parse(resolved);
        setResolved(test);
      } catch (error) {
        setResolved(reso);
      }
      setLoading(false);
    }, 1000);
  };
  useEffect(() => {
    setLoading(true);
    rebuild(spec);
  }, [spec]);
  useEffect(() => {
    setLoading(true);
    rebuild(spec);
    if (leftregion) {
      setLeft(leftregion);
    } else {
      setLeft(false);
    }
    if (rightregion) {
      setRight(rightregion);
    } else {
      setRight(false);
    }
    if (header) {
      setHead(header);
    } else {
      setHead(false);
    }
  }, []);
  const handleFileCallback = (e) => {
    setLoading(true);
    rebuild(e);
  };
  const goToDefault = () => {
    localStorage.removeItem('spec');
    setLoading(true);
    rebuild(specification);
  };
  return (
    <div className="container-fluid p-0 m-0">
      {head && spectype !== '' && (
        <header className="row p-3 bg-light sticky-top shadow pt-5 pb-3 m-0 mb-3 maxw-100 ">
          <div className="col text-start">{title || 'APIDocPro UI'}</div>
          <div className="col text-start">
            <FileUrl handleFileCallback={(e) => handleFileCallback(e)} />
            <FileUploadPage handleFileCallback={(e) => handleFileCallback(e)} />
          </div>
          <div className="col pull-right">
            <button
              className="icon badge rounded-pill bg-dark text-light form-control"
              onClick={() => setLeft(!left)}>
              <i className="fa fa-caret-left"></i> Left-side Menu
            </button>

            <button
              className="icon badge rounded-pill bg-dark text-light form-control"
              onClick={() => setRight(!right)}>
              Request Body <i className="fa fa-caret-right"></i>
            </button>
            <button
              className="icon badge rounded-pill bg-dark text-light form-control"
              onClick={() => setopenCollapse(!openCollapse)}>
              <i className="fa fa-bars"></i> Expand All
            </button>
            <button
              className="icon badge rounded-pill bg-dark text-light form-control"
              onClick={goToDefault}>
              Reset
            </button>
          </div>
        </header>
      )}
      {loading && spectype === '' ? (
        <div className="container justify-content-middle">
          <i className="fa-solid fa-sync fa-spin"></i>
        </div>
      ) : (
        <main className="d-flex m-0 col-sx-12">
          <ErrorBoundary>
            {left ? (
              <div
                id="apidocpro-leftsidemenu"
                className={`sidenav d-none d-md-block col-2 m-0 ${theme?.styles?.left} ${theme?.styles?.lefttext} `}
                data-mdb-hidden="false">
                <LeftRegion
                  data={resolved}
                  resolved={resolved}
                  menuClicked={() => console.log('menu clicked')}
                  theme={theme}
                  spectype={spectype}
                />
              </div>
            ) : (
              []
            )}
            <div
              id="apidocpro-middleregion"
              className={
                right && left
                  ? `col-12 col-sm-12 col-md-7 ${theme?.styles?.middle} ${theme?.styles?.middletext}`
                  : right && !left
                  ? `col-12 col-sm-12 col-md-9 ${theme?.styles?.middle} ${theme?.styles?.middletext}`
                  : left && !right
                  ? `col-12 col-sm-12 col-md-10 ${theme?.styles?.middle} ${theme?.styles?.middletext}`
                  : `col-12 col-sm-12 col-md-12 ${theme?.styles?.middle} ${theme?.styles?.middletext}`
              }>
              <MiddleRegion
                data={resolved}
                resolved={resolved}
                openCollapse={openCollapse}
                theme={theme}
                spectype={spectype}
              />
            </div>
            {right ? (
              <div
                id="apidocpro-rightregion"
                className={`d-none d-md-block pt-3 pb-5 col-3 pt-3 minh-100 m-0 ${theme?.styles?.right} ${theme?.styles?.righttext} `}>
                <RightRegion
                  data={resolved}
                  resolved={resolved}
                  theme={theme}
                  openCollapse={openCollapse}
                  spectype={spectype}
                />
              </div>
            ) : (
              []
            )}
          </ErrorBoundary>
        </main>
      )}
      <footer className="sticky-bottom bg-white p-2 m-0">
        <div id="copyright" className="badge rounded-pill bg-light text-dark ">
          Copyright @ <a href="//apidocpro.com/editor">APIDocPro UI</a>,
          <a href="//reallexi.com">RealLexi LLC</a>
        </div>
      </footer>
    </div>
  );
}

ApiDocPro.propTypes = {
  spec: propTypes.oneOfType([propTypes.string, propTypes.object]),
  resolved: propTypes.any,
  title: propTypes.string,
  leftregion: propTypes.bool,
  rightregion: propTypes.bool,
  collapse: propTypes.bool,
  header: propTypes.bool,
  theme: propTypes.object
};
