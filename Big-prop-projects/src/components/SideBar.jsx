import { Drawer } from '@base-ui/react/drawer';
import { Link } from 'react-router-dom';
import styles from '../styles/index.module.css';

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/project', label: 'Project' },
];

export default function Sidebar({ open, onOpenChange, container }) {
  const close = () => onOpenChange(false);

  return (
    <Drawer.Root open={open} onOpenChange={onOpenChange} swipeDirection="right">
      <Drawer.Portal container={container}>
        <Drawer.Backdrop className={styles.Backdrop} />
        <Drawer.Viewport className={styles.Viewport}>
          <Drawer.Popup className={styles.Popup}>
            <Drawer.Content className={styles.Content}>

              <div className="nav-title-links">
                <Drawer.Title className={styles.Title}>MENU</Drawer.Title>

                <nav className="nav-links">
                  {links.map(({ to, label }, i) => (
                    <Link
                      key={to}
                      to={to}
                      onClick={close}
                      className={styles.Reveal}
                      style={{ '--i': i }}
                    >
                      {label}
                    </Link>
                  ))}
                </nav>
              </div>

              <div className={styles.Actions}>
                <Drawer.Close className={styles.Button}>Close</Drawer.Close>
              </div>

            </Drawer.Content>

            <div
              className={`drawer-buttons-div ${styles.DrawerButtons} ${styles.Reveal}`}
              style={{ '--i': links.length }}
            >

              <div><button className="drawer-quote-btn">Get a Quote</button></div>
              <div className="call-btn-div"><span className="call-btn-txt"><a href="tel:+27810450505" className="big-prop-nr-drawer-btn">CALL 081 045 0505</a></span></div>
            </div>

          </Drawer.Popup>
        </Drawer.Viewport>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
