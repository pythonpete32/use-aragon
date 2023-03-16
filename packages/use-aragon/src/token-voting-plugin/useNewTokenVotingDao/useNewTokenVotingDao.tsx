import { ITokenVotingPluginInstall } from '@aragon/sdk-client';
import { useNewDao } from '../../core';
import { NewDaoParams } from '../../core/useNewDao/types';
import { encodeTokenVotingPlugin } from '../../encoders';

export function useNewTokenVotingDao(
  newDaoParams: Omit<NewDaoParams, 'plugins'>,
  pluginSettings: ITokenVotingPluginInstall
) {
  return useNewDao({
    ...newDaoParams,
    plugins: [encodeTokenVotingPlugin(pluginSettings)],
  });
}
