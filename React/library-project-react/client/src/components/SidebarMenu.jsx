import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router';
import "./SidebarMenu.scss";
import { AnimatePresence, motion } from 'framer-motion';
import { DarkModeContext } from '../context/theme.context';

function SidebarMenu(props) {
    
    const {darkMode} = useContext(DarkModeContext);
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const handleClick = (event)=> {
        const sidebar = document.querySelector('.sidebar-container');
        if (isOpen && sidebar && !sidebar.contains(event.target)) {
            setIsOpen(false);
        }
    };

    // clear event listener when it unmounts or isOpen changes
    useEffect(() => {
        isOpen ? (document.addEventListener('click', handleClick)) : (  document.removeEventListener('click', handleClick));
        return ()=> {
            document.removeEventListener('click', handleClick);
        }}, [isOpen]);

  return (
    <div className='sidebar-container'>

        <button className="toggle-btn" onClick={toggleSidebar}>
            <motion.div
                animate={{rotate: isOpen ? 180 : 0}}
                transition={{
                    type:"spring",
                    visualDuration:0.3,
                    bounce:0.25
                }}
            >&#9776;
            </motion.div>
        </button>
        {/* access to the exit animation */}
        <AnimatePresence>
            {isOpen && (
                <motion.section className={darkMode ? 'sidebar-menu dark' : 'sidebar-menu'}
                    initial={{ x: '-100%', opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: '-100%', opacity: 0 }}
                    transition={{type:'spring', duration: 0.8}}
                >
                    <ul>
                        <li>
                            <Link to="/search-books">search books</Link>
                        </li>
                        <li>
                            <Link to="/my-library">my library</Link>
                        </li>
                        <li>
                            <Link to="/to-read">to read</Link>
                        </li>
                    </ul>
                </motion.section>
            ) }
        </AnimatePresence>
    </div>
  );
}

export default SidebarMenu