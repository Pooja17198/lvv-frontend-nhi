import { PERIODIC_VALIDATION_REFRESH_CONFIG } from "./featureFlags";

export type PeriodicValidationRefreshConfig = {
  enabled: boolean;
  regions: Array<{
    name: string;
    buildings?: string[];
  }>;
  rackTypes: {
    gpuRack: boolean;
    allRacks: boolean;
  };
};

export type PeriodicValidationRefreshContext = {
  region?: string | null;
  building?: string | null;
  isGpuRack?: boolean;
};

function normalizeConfigValue(value: string | null | undefined): string {
  return String(value || "").trim().toLowerCase();
}

function matchesRegionAndBuilding(
    configuredRegions: PeriodicValidationRefreshConfig["regions"],
    region: string | null | undefined,
    building: string | null | undefined
): boolean {
  if (configuredRegions.length === 0) {
    return true;
  }

  const normalizedRegion = normalizeConfigValue(region);
  if (!normalizedRegion) {
    return false;
  }

  const matchedRegion = configuredRegions.find(
      (configuredRegion) => normalizeConfigValue(configuredRegion.name) === normalizedRegion
  );
  if (!matchedRegion) {
    return false;
  }

  const configuredBuildings = matchedRegion.buildings || [];
  if (configuredBuildings.length === 0) {
    return true;
  }

  const normalizedBuilding = normalizeConfigValue(building);
  if (!normalizedBuilding) {
    return false;
  }

  return configuredBuildings.some(
      (configuredBuilding) => normalizeConfigValue(configuredBuilding) === normalizedBuilding
  );
}

export function isPeriodicValidationRefreshEnabledForRack(
    context: PeriodicValidationRefreshContext
): boolean {
  if (!PERIODIC_VALIDATION_REFRESH_CONFIG.enabled) {
    return false;
  }

  if (!matchesRegionAndBuilding(
      PERIODIC_VALIDATION_REFRESH_CONFIG.regions,
      context.region,
      context.building
  )) {
    return false;
  }

  if (PERIODIC_VALIDATION_REFRESH_CONFIG.rackTypes.allRacks) {
    return true;
  }

  if (PERIODIC_VALIDATION_REFRESH_CONFIG.rackTypes.gpuRack) {
    return Boolean(context.isGpuRack);
  }

  return false;
}
