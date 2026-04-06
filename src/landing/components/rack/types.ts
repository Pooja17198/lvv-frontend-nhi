export type DeviceStatus = {
  deviceName: string;
  jobStatus: string;
  elevation?: number;
  validationEligible?: boolean;
  validationEligibilityReason?: string;
  _key: string;
};

/**
 * Legacy flattened validation row shape kept for backward compatibility.
 * New UI uses per-test tables and maps the backend's per-test result sections.
 */
export interface ValidationFailure {
  rackSerial: string;
  deviceARack: string;
  deviceAName: string;
  deviceAPort: string;
  deviceBRack: string;
  deviceBName: string;
  deviceBPort: string;
  linkStatus: string;
  lldpStatus: string;
  deviceBRackExpected: string;
  deviceBNameExpected: string;
  deviceBPortExpected: string;
  txPower: string;
  rxPower: string;
  psuFailure: string;
  psuId: string;
  _key?: string;
}

export type ValidationTableCell = string | number | boolean | null | undefined | string[];

export type ValidationTableRow = {
  _key: string;
  [key: string]: ValidationTableCell | Record<string, unknown> | unknown[] | unknown;
};

export interface ValidationSection {
  key: string;
  title: string;
  rows: ValidationTableRow[];
}

export interface DeviceValidationFailures {
  deviceName: string;
  lastValidated?: string | null;
  sections: Record<string, ValidationSection>;
  sectionOrder: string[];
  powerRows: ValidationTableRow[];
  counts: {
    bySection: Record<string, number>;
    power: number;
    nonPowerTotal: number;
    overallTotal: number;
  };
  hasPsuFailure: boolean;
}

export type ValidationFailuresByDevice = Record<string, DeviceValidationFailures>;

export type PatchPanelRow = {
  deviceName?: string;
  devicePort?: string;
  buildingName?: string;
  rackNumber?: string;
  easyMark?: string[];
  [key: string]: unknown;
};

export type PatchPanelByDevicePort = Record<string, PatchPanelRow[]>;

export type JobErrorDetails = { code?: number; message?: string } | null;

export type SelectedLinkKey = string;

export type RackProps = {
  onPageChanged: (value: any) => void;
  building: string;
  block: string;
  rack: string;
  project?: string;
  ticket: string;
  rack_serial: string;
  region: string;
  resolveEnabled?: boolean;
  resolveDisabledReason?: string;
};
