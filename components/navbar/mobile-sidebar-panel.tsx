"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import MobileSidebarNavigation from "./mobile-sidebar-navigation";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface Props {
  setSidebarOpen: (open: boolean) => void;
}

export default function MobileSidebarPanel({ setSidebarOpen }: Props) {
  return (
    <div className="fixed inset-0 flex">
      <Transition.Child
        as={Fragment}
        enter="transition ease-in-out duration-300 transform"
        enterFrom="-translate-x-full"
        enterTo="translate-x-0"
        leave="transition ease-in-out duration-300 transform"
        leaveFrom="translate-x-0"
        leaveTo="-translate-x-full"
      >
        <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
              <button
                type="button"
                className="-m-2.5 p-2.5"
                onClick={() => setSidebarOpen(false)}
              >
                <span className="sr-only">Close sidebar</span>
                <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
              </button>
            </div>
          </Transition.Child>
          <MobileSidebarNavigation />
        </Dialog.Panel>
      </Transition.Child>
    </div>
  );
}
