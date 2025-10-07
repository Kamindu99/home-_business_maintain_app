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
    title: <FormattedMessage id="Tea Management" />,
    type: 'group',
    children: [
        {
            id: 'tea-collection',
            title: <FormattedMessage id="Tea Collection" />,
            type: 'item',
            url: '/tea-collection',
            icon: icons.DashboardOutlined,
        },
          {
            id: 'tea-money',
            title: <FormattedMessage id="Tea Money Payment" />,
            type: 'item',
            url: '/tea-money',
            icon: icons.DashboardOutlined,
        }
    ]
};

export default home;
