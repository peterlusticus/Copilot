import { Fragment, useEffect, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { Rule, setRuleValue } from '../data/generate';
import { toast } from 'react-toastify';

/**
 * Concatenates and returns a string of CSS class names.
 *
 * @param classes - The CSS class names to concatenate.
 * @returns The concatenated string of CSS class names.
 */
function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
}

/**
 * Dropdown component that displays a list of items and allows the user to select one.
 *
 * @param props - The component props.
 * @param props.items - An array of strings representing the items to be displayed in the dropdown.
 * @param props.prop - The prop value for key in rule object.
 * @param props.id - The id value.
 * @param props.order - A boolean indicating whether the item is 'wenn' or 'dann'.
 * @returns The rendered Dropdown component.
 */
export function Dropdown(props: { items: string[], prop: keyof Rule["wenn"][number] | keyof Rule["dann"][number], id: number, order: boolean }) {
    const defaultItems = props.items?.length <= 1 ? ['Bitte wählen'] : props.items;
    const [selected, setSelected] = useState(defaultItems[0]);

    useEffect(() => {
        if (selected) {
            setRuleValue(props.prop, props.id, props.order, selected);
        }
    }, [selected]);

    function showDisabledError() {
        if (props.items.length <= 1 && props.items[0] === '') {
            toast.error('Bitte laden Sie zuerst eine XML-Datei hoch');
        }
    }

    return (
        <Listbox value={selected} onChange={setSelected}>
            {({ open }) => (
                <>
                    <div className="relative w-full">
                        <Listbox.Button
                            className="relative w-full cursor-default rounded-none border border-gray-300 bg-white text-left outline-none form-dropdown form-input"
                            onClick={() => showDisabledError()}
                        >
                            <span className="flex items-center">
                                <span className="block truncate">{selected}</span>
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
                                            classNames(active ? 'text-white bg-green-600' : 'text-gray-900', 'relative cursor-pointer select-none rounded-none py-2 pl-3 pr-9')
                                        }
                                        value={item}
                                    >
                                        {({ selected, active }) => (
                                            <>
                                                <div className="flex items-center">
                                                    <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}>
                                                        {item}
                                                    </span>
                                                </div>

                                                {selected ? (
                                                    <span
                                                        className={classNames(active ? 'text-white' : 'text-green-600', 'absolute inset-y-0 right-0 flex items-center pr-4')}
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
    );
}
