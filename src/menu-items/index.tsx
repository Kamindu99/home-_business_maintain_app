// project import
import home from './home';
import tea from './tea-management';
import coconut from './coconut-management';

// types
import { NavItemType } from 'types/menu';

// ==============================|| MENU ITEMS ||============================== //

const menuItems: { items: NavItemType[] } = {
  items: [home,tea,coconut]
};

export default menuItems;
