import { AppLayout } from './components/layout';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { HeroTitle } from './components/hero';

import {
  UseFetchDaos,
  UseFetchDao,
  NotFoundTitle,
  UseFetchTransfers,
  UseFetchDaoBalances,
  UseEstimateDeposit,
} from './pages';
import { UseDepositEth } from './pages/UseDepositEth';

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<HeroTitle />} />
          <Route path="use-fetch-dao" element={<UseFetchDao />} />
          <Route path="use-fetch-daos" element={<UseFetchDaos />} />
          <Route path="use-fetch-transfers" element={<UseFetchTransfers />} />
          <Route path="use-fetch-balances" element={<UseFetchDaoBalances />} />
          <Route path="use-estimate-deposit" element={<UseEstimateDeposit />} />
          <Route path="use-deposit-eth" element={<UseDepositEth />} />

          <Route path="*" element={<NotFoundTitle />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}
