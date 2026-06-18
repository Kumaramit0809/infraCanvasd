import { create } from 'zustand';
import type { InspectorTab } from '../types';

interface AppStore {
  selectedAppId: string;
  selectedNodeId: string | null;
  isMobilePanelOpen: boolean;
  activeInspectorTab: InspectorTab;

  setSelectedAppId: (id: string) => void;
  setSelectedNodeId: (id: string | null) => void;
  setIsMobilePanelOpen: (open: boolean) => void;
  setActiveInspectorTab: (tab: InspectorTab) => void;
}

export const useAppStore = create<AppStore>((set) => ({
  selectedAppId: '1',
  selectedNodeId: null,
  isMobilePanelOpen: false,
  activeInspectorTab: 'config',

  setSelectedAppId: (id) => set({ selectedAppId: id, selectedNodeId: null }),
  setSelectedNodeId: (id) => set({ selectedNodeId: id }),
  setIsMobilePanelOpen: (open) => set({ isMobilePanelOpen: open }),
  setActiveInspectorTab: (tab) => set({ activeInspectorTab: tab }),
}));

export const useSelectedAppId = () => useAppStore((s) => s.selectedAppId);
export const useSelectedNodeId = () => useAppStore((s) => s.selectedNodeId);
export const useIsMobilePanelOpen = () => useAppStore((s) => s.isMobilePanelOpen);
export const useActiveInspectorTab = () => useAppStore((s) => s.activeInspectorTab);
