import { motion } from "framer-motion";
import { LandingButton } from "./LandingButton";
import { GridLockLogo } from "../../components/branding";

const NavbarContainer = motion.nav;

const Navbar = () => {
  return (
    <NavbarContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-border/80 bg-background/95 backdrop-blur-md"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between h-14 px-6">
        <GridLockLogo size={28} className="hover:scale-[1.02] transition-transform duration-200" />
        <a href="/login">
          <LandingButton variant="racing" size="sm">
            Login
          </LandingButton>
        </a>
      </div>
    </NavbarContainer>
  );
};

export default Navbar;
