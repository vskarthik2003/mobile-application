import { mockAppConfig } from "@/src/config/mock-config";
import { parseAppConfig, type AppConfig } from "@/src/schema/app-config";

const API_URL = process.env.EXPO_PUBLIC_API_URL;
const TENANT_ID = process.env.EXPO_PUBLIC_TENANT_ID ?? "preview";

export async function loadAppConfig(): Promise<AppConfig> {
  if (!API_URL) {
    return mockAppConfig;
  }

  try {
    const response = await fetch(
      `${API_URL}/v1/apps/${TENANT_ID}/config?env=preview`,
    );

    if (!response.ok) {
      throw new Error(`Config request failed with status ${response.status}`);
    }

    const json = await response.json();
    return parseAppConfig(json.data ?? json);
  } catch (error) {
    console.warn("[Preview] Falling back to mock config:", error);
    return mockAppConfig;
  }
}
