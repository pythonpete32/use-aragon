export function ipfsUriToUrl(ipfsUri: string | undefined) {
  if (typeof ipfsUri === "string" && ipfsUri.startsWith("ipfs://")) {
    return "https://ipfs.io/ipfs/" + ipfsUri.slice(7);
  } else {
    return "";
  }
}
