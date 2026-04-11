import { get } from '../api';

export const FIRMWARE_ROOT = 'https://ci.qmk.fm/master/latest/';

export type FirmwareListResponse = {
  last_updated: string;
  files: string[];
};

/**
 * Retrieve the list of compiled firmware files from the QMK CI server
 * ```typescript
 * const { last_updated, files } = await firmwareList();
 * ```
 */
export const firmwareList = (): Promise<FirmwareListResponse> =>
  get<FirmwareListResponse>(`${FIRMWARE_ROOT}firmware_list.json`);
