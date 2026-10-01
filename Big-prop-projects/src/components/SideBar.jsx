import { useRef } from 'react';
import { Drawer } from '@base-ui/react/drawer';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from '../styles/index.module.css';
import '../styles/ButtonEffects.css';

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/#servicesH1', label: 'Services' },
  { to: '/#recent-projects', label: 'Recent Projects' },
  { to: '/projects', label: 'All Projects' },
];

export default function Sidebar({ open, onOpenChange }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const pending = useRef(null);
  const quoteTarget = `${pathname}#contact-us`;

  function follow(event, to) {
    if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    pending.current = to;
    onOpenChange(false);
  }

  function finishTransition(isOpen) {
    if (!isOpen && pending.current) {
      const to = pending.current;
      pending.current = null;
      navigate(to, { state: { smoothSection: to.includes('#') } });
    }
  }

  return (
    <Drawer.Root open={open} onOpenChange={onOpenChange}
      onOpenChangeComplete={finishTransition} swipeDirection="right">
      {/* Portal to the document, outside the animated header's containing block. */}
      <Drawer.Portal>
        <Drawer.Backdrop className={styles.Backdrop} />
        <Drawer.Viewport className={styles.Viewport}>
          <Drawer.Popup className={styles.Popup}>
            <div className={styles.Actions}>
              <Drawer.Close className={`${styles.Button} drawer-close`}>Close</Drawer.Close>
            </div>
            <Drawer.Content className={styles.Content}>
              <Drawer.Title className={styles.Title}>MENU</Drawer.Title>
              <nav className={styles.NavLinks} aria-label="Main navigation">
                {links.map(({ to, label }, index) => (
                  <Link key={to} to={to} onClick={(event) => follow(event, to)}
                    className={`${styles.NavLink} ${styles.Reveal}`} style={{ '--i': index }}>
                    {label}
                  </Link>
                ))}
              </nav>
            </Drawer.Content>
            <div className={`${styles.DrawerButtons} ${styles.Reveal}`} style={{ '--i': links.length }}>
              <Link to={quoteTarget} onClick={(event) => follow(event, quoteTarget)}
                className="button-swap drawer-quote-btn">Get a Quote</Link>
              <a href="tel:+27810450505" className="button-swap drawer-call-btn">CALL 081 045 0505</a>
            </div>
          </Drawer.Popup>
        </Drawer.Viewport>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
