import { useState } from "react";
import {
  IconCalendarStats,
  IconDeviceDesktopAnalytics,
  IconFingerprint,
  IconGauge,
  IconHome2,
  IconLogout,
  IconSettings,
  IconSwitchHorizontal,
  IconUser,
} from "@tabler/icons-react";
import {  Stack, Tooltip, UnstyledButton } from "@mantine/core";
import classes from "./NavbarMinimal.module.css";
import { useNavigate } from "react-router-dom";

function NavbarLink({ icon: Icon, label, active, onClick, expanded }) {
  return (
    <Tooltip 
      label={expanded ? "" : label} 
      position="right" 
      transitionProps={{ duration: 0 }}
      disabled={expanded}
    >
      <UnstyledButton
        onClick={onClick}
        className={`${classes.link} ${expanded ? classes.expanded : ''}`}
        data-active={active || undefined}
      >
        <Icon size={22} stroke={1.5} />
        {expanded && <span className={classes.linkLabel}>{label}</span>}
      </UnstyledButton>
    </Tooltip>
  );
}

const mockdata = [
  { icon: IconHome2, label: "Home", route: "/home" },
  { icon: IconGauge, label: "Dashboard", route: "/dashboard" },
  { icon: IconDeviceDesktopAnalytics, label: "Analytics", route: "/analytics" },
  { icon: IconCalendarStats, label: "Releases", route: "/releases" },
  { icon: IconUser, label: "Account", route: "/account" },
  { icon: IconFingerprint, label: "Security", route: "/security" },
  { icon: IconSettings, label: "Settings", route: "/settings" },
];

export function Navbar() {
  const [active, setActive] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();

  const links = mockdata.map((link, index) => (
    <NavbarLink
      icon={link.icon}
      label={link.label}
      key={link.label}
      active={index === active}
      expanded={expanded}
      onClick={() => {
        setActive(index);
        navigate(link.route);
      }}
    />
  ));

  return (
    <nav 
      className={`${classes.navbar} ${expanded ? classes.expanded : ''}`}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      <div className={classes.logoContainer} onClick={() => navigate("/")}>
        <img src="/campaign.svg" alt="Logo" className={classes.logo} />
        {expanded && <span className={classes.logoText}>Campaign</span>}
      </div>

      <Stack className={classes.navStack} justify="start" gap={0}>
        {links}
      </Stack>

      <Stack className={classes.bottomStack} justify="end" gap={0}>
        <NavbarLink
          icon={IconSwitchHorizontal}
          label="Change account"
          expanded={expanded}
          onClick={() => navigate("/change-account")}
        />
        <NavbarLink
          icon={IconLogout}
          label="Logout"
          expanded={expanded}
          onClick={() => navigate("/logout")}
        />
      </Stack>
    </nav>
  );
}