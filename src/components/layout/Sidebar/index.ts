// Export all sidebar components
export { default as SidebarHeader } from './SidebarHeader';
export { default as SidebarNavItem } from './SidebarNavItem';
export { default as SidebarActionButtons } from './SidebarActionButtons';
export { default as SidebarFooter } from './SidebarFooter';
export { default as SidebarContainer, SidebarNavContainer, SidebarNavSection } from './SidebarContainer';
export * from './types';

// Create a default export with the main components
import SidebarContainer, { SidebarNavContainer, SidebarNavSection } from './SidebarContainer';
import SidebarHeader from './SidebarHeader';
import SidebarNavItem from './SidebarNavItem';
import SidebarFooter from './SidebarFooter';
import SidebarActionButtons from './SidebarActionButtons';

// Export a composite Sidebar component as default
const Sidebar = {
  Container: SidebarContainer,
  NavContainer: SidebarNavContainer,
  NavSection: SidebarNavSection,
  Header: SidebarHeader,
  NavItem: SidebarNavItem,
  Footer: SidebarFooter,
  ActionButtons: SidebarActionButtons
};

export default Sidebar;
