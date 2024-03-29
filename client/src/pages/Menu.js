import Auth from '../utils/auth';
import List from '../components/Menu/List';
import Edit from '../components/Menu/Edit';
import OverScan from '../components/Menu/Overscan';

const Menu = ({ menuHover, menuSelection, setMenuSelection, data, ovrScn, setOvrScn, setMenuHover }) => {
  if (Auth.loggedIn()) {
    return (
      <div className={(menuSelection === "overscan") ? ("translucent") : ("")}>
        {(menuSelection === 'list') ? (<List data={data} />) : null}
        {(menuSelection === 'edit') ? (<Edit data={data} setMenuHover={setMenuHover} />) : null}
        {(menuSelection === 'overscan') ? (<OverScan data={data} ovrScn={ovrScn} setOvrScn={setOvrScn} setMenuHover={setMenuHover} />) : null}
        <ul id='menuOptions'>
          <li className={(menuHover === 0) ? ('menuSelect') : ('menuOption')} onClick={() => setMenuSelection("edit")}>Ch Edit</li>
          <li className={(menuHover === 1) ? ('menuSelect') : ('menuOption')} onClick={() => setMenuSelection("overscan")}>OverScan</li>
          <li className={(menuHover === 2) ? ('menuSelect') : ('menuOption')} >Clear Memory</li>
          <li className={(menuHover === 3) ? ('menuSelect') : ('menuOption')} >Save</li>
        </ul>
      </div>
    );
  } else {
    return (
      <>
        <div>Make an account for custom settings</div>
      </>
    );
  }
};

export default Menu;
