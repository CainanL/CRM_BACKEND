// import { SetMetadata } from '@nestjs/common';

// export const PolicyRole = (policy: string, role?: string) => 
//   SetMetadata('policyRole', { policy, role });

import { SetMetadata } from '@nestjs/common';

export interface PolicyRoleMetadata {
  policies?: string[];
  roles?: string[];
}

export const PolicyRole = (policies: string[] = [], roles: string[] = []) =>
  SetMetadata('policyRole', { policies, roles } as PolicyRoleMetadata);
