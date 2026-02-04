import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Project, User, ProjectFeatures } from '../types';

interface AppState {
  // Auth state
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;

  // Projects state
  projects: Project[];
  currentProject: Project | null;
  setProjects: (projects: Project[]) => void;
  addProject: (project: Project) => void;
  setCurrentProject: (project: Project | null) => void;
  updateProjectStatus: (id: string, status: Project['status']) => void;

  // Generation state
  isGenerating: boolean;
  generationProgress: number;
  setIsGenerating: (value: boolean) => void;
  setGenerationProgress: (value: number) => void;

  // UI state
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Auth
      user: null,
      isAuthenticated: false,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      login: async (email, password) => {
        // Mock login - replace with actual API call
        if (email && password) {
          set({
            user: {
              id: '1',
              email,
              name: email.split('@')[0],
              createdAt: new Date().toISOString(),
            },
            isAuthenticated: true,
          });
          return true;
        }
        return false;
      },
      register: async (name, email, password) => {
        // Mock register - replace with actual API call
        if (name && email && password) {
          set({
            user: {
              id: '1',
              email,
              name,
              createdAt: new Date().toISOString(),
            },
            isAuthenticated: true,
          });
          return true;
        }
        return false;
      },
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },

      // Projects
      projects: [],
      currentProject: null,
      setProjects: (projects) => set({ projects }),
      addProject: (project) => {
        const { projects } = get();
        set({ projects: [project, ...projects] });
      },
      setCurrentProject: (project) => set({ currentProject: project }),
      updateProjectStatus: (id, status) => {
        const { projects } = get();
        set({
          projects: projects.map((p) =>
            p.id === id ? { ...p, status } : p
          ),
        });
      },

      // Generation
      isGenerating: false,
      generationProgress: 0,
      setIsGenerating: (value) => set({ isGenerating: value }),
      setGenerationProgress: (value) => set({ generationProgress: value }),

      // UI
      sidebarCollapsed: false,
      toggleSidebar: () => {
        const { sidebarCollapsed } = get();
        set({ sidebarCollapsed: !sidebarCollapsed });
      },
    }),
    {
      name: 'lumova-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        sidebarCollapsed: state.sidebarCollapsed,
      }),
    }
  )
);
