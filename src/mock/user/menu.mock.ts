import type { MenuList } from '@/interface/layout/menu.interface';

import { intercepter, mock } from '../config';

const mockMenuList: MenuList = [
    {
        code: 'User Management',
        label: {
            en_US: 'User Management',
        },
        icon: 'account',
        path: '/user',
    },
    {
        code: 'Link Management',
        label: {
            en_US: 'Link',
        },
        icon: 'guide',
        path: '/link',
        children: [
            {
                code: 'Link Item',
                label: {
                    en_US: 'Link Item',
                },
                path: '/link/item',
            },
            {
                code: 'Link Category',
                label: {
                    en_US: 'Link Category',
                },
                path: '/link/category',
            },
        ],
    },
    {
        code: 'Design Management',
        label: {
            en_US: 'Design ',
        },
        icon: 'documentation',
        path: '/design',
        children: [
            {
                code: 'Design Category',
                label: {
                    en_US: 'Design Category',
                },
                path: '/design/category',
            },
            {
                code: 'Design Item',
                label: {
                    en_US: 'Design Item',
                },
                path: '/design/item',
            },
        ],
    },

];

mock.mock('/user/menu', 'get', intercepter(mockMenuList));
