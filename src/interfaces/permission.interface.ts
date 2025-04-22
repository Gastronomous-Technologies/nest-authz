import {
  AuthActionVerb,
  AuthPossession,
  CustomAuthActionVerb,
  AuthResource,
  BatchApproval,
} from '../types';
import { ExecutionContext } from '@nestjs/common';

export interface Permission {
  resource: AuthResource;
  action: AuthActionVerb | CustomAuthActionVerb;
  possession?: AuthPossession;
  isOwn?: (ctx: ExecutionContext) => boolean;
  resourceFromContext?: boolean | ResourceFromContextFn;
  batchApproval?: BatchApproval;
}
type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;
type MakeRequired<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

export type DecoratorPermission = Optional<
  MakeRequired<Permission, 'resourceFromContext'>,
  'resource'
>;
export type PermissionData = Omit<Permission, 'requestFromContext' | 'isOwn'>;
export type ResourceFromContextFn = (
  context: ExecutionContext,
  permission: PermissionData,
) => AuthResource | AuthResource[];
