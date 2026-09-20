import { Drawer } from '@base-ui/react/drawer';
import { Link } from 'react-router-dom';
import styles from '../styles/index.module.css';

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
                <Drawer.Title className={styles.Title}>Menu</Drawer.Title>

                <nav className="nav-links">
                  <Link to="/" onClick={close}>Home</Link>
                  <Link to="/about" onClick={close}>About</Link>
                  <Link to="/projects" onClick={close}>Projects</Link>
                  <Link to="/project" onClick={close}>Project</Link>
                </nav>
              </div>

              <div className={styles.Actions}>
                <Drawer.Close className={styles.Button}>Close</Drawer.Close>
              </div>

            </Drawer.Content>
          </Drawer.Popup>
        </Drawer.Viewport>
      </Drawer.Portal>
    </Drawer.Root>
  );
}