// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { DashboardOutlined } from '@ant-design/icons';

// type
import { NavItemType } from 'types/menu';

// icons
const icons = { DashboardOutlined };

// ==============================|| MENU ITEMS - Home ||============================== //

const home: NavItemType = {
    id: 'home',
    title: <FormattedMessage id="Coconut Management" />,
    type: 'group',
    children: [
        {
            id: 'coconut-harvest',
            title: <FormattedMessage id="Coconut Harvest" />,
            type: 'item',
            url: '/coconut-management/coconut-harvest',
            icon: icons.DashboardOutlined,
        },
          {
            id: 'coconut-money',
            title: <FormattedMessage id="Coconut Money" />,
            type: 'item',
            url: '/coconut-management/coconut-money',
            icon: icons.DashboardOutlined,
        }
    ]
};

export default home;
