import { loggedWritable } from "../shared/store.util";

export interface DevtoolStore {
  tabs: string[];
  activeTab: string;
}

export const devtoolStore = loggedWritable<DevtoolStore>({
  tabs: ["Request", "Headers", "Payload", "Response", "Cookies"],
  activeTab: "Request",
});

export function updateActiveTab(tab: string) {
  devtoolStore.update({ activeTab: tab });
}
