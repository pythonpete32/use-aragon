import { useState, useEffect } from 'react';
import { ethers, Signer } from 'ethers';

function useHackySigner() {
  const [signer, setSigner] = useState<Signer | null>(null);
  const [chain, setChain] = useState<number | null>(null);

  useEffect(() => {
    async function getSigner() {
      if (typeof window.ethereum !== 'undefined') {
        // Create an ethers provider and signer object
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const { chainId } = await provider.getNetwork();
        console.log('chainId', chainId);
        setChain(chainId);
        await provider.send('eth_requestAccounts', []);
        const signer = provider.getSigner();
        setSigner(signer);
      } else {
        console.log('Metamask not detected');
      }
    }
    getSigner();
  }, []);

  return { signer, chain };
}

export default useHackySigner;
