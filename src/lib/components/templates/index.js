import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import { yamlExample, yamlToJson } from '../helpers';
import LeftRegion from './regions/LeftRegion';
import MiddleRegion from './regions/MiddleRegion';
import RightRegion from './regions/RightRegion';
import { resolveRefs } from '../core/resolver';
import FileUploadPage from '../core/FileUploadPage';
import ErrorBoundary from '../core/ErrorBoundary';

function ApiDocPro(props) {
  // eslint-disable-next-line react/prop-types
  //   collapse, search, codesnippet
  const [left, setLeft] = useState(true);
  const [right, setRight] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [obj, setObj] = useState();
  const [resolved, setResolved] = useState();
  const {
    title = '',
    spec = '',
    leftRegion = true,
    rightRegion = true,
    collapse = false,
    theme,
    header = true
  } = props;
  const [openCollapse, setopenCollapse] = useState(false);
  const [head, setHead] = useState(true);
  const [loading, setLoading] = useState(true);
  const [specification, setSpecification] = useState(yamlExample);

  const rebuild = (e) => {
    setopenCollapse(collapse || false);
    setLeft(leftRegion || true);
    setRight(rightRegion || true);
    setHead(header || true);
    const newSpec = e || JSON.parse(localStorage.getItem('spec')) || yamlExample;
    if (newSpec && newSpec.length > 0) {
      setSpecification(newSpec);
    } else {
      setSpecification(spec || yamlExample);
    }
    const ob = yamlToJson(newSpec) ? yamlToJson(newSpec) : specification;
    setObj(ob);
    const reso = resolveRefs(ob);
    setResolved(reso);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };
  useEffect(() => {
    setLoading(true);
    rebuild();
  }, []);
  const handleFileCallback = (e) => {
    setLoading(true);
    rebuild(e);
  };
  const goToDefault = () => {
    localStorage.removeItem('spec');
    setLoading(true);
    rebuild();
  };
  return loading ? (
    <div className="container">
      <i className="fa-solid fa-sync fa-spin"></i>
    </div>
  ) : (
    <div className="container-fluid p-0 m-0">
      {head && (
        <header className="row p-3 bg-light sticky-top shadow pt-5 pb-3 m-0 mb-3 maxw-100 ">
          <div className="col text-start">{title || 'APIDocPro UI'}</div>
          <div className="col pull-right ">
            <FileUploadPage handleFileCallback={(e) => handleFileCallback(e)} />
            <button
              className="icon badge rounded-pill bg-dark text-light"
              onClick={() => setLeft(!left)}>
              <i className="fa fa-caret-left"></i>
            </button>
            <button
              className="icon badge rounded-pill bg-dark text-light"
              onClick={() => setopenCollapse(!openCollapse)}>
              <i className="fa fa-bars"></i>
            </button>
            <button
              className="icon badge rounded-pill bg-dark text-light"
              onClick={() => setRight(!right)}>
              <i className="fa fa-caret-right"></i>
            </button>
            <button className="icon badge rounded-pill bg-dark text-light" onClick={goToDefault}>
              Default
            </button>
          </div>
        </header>
      )}

      <main className="d-flex m-0">
        <ErrorBoundary>
          {left && (
            <div
              id="apidocpro-leftsidemenu"
              className="sidenav d-none d-md-block col-2 sticky-top m-0"
              data-mdb-hidden="false">
              <LeftRegion
                data={resolved}
                resolved={resolved}
                menuClicked={() => console.log('menu clicked')}
                theme={theme}
              />
            </div>
          )}
          <div
            id="apidocpro-middleregion"
            className={
              right && left
                ? 'col-7'
                : right && !left
                ? 'col-9'
                : left && !right
                ? 'col-10'
                : 'col-12'
            }>
            <MiddleRegion
              data={resolved}
              resolved={resolved}
              openCollapse={openCollapse}
              theme={theme}
            />
          </div>
          {right && (
            <div
              id="apidocpro-rightregion"
              className="d-none d-md-block  bg-dark text-light col-3 pt-3 minh-100 m-0">
              <RightRegion
                data={resolved}
                resolved={resolved}
                theme={theme}
                openCollapse={openCollapse}
              />
            </div>
          )}
        </ErrorBoundary>
      </main>
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
  spec: propTypes.object,
  resolved: propTypes.any,
  title: propTypes.string,
  leftRegion: propTypes.bool,
  rightRegion: propTypes.bool,
  collapse: propTypes.bool,
  header: propTypes.bool,
  theme: propTypes.object
};

export default ApiDocPro;
