import { PERIODIC_VALIDATION_REFRESH_CONFIG } from "./featureFlags";

export type PeriodicValidationRefreshConfig = {
  enabled: boolean;
  regions: string[];
  buildings: string[];
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

function matchesConfiguredList(configuredValues: string[], candidate: string | null | undefined): boolean {
  if (configuredValues.length === 0) {
    return true;
  }

  const normalizedCandidate = normalizeConfigValue(candidate);
  if (!normalizedCandidate) {
    return false;
  }

  return configuredValues.some((configuredValue) =>
      normalizeConfigValue(configuredValue) === normalizedCandidate
  );
}

export function isPeriodicValidationRefreshEnabledForRack(
    context: PeriodicValidationRefreshContext
): boolean {
  if (!PERIODIC_VALIDATION_REFRESH_CONFIG.enabled) {
    return false;
  }

  if (!matchesConfiguredList(PERIODIC_VALIDATION_REFRESH_CONFIG.regions, context.region)) {
    return false;
  }

  if (!matchesConfiguredList(PERIODIC_VALIDATION_REFRESH_CONFIG.buildings, context.building)) {
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
