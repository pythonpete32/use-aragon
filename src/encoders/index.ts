import { ITokenVotingPluginInstall, TokenVotingClient } from '@aragon/sdk-client';

export const encodeTokenVotingPlugin = (pluginInitParams: ITokenVotingPluginInstall) => {
  return TokenVotingClient.encoding.getPluginInstallItem(pluginInitParams, 'goerli');
};
