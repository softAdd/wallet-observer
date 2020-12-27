import { lazy } from 'react';
import {
  AccountBalanceWalletTwoTone,
  BorderColorTwoTone,
  DonutSmallTwoTone,
  AccountCircleTwoTone,
  AccountBalanceTwoTone,
} from '@material-ui/icons';
import { OverridableComponent } from '@material-ui/core/OverridableComponent';
import { SvgIconTypeMap } from '@material-ui/core';
import { TFunction } from 'i18next';

type ModuleType = {
  title: string;
  url: string;
  component: ReturnType<typeof lazy>;
  icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>;
};

export const createModules = (t: TFunction): ModuleType[] => [
  {
    title: t('Operations'),
    url: '/',
    component: lazy(() => import('modules/operations')),
    icon: AccountBalanceTwoTone,
  },
  {
    title: t('Categories'),
    url: '/categories',
    component: lazy(() => import('modules/categories')),
    icon: BorderColorTwoTone,
  },
  {
    title: t('History'),
    url: '/history',
    component: lazy(() => import('modules/history')),
    icon: AccountBalanceWalletTwoTone,
  },
  {
    title: t('Charts'),
    url: '/charts',
    component: lazy(() => import('modules/charts')),
    icon: DonutSmallTwoTone,
  },
  {
    title: t('Profile'),
    url: '/profile',
    component: lazy(() => import('modules/profile')),
    icon: AccountCircleTwoTone,
  },
];
