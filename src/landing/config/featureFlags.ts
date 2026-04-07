import { PeriodicValidationRefreshConfig } from "./configUtils";

// Update values here and redeploy.

export const ENABLE_NETWORK_MONITORING = true;

export const PERIODIC_VALIDATION_REFRESH_CONFIG: PeriodicValidationRefreshConfig = {
  enabled: true,
  // Add more region names here to enable periodic refresh in additional regions.
  regions: [],
  // Add more building names here to enable periodic refresh in additional buildings.
  buildings: [],
  // For now periodic refresh is enabled only for GPU racks.
  rackTypes: {
    gpuRack: true,
    allRacks: false,
  },
};
