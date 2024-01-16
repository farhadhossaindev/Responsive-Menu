import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { links } from './MyLinks'

function NavLinks() {

  const [heading, setHeading] = useState("")
  const [subHeading, setSubHeading] = useState("")


  return (

    <>
      {
        links.map(link => (
          <div>
            <div className='px-3 text-left md:cursor-pointer group'>
              <h1 className='py-7'
                onClick={() => { heading !== link.name ? setHeading(link.name) : setHeading(""); setSubHeading(); }}>{link.name}</h1>
              {link.submenu && (
                <div>
                  <div className='absolute top-20 hidden group-hover:md:block hover:md:block'>
                    <div className='py-3.5'>
                      <div className='w-4 h-4 left-3 bg-black absolute mt-2 rotate-45'> </div>
                    </div>
                    <div className='bg-black p-5 grid grid-cols-3 gap-10'>
                      {link.sublinks.map((mysublinklinks) => (
                        <div>
                          <h1 className='text-lg font-semibold'>
                            {mysublinklinks.Head}
                          </h1>
                          {mysublinklinks.sublink.map((slink) => (
                            <li className='text-sm text-yellow-100 my-2.5'>
                              <Link to={slink.link}
                                className='hover:text-yellow-400'>{slink.name}</Link>
                            </li>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
            {/* mobail menu */}
            <div className={`
            ${heading === link.name ? 'md:hidden' : 'hidden'}
            `}>
              {/* Sublinks */}
              {
                link.sublinks.map((slinks) => (
                  <div>
                    <div>
                      <h1 onClick={() => subHeading !== slinks.Head ? setSubHeading(slinks.Head) : setSubHeading('')} className='py-4 pl-7 font-semibold md:pr-0 pr-5'>{slinks.Head}</h1>
                      <div className={`${subHeading === slinks.Head ? "md:hidden" : "hidden"}`}>
                        {slinks.sublink.map((slink) => (
                          <li className='py-3 pl-14'>
                            <Link to={slinks.link}>{slink.name}</Link>
                          </li>
                        ))}
                      </div>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        ))
      }
    </>
  )
}

export default NavLinks