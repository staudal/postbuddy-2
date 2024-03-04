import { Transition } from "@headlessui/react";
import { Fragment } from "react";

export default function MobileSidebarOverlay() {
  return (
    <Transition.Child
      as={Fragment}
      enter="transition-opacity ease-linear duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity ease-linear duration-300"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="fixed inset-0 bg-gray-900/80" />
    </Transition.Child>
  );
}
