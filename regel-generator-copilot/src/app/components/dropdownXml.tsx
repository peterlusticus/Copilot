"use client";
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { Fragment } from 'react';
import { toast } from 'react-toastify';

//TODO: auslagern weil doppelt (siehe dropdoen.tsx)
function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

/**
 * DropdownXml component.
 * 
 * @param props - The component props.
 * @param props.items - An array of items for the dropdown, each containing a label and xml.
 * @param props.value - The currently selected item, containing a label and xml.
 * @param props.onChange - The function to be called when the selected item changes.
 * @returns The DropdownXml component.
 */
export function DropdownXml(props: { items: { label: string, xml: ChildNode }[], value: { label: string, xml: ChildNode }, onChange: any }) {
    function showDisabledError() {
        if (props.items.length <= 1) {
            toast.error("Bitte laden Sie zuerst eine XML-Datei hoch")
        }
    }

    return (
        <Listbox value={props.value} onChange={props.onChange}>
            {({ open }) => (
                <>
                    <div className="relative w-full">
                        <Listbox.Button className="relative w-full cursor-default rounded-none border border-gray-300 bg-white text-left outline-none form-dropdown form-input" onClick={() => showDisabledError()}>
                            <span className="flex items-center">
                                <span className="block truncate">{props.value["label"]}</span>
                            </span>
                            <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            </span>
                        </Listbox.Button>

                        <Transition
                            show={open}
                            as={Fragment}
                            enter="transition ease-out duration-300"
                            enterFrom="transform opacity-0 translate-y-4"
                            enterTo="transform opacity-100 translate-y-0"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 translate-y-0"
                            leaveTo="transform opacity-0 translate-y-4"
                        >
                            <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-none bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {props.items.map((item, index) => (
                                    <Listbox.Option
                                        key={index}
                                        className={({ active }) =>
                                            classNames(
                                                active ? 'text-white bg-green-600' : 'text-gray-900',
                                                'relative cursor-pointer select-none rounded-none py-2 pl-3 pr-9'
                                            )
                                        }
                                        value={{ label: item["label"], xml: item["xml"] }}
                                    >
                                        {({ selected, active }) => (
                                            <>
                                                <div className="flex items-center">
                                                    <span
                                                        className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                                                    >
                                                        {item["label"]}
                                                    </span>
                                                </div>

                                                {selected ? (
                                                    <span
                                                        className={classNames(
                                                            active ? 'text-white' : 'text-green-600',
                                                            'absolute inset-y-0 right-0 flex items-center pr-4'
                                                        )}
                                                    >
                                                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                    </span>
                                                ) : null}
                                            </>
                                        )}
                                    </Listbox.Option>
                                ))}
                            </Listbox.Options>
                        </Transition>
                    </div>
                </>
            )}
        </Listbox>
    )
}