import React, { ReactNode } from 'react'
import './styles.css';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';

import SearchIcon from '@mui/icons-material/Search';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CloudIcon from '@mui/icons-material/Cloud';

const Navbar: React.FC = () => {

  return (
    <nav className='nav'>
        <Link className='title' to='/'><CloudIcon style={{paddingLeft: '3px'}}/>Weathroid </Link>
        <ul>
            <CustomLink to='/'>Search <SearchIcon/></CustomLink>
            <CustomLink to='/favourites'>Favourites <FavoriteBorderIcon style={{paddingLeft: '5px'}}/></CustomLink>
        </ul>
    </nav>
  )
}

type CustomLinkProps = {
    children: ReactNode,
    to: string
}
function CustomLink({to, children, ...props}: CustomLinkProps){
   const resolvedPath = useResolvedPath(to)
   const isActive = useMatch({path: resolvedPath.pathname, end: true})
    return(
      <li className={isActive ? "active" : ''}>
        <Link to={to} {...props}>
          {children}
        </Link>
      </li>
    )
}

export default Navbar
