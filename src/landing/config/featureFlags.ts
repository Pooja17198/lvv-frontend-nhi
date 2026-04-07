import { PeriodicValidationRefreshConfig } from "./configUtils";

// Update values here and redeploy.

export const ENABLE_NETWORK_MONITORING = true;

export const PERIODIC_VALIDATION_REFRESH_CONFIG: PeriodicValidationRefreshConfig = {
  enabled: false,
  // Leave regions empty to enable periodic refresh in all regions.
  // If regions are provided, only those regions are enabled.
  // Within a region, leave buildings empty to enable all buildings in that region.
  // If buildings are provided, only those buildings are enabled for that region.
  regions: [],
  // Example:
  // regions: [
  //   { name: "us-phoenix-1" },
  //   { name: "us-ashburn-1", buildings: ["iad10", "iad58"] },
  // ],
  // For now periodic refresh is enabled only for GPU racks.
  rackTypes: {
    gpuRack: true,
    allRacks: false,
  },
  // Choose which device types should be included in periodic validation refresh calls.
  deviceTypes: {
    gpuHost: true,
    allDevices: false,
  },
};
