// project import
import home from './home';
import tea from './tea-management';

// types
import { NavItemType } from 'types/menu';

// ==============================|| MENU ITEMS ||============================== //

const menuItems: { items: NavItemType[] } = {
  items: [home,tea]
};

export default menuItems;
