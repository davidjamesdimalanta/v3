"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import ProjectDrawer from "../sections/organisms/ProjectDrawer";

const ProjectDrawerContext = createContext(null);

export function ProjectDrawerProvider({ children }) {
  const [project, setProject] = useState(null);
  const [open, setOpen] = useState(false);

  const openProject = useCallback((nextProject) => {
    setProject(nextProject);
    setOpen(true);
  }, []);

  const handleOpenChange = useCallback((nextOpen) => {
    setOpen(nextOpen);
  }, []);

  const value = useMemo(() => ({
    openProject,
    isDrawerActive: open || Boolean(project),
  }), [open, openProject, project]);

  return (
    <ProjectDrawerContext.Provider value={value}>
      {children}
      <ProjectDrawer
        open={open}
        onOpenChange={handleOpenChange}
        onCloseAnimationEnd={() => setProject(null)}
        project={project}
      />
    </ProjectDrawerContext.Provider>
  );
}

export function useProjectDrawer() {
  const context = useContext(ProjectDrawerContext);
  if (!context) {
    throw new Error("useProjectDrawer must be used within ProjectDrawerProvider");
  }
  return context;
}
