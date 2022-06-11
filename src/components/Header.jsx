import { Fragment } from "react";
import { Link } from "react-router-dom";
import { Popover, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";

import logo from "/assets/logo.png";
import githubLogo from "/assets/github.svg";

export default function Example() {
  return (
    <Popover className="relative z-50 select-none bg-slate-900">
      <div className="srz-layout flex items-center justify-between py-6">
        <div className="flex justify-start lg:w-0 lg:flex-1">
          <Link to="/">
            <img
              className="h-12 w-auto brightness-0 invert filter"
              src={logo}
              alt="pokemon"
            />
          </Link>
        </div>
        <div className="-my-2 -mr-2 md:hidden">
          <Popover.Button className="inline-flex items-center justify-center rounded-md border-2 border-slate-800 bg-slate-900 p-2">
            <MenuIcon className="h-6 w-6 text-white" />
          </Popover.Button>
        </div>
        <Popover.Group
          as="nav"
          className="hidden items-center space-x-10 text-base font-medium text-white md:flex"
        >
          <Link to="/pokedex">Pokédex</Link>
          <a href="https://github.com/aybansuarez/pokedex-react">
            <img src={githubLogo} alt="github" />
          </a>
        </Popover.Group>
      </div>

      <Transition
        as={Fragment}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel
          focus
          className="absolute inset-x-0 top-0 origin-top-right transform p-2 transition md:hidden"
        >
          <div className="rounded-lg border border-slate-700 bg-gray-900 shadow-lg">
            <div className="px-5 pt-5 pb-6">
              <div className="flex items-center justify-between">
                <div>
                  <img
                    className="h-12 w-auto brightness-0 invert filter"
                    src={logo}
                    alt="pokemon"
                  />
                </div>
                <div className="-mr-2">
                  <Popover.Button className="inline-flex items-center justify-center rounded-md bg-slate-900 p-2">
                    <XIcon className="h-6 w-6 text-white" />
                  </Popover.Button>
                </div>
              </div>
              <div className="mt-6">
                <nav className="grid grid-cols-1 gap-7 text-white">
                  <Link
                    className="-m-3 flex items-center rounded-lg p-3 hover:bg-gray-50"
                    to="/pokedex"
                  >
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md bg-white text-slate-900">
                      {/* <solution.icon className="h-6 w-6" aria-hidden="true" /> */}
                    </div>
                    <div className="ml-4">Pokédex</div>
                  </Link>
                </nav>
              </div>
            </div>
            <div className="rounded-br-md rounded-bl-md bg-gray-800">
              <a
                className="group flex items-center px-5 py-1"
                href="https://github.com/aybansuarez/pokedex-react"
              >
                <div className="flex h-8 w-10 flex-shrink-0 items-center justify-center rounded-md">
                  <img src={githubLogo} alt="github" className="w-5" />
                </div>
                <div className="ml-4 text-sm font-medium text-white">
                  Github
                </div>
              </a>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
