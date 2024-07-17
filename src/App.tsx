import { useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import '@material/web/button/filled-button.js'
import '@material/web/menu/menu.js'
import '@material/web/menu/menu-item.js'

interface MdMenuProps extends React.HTMLAttributes<HTMLElement> {
  anchor?: string
}

interface CustomMenuElement extends HTMLElement {
  open: boolean
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'md-filled-button': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'md-menu': React.DetailedHTMLProps<MdMenuProps, HTMLElement>;
      'md-menu-item': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}
function App() {
  const [count, setCount] = useState(0);
  const anchorRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<CustomMenuElement>(null);

  useEffect(() => {
    const anchorEl = anchorRef.current;
    const menuEl = menuRef.current;

    if (!anchorEl || !menuEl) {
      return;
    }

    const toggleMenu = () => {
      // Cambiar la propiedad 'open' del menú para mostrarlo u ocultarlo
      menuEl.open = !menuEl.open;
    };

    if (anchorEl) {
      anchorEl.addEventListener('click', toggleMenu);
    }

    // Limpiar el evento al desmontar el componente
    return () => {
      if (anchorEl) {
        anchorEl.removeEventListener('click', toggleMenu);
      }
    };
  }, []);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <md-filled-button>Button</md-filled-button>
      <span style={{ position: 'relative' }}>
        <md-filled-button ref={anchorRef} id="usage-anchor">Set with idref</md-filled-button>
        <md-menu ref={menuRef} id="usage-menu" anchor="usage-anchor">
          <md-menu-item>
            <div slot="headline">Apple</div>
          </md-menu-item>
          <md-menu-item>
            <div slot="headline">Banana</div>
          </md-menu-item>
          <md-menu-item>
            <div slot="headline">Cucumber</div>
          </md-menu-item>
        </md-menu>
      </span>
      
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
