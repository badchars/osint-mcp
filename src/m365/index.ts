// ─── Types ───

interface M365TenantResult {
  domain: string;
  found: boolean;
  tenantId?: string;
  issuer?: string;
  authorizationEndpoint?: string;
  tokenEndpoint?: string;
  region?: string;
}

interface M365UserRealmResult {
  domain: string;
  found: boolean;
  namespaceType?: string; // "Managed" or "Federated"
  federationBrandName?: string;
  federationActiveAuthUrl?: string;
  cloudInstanceName?: string;
}

// ─── Tenant Discovery ───

export async function m365Tenant(domain: string): Promise<M365TenantResult> {
  try {
    const res = await fetch(
      `https://login.microsoftonline.com/${encodeURIComponent(domain)}/v2.0/.well-known/openid-configuration`,
    );
    if (!res.ok) return { domain, found: false };

    const data = await res.json();
    const issuer: string = data.issuer ?? "";

    // Extract tenant ID from issuer URL: https://login.microsoftonline.com/{tenant-id}/v2.0
    const tenantMatch = issuer.match(/\/([0-9a-f-]{36})\//);
    const tenantId = tenantMatch?.[1];

    // Extract region from tenant_region_scope
    const region = data.tenant_region_scope;

    return {
      domain,
      found: true,
      tenantId,
      issuer,
      authorizationEndpoint: data.authorization_endpoint,
      tokenEndpoint: data.token_endpoint,
      region,
    };
  } catch {
    return { domain, found: false };
  }
}

// ─── User Realm (Federation Detection) ───

export async function m365UserRealm(domain: string): Promise<M365UserRealmResult> {
  try {
    const res = await fetch(
      `https://login.microsoftonline.com/getuserrealm.srf?login=test@${encodeURIComponent(domain)}&json=1`,
    );
    if (!res.ok) return { domain, found: false };

    const data = await res.json();

    // NameSpaceType 0 = Unknown, 1 = Managed, 2 = Federated
    let namespaceType: string | undefined;
    if (data.NameSpaceType === "Managed" || data.NameSpaceType === 1) namespaceType = "Managed";
    else if (data.NameSpaceType === "Federated" || data.NameSpaceType === 2) namespaceType = "Federated";
    else if (data.NameSpaceType !== undefined) namespaceType = String(data.NameSpaceType);

    return {
      domain,
      found: namespaceType !== undefined,
      namespaceType,
      federationBrandName: data.FederationBrandName,
      federationActiveAuthUrl: data.AuthURL ?? data.STSAuthUrl,
      cloudInstanceName: data.CloudInstanceName ?? data.CloudInstanceIssuerUri,
    };
  } catch {
    return { domain, found: false };
  }
}
