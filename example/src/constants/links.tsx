import { UseFetchDao, Test } from '../pages';
import { UseFetchTransfers } from '../pages/UseFetchTransfers';
export const Links = [
  {
    link: '/',
    label: 'Core',
    links: [
      {
        link: '/use-fetch-dao',
        label: 'useFetchDao',
        component: UseFetchDao,
      },
      {
        link: '/use-fetch-daos',
        label: 'useFetchDaos',
        component: Test,
      },
      {
        link: '/use-fetch-transfers',
        label: 'useFetchTransfers',
        component: UseFetchTransfers,
      },
    ],
  },
  {
    link: '/',
    label: 'Token Voting',
    links: [
      {
        link: '/test',
        label: 'Test',
        component: Test,
      },
    ],
  },
  {
    link: '/',
    label: 'Multisig',
    links: [
      {
        link: '/test',
        label: 'Test',
        component: Test,
      },
    ],
  },
  {
    link: '/',
    label: 'Address List',
    links: [
      {
        link: '/test',
        label: 'Test',
        component: Test,
      },
    ],
  },
];
