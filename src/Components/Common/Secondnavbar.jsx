
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'

import React from 'react'

const Secondnavbar = () => {
  return (
    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div className="relative flex h-16 items-center justify-between sm:hidden">
        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <button className='w-10 rounded-lg bg-gray-400'>Button10</button>
          <button>Button2</button>
          <button>Button3</button>
        </div>
      </div>
    </div>
  )
}

export default Secondnavbar
